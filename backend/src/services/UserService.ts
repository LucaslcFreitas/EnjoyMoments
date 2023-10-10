import { getRepository } from 'typeorm'
import bcrypt from 'bcrypt'
import { User } from '../entities/User'
require('dotenv').config()

type UserRequest = {
    name: String
    biograph: String
    photo: String
    email: String
    password: String
}

type LoginRequest = {
    email: String
    password: String
}

export class UserService {
    async createUser({
        name,
        biograph,
        photo,
        email,
        password,
    }: UserRequest): Promise<User | Error> {
        const repo = getRepository(User)

        if (!name || !biograph || !photo || !email || !password) {
            return new Error('Missing parameters')
        }

        if (await repo.findOne({ where: { email } })) {
            return new Error('User already exists')
        }

        const pwd_secrete = process.env.PWD_SECRET

        let hashPassword = await bcrypt.hash(password + pwd_secrete, 10)

        const user = repo.create({
            name,
            biograph,
            photo,
            email,
            password: hashPassword,
        })

        await repo.save(user)

        return user
    }

    async loginUser({ email, password }: LoginRequest): Promise<User | Error> {
        const repo = getRepository(User)

        if (!email || !password) {
            return new Error('Missing parameters')
        }
        const user = await repo.findOne({ where: { email } })

        if (!user) {
            return new Error('User already exists')
        }

        const pwd_secrete = process.env.PWD_SECRET

        const result = await bcrypt.compare(
            String(password + pwd_secrete),
            String(user.password)
        )

        if (result) {
            return user
        }
        return new Error('Invalid credentials')
    }

    async getUser(id: String): Promise<User | Error> {
        const repo = getRepository(User)

        const user = await repo.findOne({
            where: { id },
            select: ['name', 'biograph', 'email', 'photo'],
        })

        if (!user) {
            return new Error('User does not exists')
        }
        return user
    }
}
