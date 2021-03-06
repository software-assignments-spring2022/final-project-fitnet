import "./NewPost.css"
import Header from "./Header"
import Footer from "./Footer" 
import { useState, useEffect } from 'react'
import axios from 'axios' 

const NewPost = () => {

    const jwtToken = localStorage.getItem("token") 

    const [user, setUser] = useState('')
    const [postMessage, setPostMessage] = useState("")

    useEffect(() => { 
        console.log("fetching data for user " + 
        jwtToken) 
        axios 
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/myinfo`, { 
            headers: { Authorization: `JWT ${jwtToken}` }
        })
        .then (res => { 
            setUser(res.data.user._id) 
            console.log("successful retrieval of user " + 
            res.data.user.username + " from database")
        })
        .catch (err => { 
            console.error(err) 
            console.log("failed retrieval of user " + 
            jwtToken + " from database")
        })
    }, [jwtToken]) 


    const [description, setDesc] = useState('') 
    const [picture, setPicture] = useState(null)

    const uploadPicture = e => { 
        setPicture(e.target.files[0])
    } 

    const handleSubmit = e => { 
        e.preventDefault() 
        console.log("uploading new post")
        const formData = new FormData() 
        formData.append("user", user)
        formData.append("description", description) 
        formData.append("image", picture) 
        axios
        .post (`${process.env.REACT_APP_SERVER_HOSTNAME}/newPost`, 
            formData
        )
        .catch(err => { 
            console.log("uploading new post failed") 
            console.error(err) 
        })
        .then((response) => { 
            console.log("uploading new post succeeded") 
        }) 
        setPostMessage("Your post has been uploaded!") 
    }

    return(
        <main className="NewPost">
            <Header 
                url = "./NewPost" 
                title = "Create a new post"
            /> 
            <body id = "NewPost-info" className = "Post-box">
                <form id = "newPostForm" onSubmit = {handleSubmit}> 
                    <input 
                        id = "newPostPic"
                        type="file" 
                        name="image" 
                        accept="image/*" 
                        multiple={false} 
                        onChange = {e => { 
                            uploadPicture(e) 
                            setPostMessage("") 
                        }} 
                    />
                    <textarea id = "newpost-description"
                        name = "description"
                        type = "text"
                        value = {description} 
                        placeholder = "write a description..."
                        maxLength = "258"
                        onChange = {e => { 
                            setDesc(e.target.value)
                            setPostMessage("") 
                        }}
                    />
                    <div className = "blue-button">
                        <button id = "post-button" >Post</button>
                    </div>
                </form>
            </body>
            {postMessage ? <p className = "saved">{postMessage}</p> : postMessage}
            <Footer 
                title = "Create a new post" 
            />
        </main>
    )
}

export default NewPost