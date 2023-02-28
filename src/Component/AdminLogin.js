import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { env } from "../environment";
import axios from "axios";
import { Typography } from "@mui/material";
function AdminLogin() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [but, setBut] = useState(false);
  let navigate = useNavigate();
  const center = {
    textAlign: "center",
  };
  const login = async () => {
    setBut(true);
    let res = await axios.post(`${env.apiurl}/admin/login`, {
      email,
      password,
    });
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user-grade", "admin");
      sessionStorage.setItem("userEmail", res.data.email);
      toast.success("Login Successfull!");
      setBut(false);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } else {
      toast.error(res.data.message);
      setBut(false);
    }
  };
  return (
    <>
      <div className="login-wrapper">
        <Typography style={center} component="div" variant="h4">
          Admin Login
        </Typography>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" disabled={but} onClick={() => login()}>
            Submit
          </Button>
          <Form.Group className="mb-3">
            {/* <Typography variant="h6" style={{ padding: "5px" }}> */}
            Email:
            <span style={{ fontWeight: "bold" }}>
              karthikraja.a.ece@gmail.com
            </span>
            {/* </Typography> */}
            {/* <Typography variant="h6" style={{ padding: "5px" }}> */}
            <div>
              Password:
              <span style={{ fontWeight: "bold" }}>admin</span>
            </div>
            {/* </Typography> */}
          </Form.Group>
        </Form>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default AdminLogin;
