import styles from './Signup.module.css'
import UserForm from '../../Components/signupForms/UserForm'
import ProfileForm from '../../Components/signupForms/ProfileForm'
import Tanks from '../../Components/signupForms/Tanks'
import Steps from '../../Components/signupForms/Steps'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { FiSend } from 'react-icons/fi'
import useAuth from '../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../Hooks/useForm'
import { useState, useEffect } from 'react'

const formTemplate = {
    name: '',
    email: '',
    password: '',
    biograph: '',
    photo: undefined,
}

function Signup() {
    //Atributos do Formulário
    const [data, setData] = useState(formTemplate)

    const { signup, signed } = useAuth()
    const navigate = useNavigate()

    const [submited, setSubmited] = useState(false)

    useEffect(() => {
        document.title = 'Criar conta | Enjoy Moments'
        if (signed) {
            navigate('/home')
            return
        }
    }, [])

    const updateFieldHandler = (key, value) => {
        setData((prev) => {
            return { ...prev, [key]: value }
        })
    }

    const formComponents = [
        <UserForm data={data} updateFieldHandler={updateFieldHandler} />,
        <ProfileForm data={data} updateFieldHandler={updateFieldHandler} />,
        <Tanks data={data} updateFieldHandler={updateFieldHandler} />,
    ]

    const {
        currentStep,
        currentComponent,
        changeStep,
        isLastStep,
        isFirstStep,
    } = useForm(formComponents)

    function submitForm(step, e) {
        e.preventDefault()
        if (step === formComponents.length) {
            if (!submited) {
                setSubmited(true)

                signup(
                    data.name,
                    data.biograph,
                    data.photo,
                    data.email,
                    data.password,
                    () => {
                        navigate('/home')
                    },
                    () => {
                        setSubmited(false)
                    }
                )
            }
        } else {
            changeStep(currentStep + 1, e)
        }
    }

    return (
        <section className={styles.signup_wrap}>
            <div className={styles.signup_container}>
                <div className={styles.form_container}>
                    <h1>Crie sua conta agora!</h1>
                    <Steps currentStep={currentStep} />
                    <form
                        className={styles.form}
                        onSubmit={(e) => submitForm(currentStep + 1, e)}
                    >
                        <div className={styles.imputs_container}>
                            {currentComponent}
                        </div>
                        <div className={styles.actions}>
                            {!isFirstStep && (
                                <button
                                    type="button"
                                    onClick={() => changeStep(currentStep - 1)}
                                >
                                    <GrFormPrevious />
                                    <span>Voltar</span>
                                </button>
                            )}
                            {!isLastStep ? (
                                <button type="submit">
                                    <span>Avançar</span>
                                    <GrFormNext />
                                </button>
                            ) : (
                                <button type="submit">
                                    <span>Enviar</span>
                                    <FiSend />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Signup
