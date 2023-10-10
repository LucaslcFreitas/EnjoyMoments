import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { sign } from 'jsonwebtoken'

export class UserController {
    async handleCreate(request: Request, response: Response) {
        const { name, biograph, email, password } = request.body

        const aux = request.file.path.split('\\')

        const photo =
            'http://' +
            process.env.IP_ADDRESS +
            ':' +
            process.env.PORT +
            '/' +
            aux[aux.length - 1]

        const service = new UserService()

        const result = await service.createUser({
            name,
            biograph,
            photo,
            email,
            password,
        })

        if (result instanceof Error) {
            return response
                .status(400)
                .json({ auth: false, message: result.message })
        }

        const jwd_secrete = process.env.JWD_SECRET
        const token = sign({ id: result.id }, jwd_secrete, { expiresIn: 43200 })

        return response.json({ auth: true, token })
    }

    async handleLogin(request: Request, response: Response) {
        const { email, password } = request.body

        const service = new UserService()

        const result = await service.loginUser({ email, password })

        if (result instanceof Error) {
            return response
                .status(401)
                .json({ auth: false, message: result.message })
        }

        const jwd_secrete = process.env.JWD_SECRET

        const token = sign({ id: result.id }, jwd_secrete, { expiresIn: 43200 })

        return response.json({ auth: true, token })
    }

    async handleGet(request: Request, response: Response) {
        const user_id = request.auth_user_id

        const service = new UserService()

        const result = await service.getUser(user_id)

        if (result instanceof Error) {
            return response.status(400).json({ message: result.message })
        }

        return response.json({
            name: result.name,
            biograph: result.biograph,
            photo: result.photo,
            email: result.email,
        })
    }
}
