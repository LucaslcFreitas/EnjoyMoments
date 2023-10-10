import { Request, Response } from 'express'
import { CommentService } from '../services/CommentService'

export class CommentController {
    async handleCreateComment(request: Request, response: Response) {
        const { post_id, comment } = request.body
        const user_id = request.auth_user_id

        const service = new CommentService()

        const result = await service.createComment({
            user_id,
            post_id,
            comment,
        })

        if (result instanceof Error) {
            return response.status(400).json({ message: result.message })
        }

        return response.json({
            id: result.id,
            post_id: result.post_id,
            comment: result.comment,
            create_at: result.create_at,
        })
    }

    async handleGetComments(request: Request, response: Response) {
        const { post_id } = request.params

        const service = new CommentService()

        const comments = await service.getComments(post_id)

        if (comments instanceof Error) {
            return response.status(400).json({ message: comments.message })
        }

        const result = []

        comments.map((comment) => {
            result.push({
                id: comment.id,
                post_id: comment.post_id,
                comment: comment.comment,
                create_at: comment.create_at,
                user: {
                    name: comment.user.name,
                    biograph: comment.user.biograph,
                    photo: comment.user.photo,
                },
            })
        })

        return response.json(result)
    }

    async handleDeleteComment(request: Request, response: Response) {
        const { id } = request.params
        const user_id = request.auth_user_id

        const service = new CommentService()

        const result = await service.deleteComment(id, user_id)

        if (result instanceof Error) {
            return response.status(400).json({ message: result.message })
        }
        return response.end()
    }
}
