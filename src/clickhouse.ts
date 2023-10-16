import { createClient } from '@clickhouse/client'
import { clickhouseConfig } from './env'

export const client = createClient({
  application: 'clickcache-server',
  host: clickhouseConfig.HOST,
  database: clickhouseConfig.DATABASE,
  username: clickhouseConfig.USER,
  password: clickhouseConfig.PASSWORD,
})