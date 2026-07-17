import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
    const [login, setLogin] = useState(true)

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">
                    Snip<span className="text-indigo-400">Link</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    {login ? 'Log in to manage your links' : 'Create an account to get started'}
                </p>
            </div>
            {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
        </div>
    )
}

export default AuthPage