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
  let navigate = useNavigate();
  const center = {
    textAlign: "center",
  };
  const login = async () => {
    let res = await axios.post(`${env.apiurl}/admin/login`, {
      email,
      password,
    });
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("token", res.data.token);

      toast.success("Login Successfull!");

      setTimeout(() => {
        navigate("/admin");
      }, 3000);
    } else {
      toast.error(res.data.message);
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
          <Button variant="primary" onClick={() => login()}>
            Submit
          </Button>
          <Form.Group className="mb-3">
            <Typography variant="h5">
              Email:karthikraja.a.ece@gmail.com
            </Typography>
            <Typography variant="h5">Password:admin</Typography>
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
