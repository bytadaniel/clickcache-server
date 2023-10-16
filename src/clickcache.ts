import { ChunkResolver } from 'clickcache'
import { clickcacheConfig } from './env'

export const resolver = new ChunkResolver({
  chunkLifeMs: clickcacheConfig.CHUNK_LIFE_MS,
  chunkSize: clickcacheConfig.CHUNK_SIZE,
  checkIntervalMs: clickcacheConfig.CHECK_INTERVAL_MS,
  dataWatcher: clickcacheConfig.DATA_WATCHER,
  disk: {
    outputDirectory: clickcacheConfig.DISK_OUTPUT_DIRECTORY
  }
})