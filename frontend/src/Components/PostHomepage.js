import { Link } from 'react-router-dom'
import styles from './PostHomepage.module.css'

function PostHomepage({ id, title, photo, create_at, user_photo, user_name }) {
    return (
        <Link to={`/post/${id}`} className={styles.post_container}>
            <img src={photo} />
            <div className={styles.content}>
                <img className={styles.profile} src={user_photo} />
                <div className={styles.datas}>
                    <h2>{title}</h2>
                    <p>{`${user_name} - ${create_at}`}</p>
                </div>
            </div>
        </Link>
    )
}

export default PostHomepage
