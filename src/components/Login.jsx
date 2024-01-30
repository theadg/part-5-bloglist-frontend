import React, { useState } from 'react'
import loginService from '../services/login'

export const Login = ({ setUser }) => {
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

            storeInLocalStorage('loggedBlogAppUser', JSON.stringify(response))
            setUser(response)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div className="">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>

                <button>Login</button>
            </form>
        </>
    )
}