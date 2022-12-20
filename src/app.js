import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
const port = 3000
import {router} from './router/router.js'


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
