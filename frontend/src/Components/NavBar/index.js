import styles from './NavBar.module.css'
import useAuth from '../../Hooks/useAuth'
import { PiChampagneFill } from 'react-icons/pi'
import { AiOutlineUser } from 'react-icons/ai'
import { BsFillFilePostFill } from 'react-icons/bs'
import { IoMenu, IoClose } from 'react-icons/io5'
import { ImExit } from 'react-icons/im'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../Services/api'

function NavBar() {
    const { signout, userToken } = useAuth()
    const navigate = useNavigate()

    const [userData, setUserData] = useState()

    //state for media query
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        api.get('/user', { headers: { 'x-access-token': userToken } })
            .then((response) => {
                setUserData(response.data)
            })
            .catch((error) => {
                console.log(error)
                if (!error.response || error.response.status === 401) {
                    logout()
                }
            })
    }, [])

    function logout() {
        signout()
        navigate('/login')
    }

    return (
        <nav className={styles.nav_container}>
            <Link to="/home" className={styles.nav_title}>
                <PiChampagneFill />
                <h1>
                    Enjoy <span>Moments</span>
                </h1>
            </Link>
            {userData && (
                <div className={styles.profile_options}>
                    <div className={styles.profile}>
                        <img src={userData.photo} />
                        <p>{userData.name}</p>
                        <div className={styles.dropdown_content}>
                            <Link to="/profile">
                                <p>Perfil</p>
                                <AiOutlineUser />
                            </Link>
                            <Link to="myposts">
                                <p>Meus Posts</p>
                                <BsFillFilePostFill />
                            </Link>
                            <a onClick={logout}>
                                <p>Sair</p>
                                <ImExit />
                            </a>
                        </div>
                    </div>
                </div>
            )}
            <div
                className={`${styles.menu_container_media} ${
                    showMenu ? styles.menu_container_media_show : ''
                }`}
            />
            <div
                className={`${styles.menu_content_media} ${
                    showMenu ? styles.menu_content_media_show : ''
                }`}
            >
                <div className={styles.nav_media_header}>
                    <h3>Menu</h3>
                    <button
                        className={styles.button_menu}
                        onClick={() => {
                            setShowMenu((s) => !s)
                        }}
                    >
                        <IoClose />
                    </button>
                </div>
                <Link to="/profile">
                    <p>Perfil</p>
                    <AiOutlineUser />
                </Link>
                <Link to="myposts">
                    <p>Meus Posts</p>
                    <BsFillFilePostFill />
                </Link>
                <a onClick={logout}>
                    <p>Sair</p>
                    <ImExit />
                </a>
            </div>
            <button
                className={styles.button_menu}
                onClick={() => {
                    setShowMenu((s) => !s)
                }}
            >
                <IoMenu />
            </button>
        </nav>
    )
}

export default NavBar
