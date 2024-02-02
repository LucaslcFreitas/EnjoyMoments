import { useEffect, useState } from 'react'
import LoginForm from '../../Components/LoginForm'
import styles from './Login.module.css'
import useAuth from '../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function Login() {
    const { signin, signed } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    useEffect(() => {
        if (signed) {
            navigate('/home')
            return
        }
    }, [])

    function submitForm(e) {
        e.preventDefault()

        setError('')
        if (!email || !password) {
            setError('Preencha todos os campos')
            return
        }

        signin(
            email,
            password,
            () => navigate('/home'),
            (loginError) => {
                switch (loginError.response.data.message) {
                    case 'Missing parameters':
                        setError('Preencha todos os campos')
                        break
                    case 'User already exists':
                        setError('Usuário não cadastrado')
                        break
                    case 'Invalid credentials':
                        setError('Credênciais inválidas')
                        break
                    default:
                        setError('Aconteceu um erro inesperado')
                        break
                }
            }
        )
    }

    return (
        <section className={styles.login_wrap}>
            <div className={styles.login_container}>
                <div className={styles.introduction}>
                    <h1>
                        Enjoy <span>Moments</span>
                    </h1>
                    <p>
                        Veja e compartilhe com o mundo os seus melhores{' '}
                        <span>momentos</span>!
                    </p>
                </div>
                <div>
                    <LoginForm
                        email={email}
                        password={password}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        onSubmit={submitForm}
                        errorMessage={error}
                    />
                </div>
            </div>
        </section>
    )
}

export default Login
