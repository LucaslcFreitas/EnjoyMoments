import { getRepository } from 'typeorm'
import { Comment } from '../entities/Comment'
import { UserService } from './UserService'
import { PostService } from './PostService'

type CommentRequest = {
    user_id: String
    post_id: String
    comment: String
}

export class CommentService {
    async createComment({
        user_id,
        post_id,
        comment,
    }: CommentRequest): Promise<Comment | Error> {
        const repo = getRepository(Comment)

        const user = await new UserService().getUser(user_id)
        const post = await new PostService().getPost(post_id)

        if (user instanceof Error || post instanceof Error || !comment) {
            return new Error('Invalid parameters')
        }

        const comm = repo.create({ user_id, post_id, comment })

        await repo.save(comm)

        return comm
    }

    async getComments(post_id: String) {
        const repo = getRepository(Comment)

        if (!post_id) return new Error('Invalid parameters')

        const comments = await repo.find({
            relations: ['user'],
            where: { post_id },
        })

        return comments
    }

    async deleteComment(id: String, user_id: String) {
        const repo = getRepository(Comment)

        const comment = await repo.findOne(String(id))

        if (!comment) {
            return new Error('Comment does not exists')
        }

        if (comment.user_id != user_id) {
            return new Error('Unauthorized action')
        }

        await repo.delete(String(id))
    }

    //internal function
    async deleteAllLikePost(post_id: String) {
        const repo = getRepository(Comment)

        const comments = await repo.find({
            where: {
                post_id,
            },
        })

        comments.map(async (comment) => {
            await repo.delete(String(comment.id))
        })
        return
    }
}
