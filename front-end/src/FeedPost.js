import "./FeedPost.css" 
import { useState, useEffect } from 'react' 
import axios from 'axios' 

const FeedPost = props => {   

    const [user, setUser] = useState({}) 

    useEffect (() => { 
        console.log("fetching data for user " + props.username) 
        axios 
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/` + props.username)
        .then (res => { 
            setUser(res.data.user)
            console.log("successful retrieval of user " + props.username + " from database")
        })
        .catch (err => { 
            console.error(err) 
            console.log("failed retrieval of user " + props.username + " from database")
        })
    }, [props.username])

    function handleClick () {
        window.location.replace(user.username)
    }

    if (typeof user == 'undefined') 
        return (<main></main>)

    return ( 
        <main id = "FeedPost" className = "Post-box">
            <img className = "Post-image" src = {props.picture} alt = "Post" />
            <section className = "Profile-info">
                    <img className = "Profile-image" src = {user.profile_pic} alt = "Profile" /> 
                    <div className = "Profile-hover">
                        <div className = "Profile-link">
                            <b><a className = "User-link" href = {"/" + props.username} >{props.username}</a></b> 
                        </div> 
                        <div className = "Profile-card" onClick = {handleClick}> 
                            <div className = "card-top"> 
                                <img src = {user.profile_pic} alt = "profile" /> 
                                <div className = "card-names">
                                <b><p><a className = "User-link" href = {"/" + props.username}>{user.username}</a></p></b>
                                <p>{user.name}</p> 
                            </div> 
                        </div>
                        <p id = "bio">{user.bio}</p>
                    </div>
                </div>
            </section>
            <p>{props.description}</p>
        </main>
    )

}

export default FeedPost