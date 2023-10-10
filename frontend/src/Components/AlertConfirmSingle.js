import styles from './AlertConfirmSingle.module.css'
import Modal from 'react-modal'

function AlertConfirmSingle({ showAlert, title, message, cbOk }) {
    return (
        <Modal
            isOpen={showAlert}
            onRequestClose={cbOk}
            className={styles.modal}
            ariaHideApp={false}
        >
            <div>
                <h2>{title}</h2>
                <p>{message}</p>
                <div className={styles.buttons}>
                    <button onClick={cbOk} className={styles.btconfirm}>
                        OK
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default AlertConfirmSingle
