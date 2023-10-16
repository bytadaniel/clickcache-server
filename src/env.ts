import dotenv from 'dotenv'
import { get } from 'env-var'
import { ResolverOptions } from "clickcache"

dotenv.config()

type ClickhouseConfig = {
  CHUNK_LIFE_MS: ResolverOptions['chunkLifeMs'],
  CHUNK_SIZE: ResolverOptions['chunkSize'],
  CHECK_INTERVAL_MS: ResolverOptions['checkIntervalMs'],
  DATA_WATCHER: ResolverOptions['dataWatcher'],
  DISK_OUTPUT_DIRECTORY: string
}

export const serverConfig = {
  PORT: get('PORT').required().asPortNumber()
}

export const clickcacheConfig: ClickhouseConfig = {
  CHUNK_LIFE_MS: get('CLICKCACHE_CHUNK_LIFE_MS').required().asInt(),
  CHUNK_SIZE: get('CLICKCACHE_CHUNK_SIZE').required().asInt(),
  CHECK_INTERVAL_MS: get('CLICKCACHE_CHECK_INTERVAL_MS').required().asInt(),
  DATA_WATCHER: get('CLICKCACHE_DATA_WATCHER').required().asEnum(['disk', 'process']),
  DISK_OUTPUT_DIRECTORY: get('CLICKCACHE_DISK_OUTPUT_DIRECTORY').required().asString()
}

export const clickhouseConfig = {
  HOST: get('CLICKHOUSE_HOST').required().asString(),
  DATABASE: get('CLICKHOUSE_DB').required().asString(),
  USER: get('CLICKHOUSE_USER').required().asString(),
  PASSWORD: get('CLICKHOUSE_PASSWORD').required(false).default('').asString()
}

console.log({
  serverConfig,
  clickhouseConfig,
  clickcacheConfig
})