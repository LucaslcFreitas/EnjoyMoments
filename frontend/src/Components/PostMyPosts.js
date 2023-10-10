import styles from './PostMyPosts.module.css'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

function PostMyPosts({
    id,
    title,
    photo,
    create_at,
    user_photo,
    user_name,
    showAlertDelete,
}) {
    const navigate = useNavigate()

    return (
        <div className={styles.post_container}>
            <button className={styles.delete} onClick={showAlertDelete}>
                <AiFillDelete />
            </button>
            <img src={photo} />
            <div className={styles.content}>
                <img className={styles.profile} src={user_photo} />
                <div className={styles.datas}>
                    <h2>{title}</h2>
                    <p>{`${user_name} - ${create_at}`}</p>
                </div>
                {/* <button
                    onClick={() => navigate(`/edit/${id}`)}
                    className={styles.edit}
                >
                    Editar <AiFillEdit />
                </button> */}
            </div>
        </div>
    )
}

export default PostMyPosts
