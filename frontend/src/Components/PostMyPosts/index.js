import styles from './PostMyPosts.module.css'
import { AiFillDelete } from 'react-icons/ai'

function PostMyPosts({
    id,
    title,
    photo,
    create_at,
    user_photo,
    user_name,
    showAlertDelete,
}) {
    return (
        <div className={styles.post_container}>
            <button className={styles.delete} onClick={showAlertDelete}>
                <AiFillDelete />
            </button>
            <img src={photo} alt={`Imagem do post ${title}`} />
            <div className={styles.content}>
                <img
                    className={styles.profile}
                    src={user_photo}
                    alt={`Imagem de perfil do usário ${user_name}`}
                />
                <div className={styles.datas}>
                    <h2>{title}</h2>
                    <p>{`${user_name} - ${create_at}`}</p>
                </div>
            </div>
        </div>
    )
}

export default PostMyPosts
