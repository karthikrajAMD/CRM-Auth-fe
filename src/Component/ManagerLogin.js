import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { env } from "../environment";
import axios from "axios";
import { Typography } from "@mui/material";
import Link from "@mui/material";
function ManagerLogin() {
  let [email, setEmail] = useState("");
  let [mShow, setMShow] = useState(false);
  let [password, setPassword] = useState("");
  // .............................signup variable..............................
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  // let [mEmail, setMEmail] = useState("");
  // let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();
  const login = async () => {
    let res = await axios.post(`${env.apiurl}/manager/login`, {
      email,
      password,
    });
    console.log(res.data);
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("token", res.data.token);

      toast.success("Login Successfull!");

      setTimeout(() => {
        navigate("/manager");
      }, 3000);
    } else {
      toast.error(res.data.message);
    }
  };
  const signup = async () => {
    let res = await axios.post(`${env.apiurl}/manager/signup`, {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("token", res.data.token);

      toast.success("Signup Successfull!");

      setTimeout(() => {
        setMShow(false);
      }, 3000);
    } else if (res.data.statusCode === 404) {
      toast.error(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };
  return (
    <>
      {/* <Typography className="login-wrapper" component="div"> */}

      {mShow ? (
        <div>
          <Button
            onClick={() => {
              setMShow(false);
            }}
          >
            Signin
          </Button>
          <div className="login-wrapper">
            <Typography
              style={{ textAlign: "center" }}
              component="div"
              variant="h4"
            >
              Manager Signup
            </Typography>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
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
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="ReEnter your Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={() => signup()}>
                Submit
              </Button>
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
        </div>
      ) : (
        <div className="login-wrapper">
          <Typography
            style={{ textAlign: "center" }}
            component="div"
            variant="h4"
          >
            Manager Login
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
            <Typography>
              <div>
                <h6>
                  If you are new{" "}
                  <a
                    className="general-signup"
                    onClick={() => {
                      setMShow(true);
                    }}
                  >
                    {" "}
                    Signup
                  </a>{" "}
                  Here
                </h6>
              </div>
            </Typography>
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
      )}
      {/* </Typography> */}
    </>
  );
}
export default ManagerLogin;
