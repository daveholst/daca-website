import { tourInfoSchema } from '@/src/schema/TourInfo'
import { ToursInfo } from '@/src/schema/types'
import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

/**
 * getTour takes
 * @returns Tour information TODO: add calender (future tours) into this request
 */
export async function getTour(tourId: string): Promise<ToursInfo[]> {
  const client = new DynamoDBClient({
    region: 'ap-southeast-2',
    endpoint: process.env.LOCAL_DB_ENDPOINT,
  })

  const params: QueryCommandInput = {
    TableName: 'daca-tours',
    IndexName: 'GSI1',
    KeyConditionExpression: 'GSI1PK = :GSI1PKValue',
    ExpressionAttributeValues: {
      ':GSI1PKValue': { S: tourId },
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
