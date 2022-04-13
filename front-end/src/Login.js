import "./Login.css"
import Header from "./Header"
import { useState } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'


function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [submitted, setSubmitted] = useState(false)
    const [fieldsFilled, setFieldsFilled] = useState(false)

    const changeUsername = (e) => { 
        setUsername(e.target.value); 
    }

    const changePassword = (e) => { 
        setPassword(e.target.value); 
    }

    const handleSubmit = () => {
        if (username === '' || password === '') {
            setFieldsFilled(false)
        } else {
            setFieldsFilled(true)
            setSubmitted(true)
        }
    }

    function handleClick () { 
        window.location.replace('Feed')
    }

    return (
        <main className = "Login">
            <Header 
                url = "./Login" 
                title = "Login"
            />
            <a id = "back-link" className = "User-link" href = "./"><AiOutlineLeft size = {'28px'} /></a>
            <body id="Login-info" className = "Post-box">
                <h1>Log in to FitNet</h1>
                <h2>Don't have an account? Register <a className = "User-link" href="/SignUp"> here</a>.</h2>
                <form id="Login-form">
                    <label>Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Username" 
                        onChange = {changeUsername}
                    />
                    <label>Password</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Password" 
                        onChange = {changePassword}
                    />
                    <h4><a className = "User-link" href ="/ForgotPassword">Forgot your password?</a></h4>
                </form>
                <div className = "submit-button" >
                    <button onClick = {handleClick}>Login</button>
                </div> 
            </body>
        </main>
    )
}

export default Login