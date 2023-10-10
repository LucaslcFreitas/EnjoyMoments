import styles from './AlertConfirm.module.css'
import Modal from 'react-modal'

function AlertConfirm({ showAlert, title, message, cbConfirm, cbDismiss }) {
    return (
        <Modal
            isOpen={showAlert}
            onRequestClose={cbDismiss}
            className={styles.modal}
            ariaHideApp={false}
        >
            <div>
                <h2>{title}</h2>
                <p>{message}</p>
                <div className={styles.buttons}>
                    <button onClick={cbDismiss} className={styles.btdismiss}>
                        Não
                    </button>
                    <button onClick={cbConfirm} className={styles.btconfirm}>
                        Sim
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default AlertConfirm
