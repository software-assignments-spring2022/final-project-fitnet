import "./NewPost.css"
import Header from "./Header"
import Footer from "./Footer" 
import { useState } from 'react'
import axios from 'axios' 

const NewPost = () => {

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
        const formData = new FormData() 
        formData.append("username", "lpadilla0")
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
                        onChange = {uploadPicture} 
                    />
                    <textarea id = "newpost-description"
                        name = "description"
                        type = "text"
                        value = {description} 
                        placeholder = "write a description..."
                        maxLength = "258"
                        onChange = {e => setDesc(e.target.value)}
                    />
                    <div className = "blue-button">
                        <button id = "post-button" >Post</button>
                    </div>
                </form>
            </body>
            <Footer 
                title = "Create a new post" 
            />
        </main>
    )
}

export default NewPost