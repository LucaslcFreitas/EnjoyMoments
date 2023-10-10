import { getRepository } from 'typeorm'
import { Post } from '../entities/Post'
import { User } from '../entities/User'
import { Like } from '../entities/Like'
import { CommentService } from './CommentService'
import { LikeService } from './LikeService'

type PostsRequest = {
    user_id: String
    title: String
    description: String
    photo: String
}

type PostsUpdateRequest = {
    id: String
    user_id: String
    title: String
    description: String
    photo: String
}

export class PostService {
    async createPost({
        user_id,
        title,
        description,
        photo,
    }: PostsRequest): Promise<Error | Post> {
        const repoPost = getRepository(Post)
        const repoUser = getRepository(User)

        if (!(await repoUser.findOne({ where: { id: user_id } }))) {
            return new Error('User does not exists!')
        }

        const post = repoPost.create({ user_id, title, description, photo })

        await repoPost.save(post)

        return post
    }

    async getAllPosts() {
        const repo = getRepository(Post)

        const posts = await repo.find({
            relations: ['user'],
            select: ['id', 'title', 'description', 'photo', 'create_at'],
        })

        return posts
    }

    async getMyPosts(user_id: String) {
        const repo = getRepository(Post)

        const my_posts = await repo.find({
            relations: ['user'],
            select: ['id', 'title', 'description', 'photo', 'create_at'],
            where: { user_id },
        })

        return my_posts
    }

    async getPost(id: String) {
        const repo = getRepository(Post)

        if (!id) {
            return new Error('Invalid or non-existent identifier')
        }

        const post = await repo.findOne(String(id), {
            relations: ['user'],
            select: ['id', 'title', 'description', 'photo', 'create_at'],
        })

        if (!post) {
            return new Error('Post does not exists')
        }
        return post
    }

    async deletePost(id: String) {
        const repo = getRepository(Post)

        if (!(await repo.findOne(String(id)))) {
            return new Error('Post does not exists')
        }

        const commentService = new CommentService()
        commentService.deleteAllLikePost(id)

        const likeService = new LikeService()
        likeService.deleteAllLikePost(id)

        await repo.delete(String(id))
    }

    async updatePost({
        id,
        user_id,
        title,
        description,
        photo,
    }: PostsUpdateRequest) {
        const repo = getRepository(Post)

        const post = await repo.findOne(String(id))

        if (!post) {
            return new Error('Post does not exists')
        }

        if (user_id != post.user_id) {
            return new Error('Unauthorized update')
        }

        if (!title || !description) {
            return new Error('Missing parameters')
        }

        post.title = title
        post.description = description

        await repo.save(post)

        return post
    }
}
