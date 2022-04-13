import "./Feed.css"
import FeedPost from "./FeedPost" 
import Header from "./Header"
import Footer from "./Footer"
import { useEffect, useState } from 'react' 
import axios from "axios"

const Feed = () => { 

    const[posts, setPosts] = useState([])

    useEffect(() => { 
        console.log("retrieving posts from backend") 
        axios 
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts`)
            .then(res => { 
                setPosts(res.data.posts) 
                console.log("successful retrieval of posts from database")
            })
            .catch(err => { 
                console.log("retrieval of posts from backend failed") 
                console.log(err)
            })
    }, [])

    return ( 
        <main id = "Feed">
            <Header
                url = "./Feed" 
                title = "Feed"
            />  
            <body className = "Feed-posts">
                    {posts.slice(0).reverse().map((post) => ( 
                        <FeedPost 
                            username = {post?.username} 
                            picture = {post?.picture} 
                            description = {post?.description}
                        /> 
                        )) 
                    }    
            </body>
            <Footer 
                title = "Feed" 
            /> 
        </main>
    )
}

export default Feed