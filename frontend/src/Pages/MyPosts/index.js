import styles from './MyPosts.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { sortByDateAsc } from '../../utils/sort'
import api from '../../Services/api'
import useAuth from '../../Hooks/useAuth'
import PostMyPosts from '../../Components/PostMyPosts'
import AlertConfirm from '../../Components/AlertConfirm'
import AlertError from '../../Components/AlertError'

function MyPosts() {
    const { userToken, signout } = useAuth()
    const [myPosts, setMyPosts] = useState([])

    const navigate = useNavigate()

    //Error configs
    const [showAlertError, setShowAlertError] = useState(false)

    //Alert configs
    const [showAlert, setShowAlert] = useState(false)
    const [deletePostId, setDeletePostId] = useState(null)
    function deleteConfirm() {
        if (deletePostId) {
            api.delete(`/post/${deletePostId}`, {
                headers: { 'x-access-token': userToken },
            })
                .then((response) => {
                    const remainingPosts = myPosts.filter(
                        (post) => post.id !== deletePostId
                    )
                    setMyPosts(remainingPosts)
                    setShowAlert(false)
                    setDeletePostId(null)
                })
                .catch((error) => {
                    console.log(error)
                    setShowAlert(false)
                    setTimeout(() => {
                        setShowAlertError(true)
                    }, 700)
                    setDeletePostId(null)
                })
        } else {
            setShowAlert(false)
            setTimeout(() => {
                setShowAlertError(true)
            }, 700)
            setDeletePostId(null)
        }
    }

    useEffect(() => {
        api.get('/post/my', { headers: { 'x-access-token': userToken } })
            .then((response) => {
                let data = [...response.data]
                data.sort(sortByDateAsc)
                setMyPosts(data)
            })
            .catch((error) => {
                console.log(error)
                if (!error.response || error.response.status === 401) {
                    signout()
                    navigate('/login')
                }
            })
    }, [])

    return (
        <div className={styles.myposts_container}>
            <AlertConfirm
                showAlert={showAlert}
                title="Confirme a exclusão"
                message="Deseja realmente excluir este post?"
                cbConfirm={deleteConfirm}
                cbDismiss={() => setShowAlert(false)}
            />
            <AlertError
                showAlert={showAlertError}
                title="Erro"
                message="Ocorreu um erro ao excluir este post"
                cbDismiss={() => setShowAlertError(false)}
            />
            <div className={styles.myposts_header}>
                <h2>Compartilhe com o mundo suas histórias</h2>
                <Link to="/newpost">
                    <p className={styles.add_post_label}>Criar post</p>{' '}
                    <FaPlus />
                </Link>
            </div>
            <div className={styles.myposts_body}>
                {myPosts.length > 0 ? (
                    myPosts.map((post) => {
                        const data = new Date(post.create_at)
                        const dataFormated =
                            data.getDate() +
                            '/' +
                            (data.getMonth() + 1) +
                            '/' +
                            data.getFullYear()
                        return (
                            <PostMyPosts
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                photo={post.photo}
                                create_at={dataFormated}
                                user_photo={post.user.photo}
                                user_name={post.user.name}
                                showAlertDelete={() => {
                                    setShowAlert(true)
                                    setDeletePostId(post.id)
                                }}
                            />
                        )
                    })
                ) : (
                    <p>Nenhum post encontrado</p>
                )}
            </div>
        </div>
    )
}

export default MyPosts
