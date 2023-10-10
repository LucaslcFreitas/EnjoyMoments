import { getRepository } from 'typeorm'
import { Like } from '../entities/Like'
import { UserService } from './UserService'
import { PostService } from './PostService'

type LikeRequest = {
    user_id: String
    post_id: String
}

export class LikeService {
    async createLike({ user_id, post_id }: LikeRequest): Promise<Like | Error> {
        const repo = getRepository(Like)

        if (!user_id || !post_id) {
            return new Error('Invalid parameters')
        }

        const user = await new UserService().getUser(user_id)
        const post = await new PostService().getPost(post_id)

        if (user instanceof Error || post instanceof Error) {
            return new Error('Invalid parameters')
        }

        const liked = await repo.findOne(null, {
            where: {
                user_id,
                post_id,
                active: true,
            },
        })

        if (liked) {
            return new Error('Post already marked as liked')
        }

        const like = repo.create({ user_id, post_id })

        await repo.save(like)

        return like
    }

    async getUserLiked({
        user_id,
        post_id,
    }: LikeRequest): Promise<Like | Error> {
        const repo = getRepository(Like)

        if (!user_id || !post_id) {
            return new Error('Invalid parameters')
        }

        const user = await new UserService().getUser(user_id)
        const post = await new PostService().getPost(post_id)

        if (user instanceof Error || post instanceof Error) {
            return new Error('Invalid parameters')
        }

        const like = await repo.findOne(null, {
            where: {
                user_id,
                post_id,
                active: true,
            },
        })

        return like
    }

    async getContLikes(post_id: String): Promise<Number | Error> {
        const repo = getRepository(Like)

        if (!post_id) return new Error('Invalid parameters')

        const post = await new PostService().getPost(post_id)

        if (post instanceof Error) {
            return new Error('Invalid parameters')
        }

        const liked = await repo.find({ where: { post_id, active: true } })
        return liked.length
    }

    async setUnlike({ user_id, post_id }: LikeRequest) {
        const repo = getRepository(Like)

        if (!user_id || !post_id) {
            return new Error('Invalid parameters')
        }

        const user = await new UserService().getUser(user_id)
        const post = await new PostService().getPost(post_id)

        if (user instanceof Error || post instanceof Error) {
            return new Error('Invalid parameters')
        }

        const like = await repo.findOne(null, {
            where: {
                user_id,
                post_id,
                active: true,
            },
        })

        if (like) {
            like.active = false
            await repo.save(like)
        }
        return
    }

    //internal function
    async deleteAllLikePost(post_id: String) {
        const repo = getRepository(Like)

        const likes = await repo.find({
            where: {
                post_id,
            },
        })

        likes.map(async (like) => {
            await repo.delete(String(like.id))
        })
        return
    }
}
