import './MyProfile.css';
import blankpic from './images/blank_profile.jpg';
import Header from './Header';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const jwtToken = localStorage.getItem('token');
  //console.log(`JWT token: ${jwtToken}`)

  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profile_pic, setProfile_pic] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/myinfo`, {
        headers: { Authorization: `JWT ${jwtToken}` },
      })
      .then((res) => {
        setName(res.data.user.name);
        setUsername(res.data.user.username);
        setBio(res.data.user.bio);
        setProfile_pic(res.data.user.profile_pic);
      })
      .catch((err) => {
        console.error(err);
        console.log('Invalid token');
        setIsLoggedIn(false);
      });
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  if (isLoggedIn)
    return (
      <main className="MyProfile">
        <Header url="./MyProfile" title="My Profile" />
        <body id="MyProfile-info" className="Post-box">
          <img
            className="UserProfile-pic"
            src={
              profile_pic
                ? `data:image/png;base64,${arrayBufferToBase64(profile_pic.data.data)}`
                : blankpic
            }
            alt="profile img"
          />
          <div className="UserProfile-title">
            <p id="myname">{name}</p>
            <p>
              <i>
                <Link id="myusername" className="User-link" to={'/' + username}>
                  {username}
                </Link>
              </i>
            </p>
          </div>
          <p id="mpbio">{bio}</p>
          <div className="blue-button">
            <Link className="User-link" to="/workoutHistory">
              Workout History
            </Link>
          </div>
        </body>
        <Footer title="My Profile" />
      </main>
    );
  else return <Navigate to="/login?error=protected" />;
};

export default MyProfile;
