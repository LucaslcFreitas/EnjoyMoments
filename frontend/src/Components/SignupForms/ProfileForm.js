import { useEffect, useState } from 'react'
import style from './SignupForms.module.css'

function ProfileForm({ data, updateFieldHandler }) {
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (!data.photo) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(data.photo)
        setPreview(objectUrl)
    }, [data.photo])

    return (
        <div className={style.profile}>
            <h3>Queremos saber mais sobre você!</h3>

            <div className={style.form_control_profile}>
                <img
                    className={style.profile_user}
                    id="profile"
                    src={preview ? preview : './img/user.png'}
                    alt="Imagem do usuário"
                />
                <label htmlFor="photo">{data.name}</label>
                <input
                    type="file"
                    name="photo"
                    id="photo"
                    accept="image/png, image/jpeg"
                    required
                    onChange={(e) =>
                        updateFieldHandler('photo', e.target.files[0])
                    }
                />
            </div>

            <div className={style.form_control}>
                <label htmlFor="biograph">Biografia:</label>
                <textarea
                    id="biograph"
                    name="biograph"
                    rows="5"
                    cols="33"
                    placeholder="Conte um pouco sobre sua vida..."
                    required
                    value={data.biograph}
                    onChange={(e) =>
                        updateFieldHandler('biograph', e.target.value)
                    }
                ></textarea>
            </div>
        </div>
    )
}

export default ProfileForm
