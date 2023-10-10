import { createContext, useEffect, useState } from 'react'
import api from '../Services/api'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(
        localStorage.getItem('user_token')
    )

    useEffect(() => {
        const localToken = localStorage.getItem('user_token')
        if (localToken) {
            setUserToken(localToken)
        }
    }, [])

    const signin = (email, password, cbSuccess, cbError) => {
        api.post('/user/login', {
            email,
            password,
        })
            .then((response) => {
                const { token } = response.data
                setUserToken(token)
                localStorage.setItem('user_token', token)
                cbSuccess()
            })
            .catch((error) => {
                console.log(error)
                cbError(error)
            })
    }

    const signup = (
        name,
        biograph,
        photo,
        email,
        password,
        cbSuccess,
        cbError
    ) => {
        let formData = new FormData()
        formData.append('name', name)
        formData.append('biograph', biograph)
        formData.append('photo', photo)
        formData.append('email', email)
        formData.append('password', password)

        api.post('/user/register', formData, {
            headers: { 'content-type': 'multipart/form-data' },
        })
            .then((response) => {
                const { token } = response.data
                setUserToken(token)
                localStorage.setItem('user_token', token)
                cbSuccess()
            })
            .catch((error) => {
                console.log(error)
                cbError(error)
            })
    }

    const signout = () => {
        setUserToken(null)
        localStorage.removeItem('user_token')
    }

    return (
        <AuthContext.Provider
            value={{ userToken, signin, signup, signed: !!userToken, signout }}
        >
            {children}
        </AuthContext.Provider>
    )
}
