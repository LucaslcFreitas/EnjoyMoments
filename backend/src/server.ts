import express from 'express'
import cors from 'cors'
import 'reflect-metadata'
import './database'
import { routes } from './routes'

declare module 'express-serve-static-core' {
    interface Request {
        auth_user_id?: string
    }
}

const app = express()

app.use(cors())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.use(express.json())

app.use(routes)

app.listen(4000, () => console.log('Server is running'))
