import "./WorkoutPost.css" 
import { HiOutlineMusicNote } from 'react-icons/hi' 

const WorkoutPost = props => {   

    console.log(props.playlist)

    return ( 
        <main id = "WorkoutPost" className = "Post-box">
            <div className="Workout-header">    
                <b><a href = {"/w/" + props.id} className = "User-link">{props.name}</a></b>
                {props.playlist ? <a className = "User-link" href = {props.playlist}><HiOutlineMusicNote size = "35px"/> </a> : ""} 
            </div>
            
            <p>{props.description}</p>
        </main>
    )

}

export default WorkoutPost