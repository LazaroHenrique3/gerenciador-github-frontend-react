import { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

import { api, createSession } from "../Services/api";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    //Como esses states estão sendos passados para o context, as atualizações daqui refletirão em toda a aplicação
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //Vendo se o usaurio já está logado para já preparar o context
    useEffect(() => {
        const user = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if(user && token) {
            setUser(JSON.parse(user))
            api.defaults.headers.Authorization = `Bearer ${token}`
        }

        setLoading(false)
    }, [])

    const login = async (email, password) => {
        const response = await createSession(email, password)
        //Armazenando no LocalStorage
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)

        //Setando o token de autenticação
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`

        setUser(response.data.user)
        navigate('/home')
    }

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')

        api.defaults.headers.Authorization = null
        setUser(null)
        navigate('/')
    }

    return(
        <AuthContext.Provider value={{authenticated: !!user, user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}



