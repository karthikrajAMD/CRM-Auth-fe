import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { env } from "../../environment";
import axios from "axios";
import Table from "react-bootstrap/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddIcon from "@mui/icons-material/Add";
import { Context } from "../../Context";
import LoadingPage from "../../Loading/LoadingPage";
import SidebarDashboard from "../../Bars/SidebarDashboard";
function ManagerDashboard() {
  let [data, setData] = useState();
  const [sideShow, setSideShow] = useContext(Context);
  const [show0, setShow0] = useState(false);
  const [show1, setShow1] = useState(false);
  let navigate = useNavigate();
  const handleClose = () => {
    setShow0(false);
  };
  const handleShow = () => {
    setShow0(true);
  };
  const handleClose1 = () => {
    setShow1(false);
  };
  const handleShow1 = () => {
    setShow1(true);
  };
  let name = "Dashboard";

  let [id, setId] = useState(0);
  let [firstN, setFirstN] = useState("");
  let [lastN, setLastN] = useState("");
  let [roleN, setRole] = useState("");
  let [emailN, setEmailN] = useState("");
  let [mainRole, setMainRole] = useState("");
  let [newFirstName, setNewFirstName] = useState("");
  let [newLastName, setNewLastName] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [newCPassword, setNewCPassword] = useState("");
  let [newEmail, setNewEmail] = useState("");
  async function setting({ e }) {
    await setId(e._id);
    await setEmailN(e.email);
    await setRole(e.role);
    await setFirstN(e.firstName);
    await setLastN(e.lastName);
    await setMainRole(e.role);
  }
  async function employeeEdit(email) {
    let employeeUpdate = await axios.put(`${env.apiurl}/admin/update/${id}`, {
      firstName: firstN,
      lastName: lastN,
      role: roleN,
      email: emailN,
    });

    handleClose();
    loadData();
  }
  async function adminAddUser() {
    let adminAddUser = await axios.post(`${env.apiurl}/users/signup/`, {
      firstName: newFirstName,
      lastName: newLastName,
      password: newPassword,
      confirmPassword: newCPassword,
      email: newEmail,
    });
    if (adminAddUser.data.statusCode === 200) {
      toast.success("user Created Successfully");
    } else toast.error(adminAddUser.data.message);

    handleClose1();
    loadData();
  }
  async function deleteUsers(e) {
    console.log(e);
    let deleteUser = await axios.delete(
      `${env.apiurl}/admin/deleteUsers/${e._id}`
    );
    if (deleteUser.data.statusCode === 200) {
      toast.success(deleteUser.data.message);
      loadData();
    }
  }
  let loadData = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let res = await axios.get(`${env.apiurl}/manager/all-users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.data.statusCode === 200) {
        toast.success(res.data.message);
        setData(res.data.users);
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
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      {/* <main className={sideShow ? "space-toggle" : null}>
     <SidebarDashboard name={name} role={"manager"} /> */}
      {/* ........................................dashboard content........................................................................ */}
      <div className="dash-cont">
        <Modal show={show0} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update your database</Modal.Title>
          </Modal.Header>
          <Form className="dashboardPopupForm">
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={firstN}
                onChange={(e) => setFirstN(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={lastN}
                onChange={(e) => setLastN(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Role"
                disabled="disabled"
                value={roleN}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={emailN}
                onChange={(e) => setEmailN(e.target.value)}
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
                employeeEdit(id);
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Adding user Modal ............................................................. */}
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Employee</Modal.Title>
          </Modal.Header>
          <Form className="dashboardPopupForm">
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                onChange={(e) => setNewFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={(e) => setNewLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="ReEnter the Password"
                onChange={(e) => setNewCPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setNewEmail(e.target.value)}
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
                adminAddUser();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ....................................employee data................. */}
        <div className="dashboard-main">
          <div className="addUser-button">
            <Button variant="primary">
              <div onClick={handleShow1}>
                <AddIcon />
                Add Employee
              </div>
            </Button>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th
                  style={{ textAlign: "center", fontSize: "25px" }}
                  colSpan="6"
                >
                  Employee
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>S.No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{e.firstName}</td>
                      <td>{e.lastName}</td>
                      <td>{e.email}</td>
                      <td>{e.role}</td>
                      <td>
                        <Button
                          variant="error"
                          onClick={() => {
                            setting({ e });
                          }}
                        >
                          <EditIcon
                            sx={{ color: "blue" }}
                            onClick={handleShow}
                          />
                        </Button>
                        <Button variant="error">
                          <DeleteIcon
                            fontSize="small"
                            sx={{ color: "red" }}
                            onClick={() => {
                              deleteUsers(e);
                            }}
                          />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className="page-loading">
                  <LoadingPage />
                </div>
              )}
            </tbody>
          </Table>
          {/* ............................................................................end of table...................... */}
          <Button variant="primary" onClick={() => loadData()}>
            Refresh
          </Button>

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

      {/* </main> */}
    </div>
  );
}

export default ManagerDashboard;
