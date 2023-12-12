import React from "react";
import { Button } from "react-bootstrap";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Oauth = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res=await axios.post('api/users/google',{
        name:result.user.displayName,email:result.user.email,avatar:result.user.photoURL
      })
      dispatch(setCredentials({...res.data}))
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-grid gap-2">
      <Button
        onClick={handleGoogleLogin}
        type="button"
        variant="danger"
        className="mt-3"
      >
        continue with google
      </Button>
    </div>
  );
};

export default Oauth;
