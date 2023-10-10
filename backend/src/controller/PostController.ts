import { Request, Response } from 'express'
import { PostService } from '../services/PostService'

export class PostController {
    async handleCreate(request: Request, response: Response) {
        const { title, description } = request.body
        const user_id = request.auth_user_id

        const aux = request.file.path.split('\\')

        const photo =
            'http://' +
            process.env.IP_ADDRESS +
            ':' +
            process.env.PORT +
            '/' +
            aux[aux.length - 1]

        const service = new PostService()

        const result = await service.createPost({
            user_id,
            title,
            description,
            photo,
        })

        if (result instanceof Error) {
            return response.status(400).json({ message: result.message })
        }
        return response.json({
            id: result.id,
            title: result.title,
            description: result.description,
            photo: result.photo,
            create_at: result.create_at,
        })
    }

    async handleGetAllPosts(request: Request, response: Response) {
        const service = new PostService()

        const posts = await service.getAllPosts()

        let result = []

        posts.map((post) => {
            result.push({
                id: post.id,
                title: post.title,
                description: post.description,
                photo: post.photo,
                create_at: post.create_at,
                user: {
                    name: post.user.name,
                    biograph: post.user.biograph,
                    photo: post.user.photo,
                },
            })
        })

        return response.json(result)
    }

    async handleGetMyPosts(request: Request, response: Response) {
        const service = new PostService()
        const user_id = request.auth_user_id

        const posts = await service.getMyPosts(user_id)

        let result = []

        posts.map((post) => {
            result.push({
                id: post.id,
                title: post.title,
                description: post.description,
                photo: post.photo,
                create_at: post.create_at,
                user: {
                    name: post.user.name,
                    biograph: post.user.biograph,
                    photo: post.user.photo,
                },
            })
        })

        return response.json(result)
    }

    async handleGetPost(request: Request, response: Response) {
        const { id } = request.params

        const service = new PostService()

        const result = await service.getPost(id)

        if (result instanceof Error) {
            return response.status(404).json({ message: result.message })
        }
        return response.json({
            id: result.id,
            title: result.title,
            description: result.description,
            photo: result.photo,
            create_at: result.create_at,
            user: {
                name: result.user.name,
                biograph: result.user.biograph,
                photo: result.user.photo,
            },
        })
    }

    async handleDeletePost(request: Request, response: Response) {
        const { id } = request.params

        const service = new PostService()

        const result = await service.deletePost(id)

        if (result instanceof Error) {
            return response.status(404).json({ message: result.message })
        }
        return response.status(204).end()
    }

    async hendleUpdatePost(request: Request, response: Response) {
        const { id } = request.params
        const user_id = request.auth_user_id
        const { title, description, photo } = request.body

        const service = new PostService()

        const result = await service.updatePost({
            id,
            user_id,
            title,
            description,
            photo,
        })

        if (result instanceof Error) {
            if (result.message == 'Unauthorized update') {
                return response.status(401).json({ message: result.message })
            }
            return response.status(400).json({ message: result.message })
        }

        return response.status(200).end()
    }
}
