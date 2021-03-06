import './Settings.css';
import Header from './Header';
import Footer from './Footer';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import blankpic from './images/blank_profile.jpg';
import { Link } from 'react-router-dom';

const Settings = () => {
  const jwtToken = localStorage.getItem('token');

  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile_pic, setProfile_pic] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/myinfo`, {
        headers: { Authorization: `JWT ${jwtToken}` },
      })
      .then((res) => {
        setUid(res.data.user._id);
        setName(res.data.user.name);
        setUsername(res.data.user.username);
        setBio(res.data.user.bio);
        setEmail(res.data.user.email);
        setPassword(res.data.user.password);
        if (res.data.user.profile_pic) setProfile_pic(res.data.user.profile_pic);
      })
      .catch((err) => {
        console.error(err);
        console.log('Invalid token');
        setIsLoggedIn(false);
      });
  }, []);

  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the default browser form submission stuff

    console.log('uploading changes to settings');

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
    };

    let valid = true;

    if (name === '') {
      valid = false;
      setNameError('Invalid name');
    }
    if (username === '' || !validateUsername(username)) {
      valid = false;
      setUsernameError('Invalid username');
    }
    if (email === '' || !validateEmail(email)) {
      valid = false;
      setEmailError('Invalid email');
    }
    if (password === '') {
      valid = false;
      setPasswordError('Invalid password');
    }

    if (valid) {
      const formData = new FormData();
      formData.append('uid', uid);
      formData.append('name', name);
      formData.append('username', username);
      formData.append('bio', bio);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', selectedFile); // does the image need a state variable
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER_HOSTNAME}/save-changes`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .catch((err) => {
          console.error(err);
          console.log('saving changes in settings failed');
        })
        .then((response) => {
          console.log('saving changes in settings succeeded');
          setNameError('');
          setUsernameError('');
          setEmailError('');
          setPasswordError('');
          setSavedMessage('Your information has been saved!');
        });
    }
  };

  // do i need this
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSignOut = (e) => {
    console.log(`attemping to log out user ${username}`);
    localStorage.removeItem('token');
    console.log(`user ${username} has been logged out`);
  };

  const handleDelete = (e) => {
    console.log('attempting to delete' + username + ' from the database');
    axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/delete`, {
        username: username,
      })
      .then((res) => {
        console.log('Succesfully removed account from the database.');
      })
      .catch((err) => {
        console.error(err);
        console.log('Unable to remove user from the database.');
      });
  };

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
      <main className="Settings">
        <Header url="./Settings" title="Settings" />
        <body id="Settings-info" className="Post-box">
          <div id="Settings-top">
            <img
              id="settingspic"
              src={
                profile_pic
                  ? `data:image/png;base64,${arrayBufferToBase64(profile_pic.data.data)}`
                  : blankpic
              }
              alt="me!"
            />
            {/* added to this */}
            <input
              type="file"
              name="image"
              accept="image/*"
              multiple={false}
              onChange={(e) => {
                handleFileSelect(e);
                setSavedMessage('');
              }}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name </label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
                setSavedMessage('');
              }}
            />
            {nameError ? <p className="error">{nameError}</p> : ''}
            <label htmlFor="username">Username </label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
                setSavedMessage('');
              }}
            />
            {usernameError ? <p className="error">{usernameError}</p> : ''}
            <label htmlFor="email">Email </label>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setSavedMessage('');
              }}
            />
            {emailError ? <p className="error">{emailError}</p> : ''}
            <label htmlFor="password">Password </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setSavedMessage('');
              }}
            />
            {passwordError ? <p className="error">{passwordError}</p> : ''}
            <label htmlFor="bio">Bio </label>
            <textarea
              id="settingsbio"
              maxLength="432"
              type="text"
              value={bio}
              placeholder="Enter a short bio"
              onChange={(e) => {
                setBio(e.target.value);
                setSavedMessage('');
              }}
            />
            <div className="submit-button">
              <button>Save Changes</button>
            </div>
          </form>
        </body>
        {savedMessage ? <p className="saved">{savedMessage}</p> : ''}
        <div className="bottom-links">
          <div id="signout-button" className="blue-button" onClick={handleSignOut}>
            <Link className="User-link" to="/">
              Sign Out
            </Link>
          </div>
          <div id="deleteaccount-button" className="blue-button" onClick={handleDelete}>
            <Link className="User-link" to="/">
              Delete Account
            </Link>
          </div>
        </div>
        <Footer title="Settings" />
      </main>
    );
  else return <Navigate to="/login?error=protected" />;
};

export default Settings;
