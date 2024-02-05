import styles from './NoPage.module.css'
import { Link } from 'react-router-dom'

function NoPage() {
    return (
        <div className={styles.nopage_container}>
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <Link to="/home">Ir para Home</Link>
        </div>
    )
}

export default NoPage
