import styles from './Post.module.css'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../Services/api'
import useAuth from '../Hooks/useAuth'
import { BiLike } from 'react-icons/bi'
import formatDate from '../utils/formatDate'

function Post() {
    const { userToken, signout } = useAuth()
    const [post, setPost] = useState()
    const [loadError, setLoadError] = useState(false)

    const navigate = useNavigate()

    let { id } = useParams()

    //like
    const [ILiked, setILiked] = useState(false)
    const [likes, setLikes] = useState(0)

    //coment
    const [coments, setComents] = useState()
    const [myComment, setMyComment] = useState()

    useEffect(() => {
        if (id) {
            //post
            api.get(`/post/${id}`, { headers: { 'x-access-token': userToken } })
                .then((response) => {
                    setPost(response.data)
                })
                .catch((error) => {
                    setLoadError(true)
                })
            //My like
            api.get(`/like/my/${id}`, {
                headers: {
                    'x-access-token': userToken,
                },
            })
                .then((response) => {
                    setILiked(response.data.liked)
                    console.log(response.data.liked)
                })
                .catch((error) => {
                    setLoadError(true)
                })
            //Count likes
            api.get(`/like/${id}`, {
                headers: {
                    'x-access-token': userToken,
                },
            })
                .then((response) => {
                    setLikes(response.data.likes)
                })
                .catch((error) => {
                    setLoadError(true)
                })
            //Comments
            api.get(`/comment/${id}`, {
                headers: {
                    'x-access-token': userToken,
                },
            })
                .then((response) => {
                    setComents(response.data)
                })
                .catch((error) => {
                    setLoadError(true)
                })
        } else {
            navigate('/NoPage')
        }
    }, [])

    function likeUnlike() {
        if (ILiked) {
            api.post(`/unlike/${id}`, null, {
                headers: {
                    'x-access-token': userToken,
                },
            })
                .then((response) => {
                    setILiked(false)
                    setLikes(likes - 1)
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            api.post(`/like/${id}`, null, {
                headers: { 'x-access-token': userToken },
            })
                .then((response) => {
                    setILiked(true)
                    setLikes(likes + 1)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    function updateComments() {
        api.get(`/comment/${id}`, {
            headers: {
                'x-access-token': userToken,
            },
        })
            .then((response) => {
                setComents(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function createComment(e) {
        e.preventDefault()

        if (myComment !== null) {
            api.post(
                '/comment',
                {
                    post_id: id,
                    comment: myComment,
                },
                {
                    headers: { 'x-access-token': userToken },
                }
            )
                .then((result) => {
                    updateComments()
                    setMyComment('')
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <div className={styles.post_container}>
            {post &&
            ILiked !== undefined &&
            likes !== undefined &&
            coments !== undefined ? (
                <div className={styles.post}>
                    <img src={post.photo} />
                    <h1>{post.title}</h1>
                    <p>{formatDate(post.create_at)}</p>
                    <div className={styles.profilelike}>
                        <div className={styles.profile}>
                            <img src={post.user.photo} />
                            <p>{post.user.name}</p>
                        </div>
                        <button
                            // id={ILiked ? 'liked' : ''}
                            className={`${styles.like} ${
                                ILiked ? styles.liked : ''
                            }`}
                            onClick={likeUnlike}
                        >
                            <BiLike />
                            <p>{likes} likes</p>
                        </button>
                    </div>
                    <div className={styles.description}>
                        <h2>Descrição</h2>
                        <p>{post.description}</p>
                    </div>
                    <div className={styles.comments}>
                        <h2>Comentários ({coments.length})</h2>
                        <form onSubmit={(e) => createComment(e)}>
                            <textarea
                                placeholder="Deixe seu comentário"
                                value={myComment}
                                onChange={(e) => setMyComment(e.target.value)}
                                required
                            />
                            <button type="submit">Enviar</button>
                        </form>
                        {coments.map((comment) => (
                            <div className={styles.comment}>
                                <img src={comment.user.photo} />
                                <div>
                                    <h3>
                                        {comment.user.name} -{' '}
                                        <span>
                                            {formatDate(comment.create_at)}
                                        </span>
                                    </h3>
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : !loadError ? (
                <p>Carregando...</p>
            ) : (
                <p>
                    Falha ao carregar o post. Por favor tente novamente mais
                    tarde.
                </p>
            )}
        </div>
    )
}

export default Post
