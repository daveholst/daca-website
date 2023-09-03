import { ConstructSingleTableDynamo } from './contructors/ConstructSingleTableDynamo'
import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'

export class LocalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here
    new ConstructSingleTableDynamo(this, 'DacaTours', {
      tableProps: {
        tableName: 'my-first-table',
      },
    })
  }
}
