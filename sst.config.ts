import { SSTConfig } from 'sst'
import { Config, NextjsSite, Table } from 'sst/constructs'

export default {
  config(_input) {
    return {
      name: 'daca-tours',
      region: 'ap-southeast-2',
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const YOUTUBE_API_KEY = new Config.Secret(stack, 'YOUTUBE_API_KEY')

      const table = new Table(stack, 'table', {
        fields: {
          pk: 'string',
          sk: 'string',
          gsi1pk: 'string',
          gsi1sk: 'string',
        },
        primaryIndex: { partitionKey: 'pk', sortKey: 'sk' },
        globalIndexes: {
          GSI1: { partitionKey: 'gsi1pk', sortKey: 'gsi1sk' },
        },
      })

      const site = new NextjsSite(stack, 'site', {
        bind: [table, YOUTUBE_API_KEY],
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
  },
} satisfies SSTConfig
