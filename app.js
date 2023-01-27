import express from 'express'
import cors from 'cors'
import amqplib from 'amqplib'
import fs from 'fs'

const app = express()

app.use(cors())
;(async () => {
    const queue = 'deleteImage'
    const connection = await amqplib.connect('amqp://guest:guest@rabbitmq:5672')
    const channel = await connection.createChannel()

    process.once('SIGINT', async () => {
        console.log('got sigint, closing connection')
        await channel.close()
        await connection.close()
        process.exit(0)
    })

    await channel.assertQueue(queue, { durable: true })
    await channel.consume(
        queue,
        async (msg) => {
            const filename = msg.content.toString().split('/')
            fs.unlink(
                `${process.env.PWD}/images/${filename[filename.length - 1]}`,
                (err) => {
                    if (err) throw err
                }
            )
            channel.ack(msg)
            console.log('Image removed successfully')
        },
        { noAck: false }
    )
})()
app.use('/images', express.static('images'))
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Server Error')
})

app.listen(8080, '0.0.0.0', () => {
    console.info(`Image delivery service listening on port 8080`)
})
