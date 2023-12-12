import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useAdminLoginMutation } from "../slices/adminApiSlice";
import { setAdminCredentials } from "../slices/adminAuthSlice";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function AdminLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const {adminInfo} = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate("");

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin/dashboard");
    }
  }, [adminInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin({ email, password }).unwrap();
      dispatch(setAdminCredentials({ ...res }));
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader />}
        <div className="d-grid gap-2">
          <Button type="submit" variant="primary" className="mt-3">
            Sign In
          </Button>
        </div>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register</Link>{" "}
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default AdminLoginScreen;
