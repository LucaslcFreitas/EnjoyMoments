import styles from './Profile.module.css'
import { useState, useEffect } from 'react'
import api from '../Services/api'
import useAuth from '../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const { userToken, signout } = useAuth()

    const [profile, setProfile] = useState()
    const [loadError, setLoadError] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        api.get('/user', {
            headers: { 'x-access-token': userToken },
        })
            .then((response) => {
                setProfile(response.data)
            })
            .catch((error) => {
                setLoadError(true)
                if (!error.response || error.response.status === 401) {
                    signout()
                    navigate('/login')
                }
            })
    }, [])

    return (
        <div className={styles.profile_container}>
            {profile ? (
                <>
                    <div className={styles.image}>
                        <img src={profile.photo} />
                        <h2>{profile.name}</h2>
                    </div>
                    <form className={styles.formProfile}>
                        <div className={styles.form_control}>
                            <label htmlFor="name">Nome:</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                disabled
                            />
                        </div>
                        <div className={styles.form_control}>
                            <label htmlFor="email">E-mail:</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                disabled
                            />
                        </div>
                        <div className={styles.form_control}>
                            <label htmlFor="biograph">Biografia:</label>
                            <textarea
                                id="biograph"
                                name="biograph"
                                rows="5"
                                cols="33"
                                value={profile.biograph}
                                disabled
                            ></textarea>
                        </div>
                    </form>
                    <p className={styles.alert}>
                        *Dados do perfil não podem ser alterados.
                    </p>
                </>
            ) : loadError ? (
                <p>Falha ao carregar os dados</p>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    )
}

export default Profile
