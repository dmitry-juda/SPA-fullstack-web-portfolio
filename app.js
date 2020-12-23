const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const helmet = require('helmet')

const app = express()

//security uses
app.use(helmet())

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))

app.use('/api/post', require('./routes/post.routes'))

app.use('/api/uploads', require('./routes/uploads.routes'))

const PORT = config.get('port') || 5000

async function start() {

    try {

        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

    }
    catch(e) {
        console.log(`err: ${e.message}`)
        process.exit(1)
    }

}

start()

app.listen(PORT, () => {
    console.log(`app has been started on ${PORT}`)
})