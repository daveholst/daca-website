import { tourInfoSchema } from '@/src/schema/tour-info'
import { TourInfo } from '@/src/schema/types'
import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

/**
 * getTour returns all associated record for a tour type? using the the gs1pk
 * @returns Tour information TODO: add calender (future tours) into this request
 */
export async function getTour(tourId: string): Promise<TourInfo[]> {
  console.log(tourId)
  const client = new DynamoDBClient({
    region: 'ap-southeast-2',
    //TODO Local Only?
    endpoint: process.env.LOCAL_DB_ENDPOINT,
  })

  const params: QueryCommandInput = {
    TableName: 'prod-daca-tours-table',
    IndexName: 'GSI1',
    KeyConditionExpression: 'gsi1pk = :gs1pkValue',
    ExpressionAttributeValues: {
      ':gs1pkValue': { S: tourId },
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
