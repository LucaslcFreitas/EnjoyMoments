import { AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import styles from './LoginForm.module.css'

function LoginForm({
    email,
    password,
    setEmail,
    setPassword,
    onSubmit,
    errorMessage,
}) {
    return (
        <div className={styles.form_container}>
            <form onSubmit={(e) => onSubmit(e)}>
                <h1>Entrar</h1>

                <div className={styles.form_control}>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Digite seu e-mail"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.form_control}>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Digite sua senha"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.form_control}>
                    <button type="submit" className={styles.form_btn}>
                        Entrar <AiOutlineArrowRight />
                    </button>
                </div>
                {errorMessage ? <p>{errorMessage}</p> : ''}
            </form>

            <div className={styles.create_acount}>
                <Link to="/signup">
                    <button>Criar uma conta</button>
                </Link>
            </div>
        </div>
    )
}

export default LoginForm
