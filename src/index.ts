import { InsertRow } from 'clickcache'
import { resolver } from './clickcache'
import { client } from './clickhouse'

resolver.onResolved(async chunk => {
  console.log('Resolved chunk', chunk.id, 'with size', chunk.size)
  const jsonRows = await chunk.loadRows()
  await client
    .insert({
      table: chunk.table,
      format: 'JSONEachRow',
      values: jsonRows
    })
    .catch(() => resolver.cache(chunk.table, jsonRows as InsertRow[]))
})

import './server'