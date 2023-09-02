import { tourInfoSchema } from '@/src/schema/TourInfo'
import { ToursInfo } from '@/src/schema/types'
import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

/**
 * getToursInfo does a pk query of 'tours#info' to get all tours information
 * @returns Info for all tours from dynamo
 */
export async function getToursInfo(): Promise<ToursInfo[]> {
  const client = new DynamoDBClient({
    region: 'ap-southeast-2',
    endpoint: 'http://localhost:8000',
  })

  const params: QueryCommandInput = {
    TableName: 'daca-tours',
    KeyConditionExpression: 'pk = :pkValue',
    ExpressionAttributeValues: {
      ':pkValue': { S: 'tours#info' },
    },
  }

  try {
    const command = new QueryCommand(params)
    const result = await client.send(command)

    if (result.Items) {
      const items = result.Items.map((i) => unmarshall(i))
      const parsed = items.map((i) => tourInfoSchema.parse(i))
      return parsed
    }
    return []
  } catch (error) {
    console.error('Error retrieving items:\n', error)
    return []
  }
}
