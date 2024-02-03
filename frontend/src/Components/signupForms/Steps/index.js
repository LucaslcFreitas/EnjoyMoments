import { AiOutlineUser } from 'react-icons/ai'
import { HiPhotograph } from 'react-icons/hi'
import { FiSend } from 'react-icons/fi'
import styles from './Steps.module.css'

function Steps({ currentStep }) {
    return (
        <div className={styles.steps}>
            <div className={`${styles.step} ${styles.active}`}>
                <AiOutlineUser />
                <p>Identificação</p>
            </div>
            <div
                className={`${styles.step} ${
                    currentStep >= 1 ? styles.active : ''
                }`}
            >
                <HiPhotograph />
                <p>Descrição</p>
            </div>
            <div
                className={`${styles.step} ${
                    currentStep >= 2 ? styles.active : ''
                }`}
            >
                <FiSend />
                <p>Envio</p>
            </div>
        </div>
    )
}

export default Steps
