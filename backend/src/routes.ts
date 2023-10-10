import { Router } from 'express'
import { UserController } from './controller/UserController'
import upload from './config/Multer'
import { PostController } from './controller/PostController'
import { verifyJWD } from './middleware/authToken'
import { CommentController } from './controller/CommentController'
import { LikeController } from './controller/LikeController'
import { handleGetImage } from './controller/ImagesController'

const routes = Router()

//User
routes.post(
    '/user/register',
    upload.single('photo'),
    new UserController().handleCreate
)
routes.post('/user/login', new UserController().handleLogin)
routes.get('/user', verifyJWD, new UserController().handleGet)

//Posts
routes.post(
    '/post',
    verifyJWD,
    upload.single('photo'),
    new PostController().handleCreate
)
routes.get('/post', verifyJWD, new PostController().handleGetAllPosts)
routes.get('/post/my', verifyJWD, new PostController().handleGetMyPosts)
routes.get('/post/:id', verifyJWD, new PostController().handleGetPost)
routes.delete('/post/:id', verifyJWD, new PostController().handleDeletePost)
routes.put('/post/:id', verifyJWD, new PostController().hendleUpdatePost)

//Comments
routes.post('/comment', verifyJWD, new CommentController().handleCreateComment)
routes.get(
    '/comment/:post_id',
    verifyJWD,
    new CommentController().handleGetComments
)
routes.delete(
    '/comment/:id',
    verifyJWD,
    new CommentController().handleDeleteComment
)

//Likes
routes.post('/like/:post_id', verifyJWD, new LikeController().handleCreateLike)
routes.get(
    '/like/my/:post_id',
    verifyJWD,
    new LikeController().handleGetUserLiked
)
routes.get('/like/:post_id', verifyJWD, new LikeController().handleGetContLikes)
routes.post('/unlike/:post_id', verifyJWD, new LikeController().handleSetUnlike)

//Images (public)
routes.get('*', handleGetImage)

export { routes }
