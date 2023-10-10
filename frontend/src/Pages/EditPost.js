import styles from './EditPost.module.css'
import { SlCloudUpload } from 'react-icons/sl'
import { useState, useEffect } from 'react'
import api from '../Services/api'
import useAuth from '../Hooks/useAuth'
import { useNavigate, useParams } from 'react-router-dom'
import AlertConfirmSingle from '../Components/AlertConfirmSingle'
import AlertError from '../Components/AlertError'

function EditPost() {
    let { id } = useParams()

    const [image, setImage] = useState()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [imagePreview, setImagePreview] = useState()

    const { userToken } = useAuth()
    const navigate = useNavigate()

    const [loadError, setLoadError] = useState(false)

    //confirmations
    const [showAlertConfirm, setShowAlertConfirm] = useState(false)
    const [showAlertError, setShowAlertError] = useState(false)

    useEffect(() => {
        if (id) {
            api.get(`/post/${id}`, { headers: { 'x-access-token': userToken } })
                .then((response) => {
                    // setImage(response.data.photo)
                    api.get(response.data.photo)
                        .then((resp) => console.log(resp.data))
                        .catch((er) => setLoadError(true))

                    setTitle(response.data.title)
                    setContent(response.data.description)
                })
                .catch((error) => {
                    console.log(error)
                    setLoadError(true)
                })
        }
    }, [])

    useEffect(() => {
        if (!image) {
            setImagePreview(undefined)
            return
        }
        console.log(typeof image)
        // const objectUrl = URL.createObjectURL(image)
        setImagePreview(image)
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
        <div className={styles.editpost_container}>
            {image && title && content ? (
                <>
                    <AlertConfirmSingle
                        showAlert={showAlertConfirm}
                        title="Post Atualizado"
                        message="Seu post foi atualizado com sucesso!"
                        cbOk={onConfirm}
                    />
                    <AlertError
                        showAlert={showAlertError}
                        title="Erro"
                        message="Ocorreu um erro inesperado. Por favor tente mais tarde."
                        cbDismiss={() => setShowAlertError(false)}
                    />
                    <h2>Atualize seu post</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className={styles.image}>
                            <img src={imagePreview} />
                            <p>*A imagem do seu post não pode ser atualizada</p>
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
                            Atualizar
                        </button>
                    </form>
                </>
            ) : !loadError ? (
                <p>Carregando...</p>
            ) : (
                <p>Desculpe, não foi possivel carregar seu post!</p>
            )}
        </div>
    )
}

export default EditPost
