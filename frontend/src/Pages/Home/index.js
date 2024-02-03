import styles from './Home.module.css'
import PostHomepage from '../../Components/PostHomepage'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../Services/api'
import useAuth from '../../Hooks/useAuth'
import $ from 'jquery'
import { sortByTitle, sortByDateAsc, sortByDateDesc } from '../../utils/sort'
import formatDate from '../../utils/formatDate'
import { FaPlus } from 'react-icons/fa6'

//icons
import { MdSortByAlpha } from 'react-icons/md'
import { FaSortAmountUpAlt, FaSortAmountDown } from 'react-icons/fa'

function Home() {
    const { userToken, signout } = useAuth()
    const [postsOriginals, setPostsOriginals] = useState([])
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/post', { headers: { 'x-access-token': userToken } })
            .then((response) => {
                setPostsOriginals(response.data)
                assignOrderedData(response.data, sortByDateDesc)
            })
            .catch((error) => {
                console.log(error)
                if (!error.response || error.response.status === 401) {
                    signout()
                    navigate('/login')
                }
            })
    }, [])

    function assignOrderedData(data, functionSort) {
        let newData = [...data]
        newData.sort(functionSort)
        setPosts(newData)
    }

    function newPost() {
        navigate('/newpost')
    }

    $(function () {
        $(window).on('scroll', function () {
            var scrollPosition = $(this).scrollTop()
            if (scrollPosition > 200) {
                $('#control').css({
                    '-webkit-transform': 'translateY(-120px)',
                })
            } else {
                $('#control').css({
                    '-webkit-transform': 'translateY(0px)',
                })
            }
        })
    })

    return (
        <div className={styles.home_container}>
            <h2>Veja o que o mundo tem de melhor...</h2>
            <div className={styles.posts_container}>
                <div className={styles.control}>
                    <div id="control" className={styles.control_lock}>
                        <button onClick={newPost} id={styles.newpost}>
                            <span className={styles.button_label}>
                                Criar Post
                            </span>
                            <div className={styles.button_plus}>
                                <FaPlus />
                            </div>
                        </button>
                        <p className={styles.title_sort}>Ordenação:</p>
                        <button
                            onClick={() =>
                                assignOrderedData(postsOriginals, sortByTitle)
                            }
                        >
                            <span className={styles.button_label}>
                                Alfabética
                            </span>
                            <MdSortByAlpha />
                        </button>
                        <button
                            onClick={() =>
                                assignOrderedData(
                                    postsOriginals,
                                    sortByDateDesc
                                )
                            }
                        >
                            <span className={styles.button_label}>
                                Mais Recente
                            </span>
                            <FaSortAmountUpAlt />
                        </button>
                        <button
                            onClick={() =>
                                assignOrderedData(postsOriginals, sortByDateAsc)
                            }
                        >
                            <span className={styles.button_label}>
                                Mais Antiga
                            </span>
                            <FaSortAmountDown />
                        </button>
                    </div>
                </div>
                <div className={styles.posts}>
                    {posts.length > 0 ? (
                        posts.map((post) => {
                            return (
                                <PostHomepage
                                    key={post.id}
                                    id={post.id}
                                    title={post.title}
                                    photo={post.photo}
                                    create_at={formatDate(post.create_at)}
                                    user_photo={post.user.photo}
                                    user_name={post.user.name}
                                />
                            )
                        })
                    ) : (
                        <p>Não há nenhum post por enquanto</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
