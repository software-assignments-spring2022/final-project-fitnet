import "./UserProfile.css"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { AiOutlineLeft } from 'react-icons/ai'
import { useEffect, useState } from 'react' 
import axios from "axios"

const UserProfile = () => { 

    const [user, setUser] = useState({}) 
    
    let params = useParams(); 

    useEffect (() => { 
        console.log("fetching data for user " + params.username) 
        axios 
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/` + params.username)
        .then (res => { 
            setUser(res.data.user)
            console.log("successful retrieval of user " + params.username + " from database")
        })
        .catch (err => { 
            console.error(err) 
            console.log("failed retrieval of user " + params.username + " from database")
        })
    }, [params.username])

    if (typeof user == 'undefined') 
        return (
            <main className = "UserProfile">
                 <Header 
                    url = "./Feed" 
                    title = "Feed" 
                /> 
                <body className = "Post-box"> 
                    <h3> Sorry, no such user exists. </h3>
                    <h3>Return to <Link className = "User-link" to = "/Feed">Feed</Link>? </h3>
                </body>
                <Footer/> 
            </main>
        )
    return ( 
        <main className = "UserProfile"> 
            <Header 
                url = "./Feed" 
                title = "Feed" 
            />
            <a id = "back-link" className = "User-link" href = "./Feed"><AiOutlineLeft size = {'28px'} /></a>
            <body id = "UserProfile-info" className = "Post-box">
                <img className = "UserProfile-pic" src = {user.profile_pic} alt = "me!" /> 
                <div className = "UserProfile-title">
                    <p id = "name">{user.name}</p>
                    <p><i><a id = "username" className = "User-link" href = {"/" + user.username}>{user.username}</a></i></p>
                </div>
                <p id = "upbio">{user.bio}</p>
            </body> 
            <Footer/> 
        </main>
        )

}

export default UserProfile