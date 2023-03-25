import './login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import BASE_URL from '../../helper'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [response, setResponse] = useState([])

    async function loginUser(event) {
        event.preventDefault()
        if (email.trim() === '') {
            alert('Email is Required')
            return;
        }
        if(!/\S+@\S+\.\S+/.test(email)) {
            alert('Email is Invalid');
            return;
        }
        if(password.trim() === '') {
            alert('Password is required')
            return;
        }
        const resp = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await resp.json()

        if(data.token) {
            localStorage.setItem("token", data.token)
            window.location.href = '/notes'
        } else {
            setResponse([{ type: 'error', message: data.message }])
        }
    }
    return (
        <div className='login-page'>
            <div className='form'>
                <form onSubmit={loginUser}>
                    <input 
                    type="text" 
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                    type="password" 
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'><Link to="/notes"> Login</Link></button>
                    <p className='message'>
                        Not registered? {" "} <Link to='/register' style={{color: "Blue" }}>
                            Create an Account
                        </Link>
                    </p>
                </form>
                {response.map((r, i) => (
                    <div key={i} className={`response ${r.type}`}>
                        {r.message}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Login;