import "./Login.css"
import Header from "./Header"
import { useState, useEffect } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import axios from "axios"
import { Navigate, useSearchParams } from "react-router-dom"

function Login() {

    let [urlSearchParams] = useSearchParams() 

    const [response, setResponse] = useState({}) 
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => { 
        const qsError = urlSearchParams.get("error") 
        if (qsError === "protected")
            setErrorMessage("Please log in first.")
    }, [])

    useEffect(() => { 
        if (response.success && response.token) {
            console.log(`User successfully logged in: ${response.id}`)
            localStorage.setItem("token", response.token) // store the token into localStorage
          }
    }, [response])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [usernameError, setUsernameError] = useState('') 
    const [passwordError, setPasswordError] = useState('') 

    const changeUsername = (e) => { 
        setUsername(e.target.value); 
    }

    const changePassword = (e) => { 
        setPassword(e.target.value); 
    }

    const handleSubmit = e => {

        e.preventDefault()
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password); 
        axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/loginVerify`, 
        { 
            username: username, 
            password: password, 
        })
        .then(res => {
            console.log("user " + username + " has been logged in") 
            setResponse(res.data) 
        })
        .catch(err => { 
            console.error(err);
            console.log("Log In Failed");
            if (err.response?.status === 401) 
                setUsernameError("Username does not exist") 
            if (err.response?.status === 402) 
                setPasswordError("Wrong password") 
        })
    }

    if (!response.success) 
        return (
            <main className = "Login">
                <Header 
                    url = "./Login" 
                    title = "Login"
                />
                {errorMessage ? <p className="error">{errorMessage}</p> : ""}
                <a id = "back-link" className = "User-link" href = "./"><AiOutlineLeft size = {'28px'} /></a>
                <body id="Login-info" className = "Post-box">
                    <h1>Log in to FitNet</h1>
                    <h2>Don't have an account? Register <a className = "User-link" href="/SignUp"> here</a>.</h2>
                    <form onSubmit = {handleSubmit} id="Login-form">
                        <label>Username</label>
                        <input 
                            name = "username" 
                            type="text" 
                            value = {username} 
                            className="form-control" 
                            placeholder="Username" 
                            onChange = {e => { 
                                changeUsername(e) 
                                setUsernameError('') 
                            }}
                        />
                        {usernameError ? <p className = "error">{usernameError}</p> : ""}
                        <label>Password</label>
                        <input 
                            name = "password" 
                            type="password" 
                            value = {password} 
                            className="form-control" 
                            placeholder="Password" 
                            onChange = {e => { 
                                changePassword(e) 
                                setPasswordError('') 
                            }}
                        />
                        {passwordError ? <p className = "error">{passwordError}</p> : ""}
                        <div className = "submit-button" >
                            <button>Login</button>
                        </div> 
                    </form>
                </body>
            </main>
        )
    else return <Navigate to="/feed" />
}

export default Login