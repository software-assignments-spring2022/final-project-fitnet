import "./MyProfile.css"
//import profilepic from "./images/blank_profile.jpg"
import Header from "./Header"
import Footer from "./Footer" 
import { useState, useEffect } from 'react'
import axios from "axios"


const MyProfile = () => {

    const uid = 0 

    const [name, setName] = useState("") 
    const [username, setUsername] = useState("") 
    const [bio, setBio] = useState("") 
    const [profile_pic, setProfile_pic] = useState("")

    useEffect(() => { 
        console.log("fetching profile for user " + uid) 
        axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/uid/` + uid) 
        .then(res => { 
            setName(res.data.user.name) 
            setUsername(res.data.user.username) 
            setBio(res.data.user.bio) 
            setProfile_pic(res.data.user.profile_pic) 
            console.log("successful retrieval of user " + uid + " from database")
        })
        .catch(err => { 
            console.error(err) 
            console.log("failed retrieval of user " + uid + " from database")
        })
    }, [])

    // const dummyProfile = (profileName, profileUsername, profileBio) => {
    //     const name = profileName
    //     const username = profileUsername
    //     const bio = profileBio
    //     return {name, username, bio}
    // }

    // const profile1 = dummyProfile("John Smith", "JS10", "I am 20")
    // const profile2 = dummyProfile("Joe Shmo", "JS11", "I am 21")
    // const profile3 = dummyProfile("Daniel Oh", "DO9", "I am 22")

    // const [profiles, setProfiles] = useState({}) 

    // let params = useParams(); 

    // useEffect(() => { 
    //     console.log("retrieving profile " + params.id) 
    //     axios 
    //     .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/w/` + params.id) 
    //     .then(res => { 
    //         setProfiles(res.data.profiles)
    //         console.log("successful retrieval of profile information " + params.id + " from database")
    //     })
    //     .catch(err => { 
    //         console.log("retrieval of profile inoformation " + params.id + " from backend failed") 
    //         console.log(err)
    //     })
    // }, [params.id]) 

    return(
        <main className="MyProfile">
            <Header 
                url = "./MyProfile" 
                title = "My Profile"
            /> 
            <body id = "MyProfile-info" className = "Post-box">
                <img className="UserProfile-pic" src={profile_pic} alt="profile img"/>
                <div className = "UserProfile-title"> 
                    <p id = "myname" >{name}</p>
                    <p><i><a id="myusername" className = "User-link" href = {"/" + username}>{username}</a></i></p>
                </div>
                <p id = "mpbio" >{bio}</p>
                <div className = "blue-button"> 
                    <a className = "User-link" href="/workoutHistory">Workout History</a> 
                </div>
            </body>
            <Footer 
                title = "My Profile" 
            /> 
        </main>
    )
}

export default MyProfile