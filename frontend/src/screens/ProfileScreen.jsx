import React, { useEffect, useRef, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { Tooltip } from "react-tooltip";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.setName, userInfo.setEmail]);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Email and name can't be empty");
    } else if (showPasswordFields && !password) {
      toast.error("Please enter new password ");
    } else if (showPasswordFields && !confirmPassword ) {
      toast.error("Please fill confirm password field");
    }else if(showPasswordFields && confirmPassword.length<8){
      toast.error("Password must be 8 charectors");

    } 
    else if (password !== confirmPassword) {
      toast.error("Password do no match");
    } 
    else {
      try {
        const formData = new FormData();
        formData.append("_id", userInfo._id);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("file", file);
        const res = await updateProfile(formData).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated");
        setShowPasswordFields(false);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler}>
        <div
          data-tooltip-id="my-tooltip"
          data-tooltip-content="click to change profile image!"
          className="d-flex justify-content-center align-items-center my-3 p-3"
          style={{ cursor: "pointer" }}
        >
          <Image
            src={
              selectedImage
                ? selectedImage
                : userInfo.avatar.includes("http")
                ? userInfo.avatar
                : import.meta.env.VITE_STATIC_SERVER + userInfo.avatar
            }
            roundedCircle
            alt="avatarrrr"
            className="w-25"
            onClick={() => inputRef.current.click()}
          />
          <Tooltip id="my-tooltip" />
        </div>
        <Form.Group className="my-2" controlId="image">
          <Form.Control
            type="file"
            onChange={(e) => handleImageChange(e)}
            hidden
            ref={inputRef}
            accept="image/*"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          className="btn btn-sm btn-secondary my-3"
          onClick={() => setShowPasswordFields((prev) => !prev)}
        >
          {showPasswordFields ? "cancel" : "Change Password?"}
        </Button>
        {showPasswordFields && (
          <>
            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </>
        )}
        {isLoading && <Loader />}
        <br />
        <Button type="submit" variant="primary" className="mt-3">
          update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
