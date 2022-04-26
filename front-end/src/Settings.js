import "./Settings.css"
import Header from "./Header"
import Footer from "./Footer" 
import React  from "react"
import axios from "axios"
import { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom"
import blankpic from "./images/blank_profile.jpg"

const Settings = () => {

    let changes = 0

    const jwtToken = localStorage.getItem("token") 

    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) 

    const [uid, setUid] = useState("") 
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    
    useEffect(() => { 
        axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/myinfo`, { 
            headers: { Authorization: `JWT ${jwtToken}` }
        })
        .then(res => { 
            setUid(res.data.user._id) 
            setName(res.data.user.name) 
            setUsername(res.data.user.username) 
            setBio(res.data.user.bio) 
            setEmail(res.data.user.email) 
            setPassword(res.data.user.password) 
            setSelectedFile(res.data.user.profile_pic) 
        })
        .catch(err => { 
            console.error(err) 
            console.log("Invalid token") 
            setIsLoggedIn(false) 
        })
    }, [changes])

    const [nameError, setNameError] = useState("") 
    const [usernameError, setUsernameError] = useState("") 
    const [emailError, setEmailError] = useState("") 
    const [passwordError, setPasswordError] = useState("") 
    const [savedMessage, setSavedMessage] = useState("") 

    const handleSubmit = e => {
        e.preventDefault() // prevent the default browser form submission stuff
    
        console.log("uploading changes to settings")

        //code taken from Stack Overflow 
        //https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
        };

        //code taken from Stack Overflow 
        //https://stackoverflow.com/questions/7331289/javascript-function-valid-username
        const validateUsername = (username) => {
            return /^[0-9a-zA-Z_.-]+$/.test(username);
        }

        let valid = true 

        if (name === "") { 
            valid = false; 
            setNameError("Invalid name") 
        } 
        if (username === "" || !validateUsername(username)) { 
            valid = false; 
            setUsernameError("Invalid username") 
        } 
        if (email === "" || !validateEmail(email)) { 
            valid = false; 
            setEmailError("Invalid email") 
        } 
        if (password === "") { 
            valid = false; 
            setPasswordError("Invalid password") 
        } 

        if (valid) { 
            const formData = new FormData();
            formData.append("uid", uid)
            formData.append("name", name);
            formData.append("username", username);
            formData.append("bio", bio);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("image", selectedFile); 
            axios({
                method: "post",
                url: `${process.env.REACT_APP_SERVER_HOSTNAME}/save-changes`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            })
            .catch(err => { 
                console.error(err) 
                console.log("saving changes in settings failed")
            })
            .then((response) => { 
                console.log("saving changes in settings succeeded")
                changes ++
                setNameError("") 
                setUsernameError("") 
                setEmailError("")
                setPasswordError("") 
                setSavedMessage("Your information has been saved!") 
            })
        } 
      }

      const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
      }
      
      const handleDelete = e => {
        
        console.log("attempting to delete" + username + " from the database")

        axios
        .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/delete` , {
            username: username
            })
        .then((res) => {
            console.log("Succesfully removed account from the database.");
            })
        .catch((err) => {
            console.error(err)
            console.log("Unable to remove user from the database.")
            })
        }

    
    if (isLoggedIn) 
        return (
            <main className="Settings">
                <Header 
                    url = "./Settings" 
                    title = "Settings"
                /> 
                <body id = "Settings-info" className="Post-box"> 
                    <div id = "Settings-top"> 
                        <img 
                            id = "settingspic" 
                            src = {selectedFile}
                            alt = "profile pic"
                        /> 
                        <input 
                            type="file" 
                            name="image" 
                            accept="image/*" 
                            multiple={false} 
                            onChange = {e => { 
                                handleFileSelect(e) 
                                setSavedMessage("") 
                            }} 
                        />
                    </div>
                    <form onSubmit = {handleSubmit}>
                        <label for="name">Name </label>
                        <input 
                            type= "text" 
                            name = "name" 
                            value = {name}
                            placeholder = "Name" 
                            onChange = {e => { 
                                setName(e.target.value)
                                setSavedMessage("") 
                            }}
                        />
                        {nameError ? <p className="error">{nameError}</p> : ""}
                        <label for="username">Username </label>
                        <input 
                            type= "text" 
                            name = "username" 
                            value = {username} 
                            placeholder = "Username"
                            onChange = {e => { 
                                setUsername(e.target.value)
                                setSavedMessage("") 
                            }}
                        />
                        {usernameError ? <p className="error">{usernameError}</p> : ""}
                        <label for="email">Email </label>
                        <input 
                            type= "text" 
                            name = "email" 
                            value = {email} 
                            placeholder = "Email" 
                            onChange = {e => { 
                                setEmail(e.target.value)
                                setSavedMessage("") 
                            }}
                        />
                        {emailError ? <p className="error">{emailError}</p> : ""}
                        <label for="password">Password </label>
                        <input 
                            type= "password" 
                            name = "password" 
                            value = {password} 
                            onChange = {e => { 
                                setPassword(e.target.value)
                                setSavedMessage("") 
                            }}
                        />
                        {passwordError ? <p className="error">{passwordError}</p> : ""}
                        <label for="bio">Bio </label>
                        <textarea 
                            id = "settingsbio"
                            maxlength = "432"
                            type= "text" 
                            value = {bio} 
                            placeholder = "Enter a short bio"
                            onChange = {e => { 
                                setBio(e.target.value)
                                setSavedMessage("") 
                            }}
                        />
                        <div className = "submit-button">
                            <button>Save Changes</button>
                        </div>
                    </form>
                </body>
                {savedMessage ? <p className = "saved">{savedMessage}</p> : ""}
                <div className = "bottom-links"> 
                    <div id = "signout-button" className = "blue-button"> 
                        <a className = "User-link" href="/">Sign Out</a> 
                    </div>
                    <div id = "deleteaccount-button" className = "blue-button" onClick={handleDelete}> 
                        <a  className = "User-link" href="/">Delete Account</a> 
                    </div>
                </div>
                <Footer 
                    title = "Settings" 
                /> 
            </main>
        )
    else return <Navigate to="/login?error=protected" /> 
}

export default Settings