import { Request, Response } from 'express'
import { LikeService } from '../services/LikeService'

export class LikeController {
    async handleCreateLike(request: Request, response: Response) {
        const { post_id } = request.params
        const user_id = request.auth_user_id

        const service = new LikeService()

        const result = await service.createLike({ user_id, post_id })

        if (result instanceof Error) {
            return response.status(400).json({ message: result.message })
        }
        return response.json({
            id: result.id,
            post_id: result.post_id,
            create_at: result.create_at,
        })
    }

    async handleGetUserLiked(request: Request, response: Response) {
        const { post_id } = request.params
        const user_id = request.auth_user_id

        const service = new LikeService()

        const result = await service.getUserLiked({ user_id, post_id })

        if (result instanceof Error) {
            return response.status(400).json({ message: result.message })
        }
        if (result) {
            return response.json({ liked: true })
        }
        return response.json({ liked: false })
    }

    async handleGetContLikes(request: Request, response: Response) {
        const { post_id } = request.params

        const service = new LikeService()

        const result = await service.getContLikes(post_id)

        if (result instanceof Error) {
            return response.status(400).json({ message: result.message })
        }

        return response.json({ likes: result })
    }

    async handleSetUnlike(request: Request, response: Response) {
        const { post_id } = request.params
        const user_id = request.auth_user_id

        const service = new LikeService()

        const result = await service.setUnlike({ user_id, post_id })

        if (result instanceof Error) {
            return response.status(400).json({ message: result.message })
        }
        return response.json({ liked: false })
    }
}
