import React, { useState } from 'react'
import loginService from '../services/login'

export const Login = ({ setUser, setToken, handleSetMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const storeInLocalStorage = (name, value) => {
        window.localStorage.setItem(name, value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            // * NOTE: acct is badg, badg
            const response = await loginService.login({
                username,
                password,
            })

            setToken(response.token)
            storeInLocalStorage('loggedBlogAppUser', JSON.stringify(response))
            setUser(response)
            setUsername('')
            setPassword('')
            handleSetMessage(`User ${response.name} successfully logged in!`, true)
        } catch (error) {
            console.log(error.response.data)
            handleSetMessage(error.response.data.error, false)
        }
    }
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div className="">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>

                <button id="login-button">Login</button>
            </form>
        </>
    )
}
