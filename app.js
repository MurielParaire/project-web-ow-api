import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { router } from './src/router/router.js'
import dotenv from 'dotenv'

const app = express()
const port = 3000
dotenv.config();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use('/owapi', router)

app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}.`)
})
