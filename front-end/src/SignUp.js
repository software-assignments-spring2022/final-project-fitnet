import "./SignUp.css"
import Header from "./Header"
import { useState } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { BsWindowSidebar } from "react-icons/bs"

function SignUp() {


    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [submitted, setSubmitted] = useState(false)
    const [fieldsFilled, setFieldsFilled] = useState(false)

    const changefirstName = (e) => {
        setfirstName(e.target.value)
    }

    const changelastName = (e) => {
        setlastName(e.target.value)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changeUsername = (e) => { 
        setUsername(e.target.value); 
    }

    const changePassword = (e) => { 
        setPassword(e.target.value); 
    }

    const handleSubmit = () => {
        if (firstName === '' || lastName === '' || email === '' || username === '' || password === '') {
            setFieldsFilled(false)
        } else {
            setFieldsFilled(true)
            setSubmitted(true)
        }
    }

    function handleClick () { 
        window.location.replace('LogIn')
    }

    return (
        <main className="SignUp">
            <Header 
                url = "./SignUp" 
                title = "Sign Up"
            /> 
            <a id = "back-link" className = "User-link" href = "./"><AiOutlineLeft size = {'28px'} /></a>
            <body id="SignUp-info" className = "Post-box">
                <h1>Sign up for FitNet!</h1>
                <h2>Already have an account? Log in <a href = "/LogIn" className = "User-link"> here.</a></h2>
                <form onSubmit = {handleSubmit}>
                    <label>First Name</label>
                    <input 
                        onChange={changefirstName} 
                        //value={firstName} 
                        type="text" 
                        className="form-control" 
                        placeholder="First Name" 
                    />
                    <label>Last Name</label>
                    <input 
                        onChange={changelastName} 
                        type="text" 
                        className="form-control" 
                        placeholder="Last Name" 
                    />
                    <label>Email</label>
                    <input 
                        onChange={changeEmail} 
                        type="text" 
                        className="form-control" 
                        placeholder="Email" 
                    />
                    <label>Username</label>
                    <input 
                        onChange={changeUsername} 
                        type="text" 
                        className="form-control" 
                        placeholder="Username" 
                    />
                    <label>Password</label>
                    <input 
                        onChange={changePassword} 
                        type="text" 
                        className="form-control" 
                        placeholder="Password" 
                    />
                </form>
                <div className = "submit-button">
                        <button onClick = {handleClick}>Submit</button>
                    </div>
            </body>
        </main>
    )
}

export default SignUp