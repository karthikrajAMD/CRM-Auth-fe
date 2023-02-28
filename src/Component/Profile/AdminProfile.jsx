import React, { useConpassword, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { env } from "../../environment";
import EditIcon from "@mui/icons-material/Edit";
import { Context } from "../../Context";
import axios from "axios";
import LoadingPage from "../../Loading/LoadingPage";
import SidebarDashboard from "../../Bars/SidebarDashboard";
function AdminProfile() {
  const [sideShow, setSideShow] = useContext(Context);
  const [user, setUser] = useState();
  const [password, setPass] = useState();
  const [cPass, setCpass] = useState();
  const [show0, setShow0] = useState(false);
  const [show1, setShow1] = useState(false);
  const [image, setImageUrl] = useState();
  const handleClose = () => {
    setShow0(false);
    // setEmailN(mail);
  };
  const handleShow = () => {
    setShow0(true);
  };
  const handleClose1 = () => {
    setShow1(false);
    // setEmailN(mail);
  };
  const handleShow1 = () => {
    setShow1(true);
  };
  let navigate = useNavigate();

  let loadData = async () => {
    let token = sessionStorage.getItem("token");
    let email = sessionStorage.getItem("userEmail");
    if (token) {
      console.log(email);
      let res = await axios.get(`${env.apiurl}/admin/all-users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      let findUser = await axios.post(`${env.apiurl}/admin/get_user`, {
        email,
      });
      console.log(res.data);
      console.log(findUser.data);
      if (res.data.statusCode === 200 && findUser.data.statusCode === 200) {
        console.log(findUser.data.userExist);
        setUser(findUser.data.userExist);
        console.log(user);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } else {
      toast.error("No Token Found!");
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
  };
  const changePassword = async () => {
    if (password === cPass) {
      let changePass = await axios.put(
        `${env.apiurl}/admin/updatePassword/${user._id}`,
        {
          password,
        }
      );
      console.log(changePass);
      if (changePass.data.statusCode === 200) {
        toast.success(changePass.data.message);
        handleClose();
      } else {
        toast.error(changePass.data.message);
      }
    } else {
      toast.error("Password Mismatch");
    }
  };
  const changeImage = async () => {
    if (image !== null) {
      let changeImage = await axios.put(
        `${env.apiurl}/admin/changeProfile/${user._id}`,
        {
          image,
        }
      );
      console.log(changeImage);
      if (changeImage.data.statusCode === 200) {
        toast.success(changeImage.data.message);
        handleClose1();
        loadData();
      } else {
        toast.error(changeImage.data.message);
      }
    } else {
      toast.error("Enter Url");
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <main className={sideShow ? "space-toggle" : null}>
      <SidebarDashboard role={"manager"} />
      <Modal show={show0} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your database</Modal.Title>
        </Modal.Header>
        <Form className="dashboardPopupForm">
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={cPass}
              onChange={(e) => setCpass(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              changePassword();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ............................................................
       */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Image</Modal.Title>
        </Modal.Header>
        <Form className="dashboardPopupForm">
          <Form.Group className="mb-3">
            <Form.Label>Enter Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter URL"
              value={image}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              changeImage();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        {user ? (
          <div className="container">
            <div className="pt-3">
              <Button className="mt-2 profile-edit" onClick={handleShow1}>
                <EditIcon />
              </Button>
              <img src={user.profile} className="profile-image" />
            </div>

            <div>
              <h1 className="mt-3">
                Name:
                {user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1)}
                {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
              </h1>
              <h1>User Name: {user.email}</h1>
              <div>
                <Button onClick={handleShow}>Change password</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="page-loading">
            <LoadingPage />
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminProfile;
