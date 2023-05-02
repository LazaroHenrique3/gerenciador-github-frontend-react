import React, { useState, useContext } from 'react'

import { AuthContext } from '../../context/auth'

import "./styles.css"

const LoginPage = () => {
    //Pegando informações do Context
    const {login} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        if(!email.trim() || !password.trim()){
            alert("Email e senha precisa ser preenchido!")
            return
        }

        login(email, password)
    }

    return (
        <div id="login">
            <h1 className="title">Login</h1>
            <div className="form">
                <div className="field">
                    <label htmlFor="email">Email:</label>
                    <input placeholder='teste@gmail.com' value={email} type="email" name="email" id="email" onChange={(evt) => setEmail(evt.target.value)}/>
                </div>

                <div className="field">
                    <label htmlFor="password">Senha:</label>
                    <input placeholder='secret' value={password} type="password" name="password" id="password" onChange={(evt) => setPassword(evt.target.value)}/>
                </div>

                <div className="actions">
                    <button onClick={handleLogin}>Entrar</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage