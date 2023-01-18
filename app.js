import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.static('images'))

app.listen(8080, '0.0.0.0', () => {
    console.info(`Image delivery service listening on port 8080`)
})
