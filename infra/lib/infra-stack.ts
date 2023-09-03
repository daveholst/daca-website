import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'

import * as apiGateway from 'aws-cdk-lib/aws-apigateway'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as path from 'path'
import { ConstructSingleTableDynamo } from '../lib/contructors/ConstructSingleTableDynamo'
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs'

/** Dirs for S3 Static Files */
const publicStaticDir = './public'
const nextStaticDir = './.next/static'
/* Dir for next code (relative to this file... I think) */
const relativeNextDir = '../../.next/standalone'

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const dynamoDB = new ConstructSingleTableDynamo(this, 'DacaToursTable', {
      tableProps: {
        tableName: 'daca-tours',
      },
    })

    new cdk.CfnOutput(this, 'dynamoDB Endpoint', {
      value: dynamoDB.table.tableArn,
    })

    // const lambdaRole = new iam.Role(this, 'LambdaRole', {
    //   assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    // })

    // lambdaRole.addToPolicy(
    //   new iam.PolicyStatement({
    //     effect: iam.Effect.ALLOW,
    //     actions: [
    //       'dynamodb:PutItem',
    //       'dynamodb:GetItem',
    //       // Add other DynamoDB actions as needed
    //     ],
    //     resources: [dynamoDB.table.tableArn],
    //   })
    // )

    // defines your stack here
    const lambdaAdapterLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      'LambdaAdapterLayerX86',
      `arn:aws:lambda:${this.region}:753240598075:layer:LambdaAdapterLayerX86:16`
    )

    const nextCdkFunction = new lambda.Function(this, 'NextCdkFunction', {
      //TODO can I bump this to 18?
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'run.sh',
      code: lambda.Code.fromAsset(
        //TODO remove hardcode
        path.join(__dirname, relativeNextDir)
      ),
      architecture: lambda.Architecture.X86_64,
      timeout: cdk.Duration.seconds(300),
      memorySize: 2048,
      environment: {
        AWS_LAMBDA_EXEC_WRAPPER: '/opt/bootstrap',
        RUST_LOG: 'info',
        PORT: '8080',
        // DB_ENDPOINT: dynamoDB.table.tableArn,
      },
      layers: [lambdaAdapterLayer],
      // role: lambdaRole,
    })

    nextCdkFunction.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'dynamodb:PutItem',
          'dynamodb:GetItem',
          'dynamodb:Query',
          // Add other DynamoDB actions as needed
        ],
        resources: [dynamoDB.table.tableArn],
      })
    )

    const api = new apiGateway.RestApi(this, 'api', {
      defaultCorsPreflightOptions: {
        allowOrigins: apiGateway.Cors.ALL_ORIGINS,
        allowMethods: apiGateway.Cors.ALL_METHODS,
      },
    })

    const nextCdkFunctionIntegration = new apiGateway.LambdaIntegration(
      nextCdkFunction,
      {
        allowTestInvoke: false,
      }
    )
    api.root.addMethod('ANY', nextCdkFunctionIntegration)

    api.root.addProxy({
      defaultIntegration: new apiGateway.LambdaIntegration(nextCdkFunction, {
        allowTestInvoke: false,
      }),
      anyMethod: true,
    })

    const nextLoggingBucket = new s3.Bucket(this, 'next-logging-bucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      versioned: true,
      accessControl: s3.BucketAccessControl.LOG_DELIVERY_WRITE,
    })

    const nextBucket = new s3.Bucket(this, 'next-bucket', {
      //TODO check I can reenable this
      // blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      versioned: true,
      serverAccessLogsBucket: nextLoggingBucket,
      serverAccessLogsPrefix: 's3-access-logs',
    })

    new cdk.CfnOutput(this, 'Next bucket', { value: nextBucket.bucketName })

    const mediaCachePolicy = new cloudfront.CachePolicy(
      this,
      'MediaCachePolicy',
      {
        enableAcceptEncodingGzip: true,
        headerBehavior: cloudfront.CacheHeaderBehavior.allowList('Host'),
        queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
      }
    )

    const cloudfrontDistribution = new cloudfront.Distribution(
      this,
      'Distribution',
      {
        defaultBehavior: {
          origin: new origins.RestApiOrigin(api),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        },
        additionalBehaviors: {
          '_next/*': {
            origin: new origins.S3Origin(nextBucket),
            viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
            // cachePolicy: mediaCachePolicy,
          },
          //   'static/*': {
          //     origin: new origins.S3Origin(nextBucket),
          //     viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
          //   },
        },
        minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2018,
        logBucket: nextLoggingBucket,
        logFilePrefix: 'cloudfront-access-logs',
      }
    )

    new cdk.CfnOutput(this, 'CloudFront URL', {
      value: `https://${cloudfrontDistribution.distributionDomainName}`,
    })

    new s3deploy.BucketDeployment(this, 'deploy-next-static-bucket', {
      sources: [s3deploy.Source.asset(nextStaticDir)],
      destinationBucket: nextBucket,
      destinationKeyPrefix: '_next/static',
      distribution: cloudfrontDistribution,
      distributionPaths: ['/_next/static/*'],
    })

    new s3deploy.BucketDeployment(this, 'deploy-next-public-bucket', {
      sources: [s3deploy.Source.asset(publicStaticDir)],
      destinationBucket: nextBucket,
      destinationKeyPrefix: 'static',
      distribution: cloudfrontDistribution,
      distributionPaths: ['/static/*'],
    })
  }
}
