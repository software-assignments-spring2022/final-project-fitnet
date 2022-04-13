import "./NewPost.css"
import Header from "./Header"
import Footer from "./Footer" 
import { useState, useEffect } from 'react'
import axios from 'axios' 

const NewPost = () => {

    const uid = 0 

    const [username, setUsername] = useState("")
    const [postMessage, setPostMessage] = useState("") 

    useEffect(() => { 
        console.log("fetching data for user " + uid) 
        axios 
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/uid/` + uid)
        .then (res => { 
            setUsername(res.data.user.username) 
            console.log("successful retrieval of user " + uid + " from database")
        })
        .catch (err => { 
            console.error(err) 
            console.log("failed retrieval of user " + uid + " from database")
        })
    }, []) 


    const [description, setDesc] = useState('') 
    const [picture, setPicture] = useState({})

    const uploadPicture = e => { 
        setPicture ({ 
            picturePreview: URL.createObjectURL(e.target.files[0]), 
            pictureAsFile: e.target.files[0] 
        })
    } 

    const handleSubmit = e => { 
        e.preventDefault() 
        console.log("uploading new post")
        const formData = new FormData() 
        formData.append("username", username)
        formData.append("description", description) 
        formData.append("image", picture.pictureAsFile) 
        axios
        .post (`${process.env.REACT_APP_SERVER_HOSTNAME}/new-post`, 
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