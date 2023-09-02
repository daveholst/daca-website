import * as cdk from 'aws-cdk-lib'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'

type SingleTableGlobalSecondaryIndex = Omit<
  dynamodb.GlobalSecondaryIndexProps,
  'indexName' | 'partitionKey' | 'sortKey'
>

export interface ConstructSingleTableDynamoProps extends cdk.StackProps {
  tableProps: Omit<dynamodb.TableProps, 'partitionKey' | 'sortKey'>
  GSI1Props?: SingleTableGlobalSecondaryIndex
  GSI2Props?: SingleTableGlobalSecondaryIndex
}
/**
 * Inspiration for constructor shenanigans:
 * https://blog.dennisokeeffe.com/blog/2021-08-09-dynamodb-with-localstack-and-the-aws-cdk
 */
export class ConstructSingleTableDynamo extends Construct {
  public readonly dynamoTable: dynamodb.Table

  constructor(
    scope: Construct,
    id: string,
    props?: ConstructSingleTableDynamoProps
  ) {
    super(scope, id)

    this.dynamoTable = new dynamodb.Table(this, `SingleTable`, {
      partitionKey: {
        name: 'pk',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'sk',
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: 1,
      writeCapacity: 1,
      ...props?.tableProps,
    })

    this.dynamoTable.addGlobalSecondaryIndex({
      indexName: 'GSI1',
      partitionKey: {
        name: 'GSI1PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'GSI1SK',
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: 1,
      writeCapacity: 1,
      ...props?.GSI1Props,
    })

    // added code
    this.dynamoTable.addGlobalSecondaryIndex({
      indexName: 'GSI2',
      partitionKey: {
        name: 'GSI2PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'GSI2SK',
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: 1,
      writeCapacity: 1,
      ...props?.GSI2Props,
    })
  }
}
