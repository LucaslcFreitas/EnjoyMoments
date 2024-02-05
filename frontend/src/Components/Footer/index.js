import styles from './Footer.module.css'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

function Footer() {
    return (
        <div className={styles.footer_container}>
            <div>
                <a
                    href="https://github.com/LucaslcFreitas/ProjetoReactJs"
                    target="_blank"
                >
                    <AiFillGithub />
                </a>
                <a
                    href="https://www.linkedin.com/in/lucas-freitas-82b560205/"
                    target="_blank"
                >
                    <AiFillLinkedin />
                </a>
            </div>
            <h2>Enjoy Moments © 2023 - Todos os Direitos Reservados</h2>
        </div>
    )
}

export default Footer
