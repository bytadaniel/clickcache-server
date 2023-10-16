import express from 'express'
import { serverConfig } from './env'
import { resolver } from './clickcache'

const app = express()
app.use(express.json())

app.post('/insert/:table/jsoneachrow', async (req, res) => {
  // console.log('Requested cache', req.body.length, 'rows in table', req.params.table)
  await resolver.cache(req.params.table, req.body)
    .then(() => res.sendStatus(200))
    .catch((e) => res.status(500).send(e))
})

app.listen(serverConfig.PORT, () => console.log(`Server up on port ${serverConfig.PORT}`))