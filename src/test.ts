import cuid from 'cuid'
import { createClient } from '@clickhouse/client'

(async function () {
  const table = 'test_clickcache_table_1'

  const client = createClient({
    application: 'clickcache-server-test',
    host: 'http://localhost:8123',
    database: 'default',
    username: 'default',
    password: ''
  })

  await client.command({
    query: `
      CREATE TABLE IF NOT EXISTS ${table} (
        id String,
        name String
      )
      ENGINE = MergeTree()
      ORDER BY id
    `,
    // Recommended for cluster usage to avoid situations
    // where a query processing error occurred after the response code
    // and HTTP headers were sent to the client.
    // See https://clickhouse.com/docs/en/interfaces/http/#response-buffering
    clickhouse_settings: { wait_end_of_query: 1, }
  })

  while(true) {
    const min = 1
    const max = 100
    const rows = new Array(Math.floor(Math.random() * (max - min + 1)) + min).fill({
      id: cuid(),
      name: cuid()
    })

    const response = await fetch(`http://localhost:3000/insert/${table}/jsoneachrow`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rows)
    })
    console.log(response.status, response.statusText)
  }

})()