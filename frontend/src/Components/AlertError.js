import styles from './AlertError.module.css'
import Modal from 'react-modal'

function AlertError({ showAlert, title, message, cbDismiss }) {
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
                    <button onClick={cbDismiss}>Ok</button>
                </div>
            </div>
        </Modal>
    )
}

export default AlertError
