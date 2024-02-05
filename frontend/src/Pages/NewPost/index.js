import styles from './NewPost.module.css'
import { SlCloudUpload } from 'react-icons/sl'
import { useState, useEffect } from 'react'
import api from '../../Services/api'
import useAuth from '../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import AlertConfirmSingle from '../../Components/AlertConfirmSingle'
import AlertError from '../../Components/AlertError'

function NewPost() {
    const [image, setImage] = useState()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [imagePreview, setImagePreview] = useState()

    const { userToken } = useAuth()
    const navigate = useNavigate()

    //confirmations
    const [showAlertConfirm, setShowAlertConfirm] = useState(false)
    const [showAlertError, setShowAlertError] = useState(false)

    useEffect(() => {
        document.title = 'Criar Post | Enjoy Moments'
    }, [])

    useEffect(() => {
        if (!image) {
            setImagePreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(image)
        setImagePreview(objectUrl)
    }, [image])

    function onSubmit(e) {
        e.preventDefault()

        let formData = new FormData()
        formData.append('title', title)
        formData.append('description', content)
        formData.append('photo', image)

        api.post('/post', formData, {
            headers: { 'x-access-token': userToken },
        })
            .then((response) => {
                setShowAlertConfirm(true)
            })
            .catch((error) => {
                console.log(error)
                setShowAlertError(true)
            })
    }

    function onConfirm() {
        navigate('/MyPosts')
    }

    return (
        <div className={styles.newpost_container}>
            <AlertConfirmSingle
                showAlert={showAlertConfirm}
                title="Post Criado"
                message="Seu post já foi criado e está disponível para o mundo!"
                cbOk={onConfirm}
            />
            <AlertError
                showAlert={showAlertError}
                title="Erro"
                message="Ocorreu um erro inesperado. Por favor tente mais tarde."
                cbDismiss={() => setShowAlertError(false)}
            />
            <h2>Crie seu post</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className={styles.image}>
                    <img
                        src={imagePreview ? imagePreview : './img/newpost.png'}
                    />

                    <label className={styles.custum_file_upload} htmlFor="file">
                        <div className={styles.icon}>
                            <SlCloudUpload />
                        </div>
                        <div className={styles.text}>
                            <span>Clique para carregar imagem</span>
                        </div>
                        <input
                            type="file"
                            id="file"
                            accept="image/png, image/jpeg"
                            required
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                </div>
                <div className={styles.form_control}>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Digite um título"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.form_control}>
                    <label htmlFor="content">Conteúdo:</label>
                    <textarea
                        name="content"
                        rows="5"
                        cols="33"
                        placeholder="Conte sobre o que é este post"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className={styles.form_btn}>
                    <span>Publicar</span>
                </button>
            </form>
        </div>
    )
}

export default NewPost
