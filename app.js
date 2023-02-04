import express from 'express'
import cors from 'cors'
import fs from 'fs'
import { consumeMessage } from '@payhasly-discount/common'

const app = express()

app.use(cors())
consumeMessage('AMQP_URL', 'deleteImage', async (msg) => {
    const filename = msg.split('/')
    fs.unlink(
        `${process.env.PWD}/images/${filename[filename.length - 1]}`,
        (err) => console.error(err)
    )
    console.log('Image removed successfully')
})
app.use('/images', express.static('images'))
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Server Error')
})

app.listen(8080, '0.0.0.0', () => {
    console.info(`Image delivery service listening on port 8080`)
})
