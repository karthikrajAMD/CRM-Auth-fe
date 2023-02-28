import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { env } from "../../environment";
import axios from "axios";
import Table from "react-bootstrap/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddIcon from "@mui/icons-material/Add";
import { Context } from "../../Context";
import SidebarDashboard from "../../Bars/SidebarDashboard";
import TaskAssign from "../Task/TaskAssign";
import LoadingPage from "../../Loading/LoadingPage";
function AdminDashboard() {
  let [data, setData] = useState();
  let name = "Dashboard";
  const [sideShow, setSideShow] = useContext(Context);
  let [mdata, setMdata] = useState();
  let [adata, setAdata] = useState();
  let [id, setId] = useState(0);
  let [firstN, setFirstN] = useState("");
  let [lastN, setLastN] = useState("");
  let [roleN, setRole] = useState("");
  let [emailN, setEmailN] = useState("");
  let [mainRole, setMainRole] = useState("");
  // new user variable.................................................
  let [newFirstName, setNewFirstName] = useState("");
  let [newLastName, setNewLastName] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [newCPassword, setNewCPassword] = useState("");
  let [newEmail, setNewEmail] = useState("");

  const [show0, setShow0] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleClose = () => {
    setShow0(false);
    // setEmailN(mail);
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
  const handleClose2 = () => {
    setShow2(false);
  };
  const handleShow2 = () => {
    setShow2(true);
  };
  const handleClose3 = () => {
    setShow3(false);
  };
  const handleShow3 = () => {
    setShow3(true);
  };
  let navigate = useNavigate();
  async function setting({ e }) {
    await setId(e._id);
    await setEmailN(e.email);
    await setRole(e.role);
    await setFirstN(e.firstName);
    await setLastN(e.lastName);
    await setMainRole(e.role);
  }
  async function adminEdit(email) {
    let adminUpdate = await axios.put(`${env.apiurl}/admin/edit/${id}`, {
      firstName: firstN,
      lastName: lastN,
      role: roleN,
      email: emailN,
    });

    handleClose();
    loadData();
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
  async function adminAddManager() {
    let adminAddManager = await axios.post(`${env.apiurl}/manager/signup/`, {
      firstName: newFirstName,
      lastName: newLastName,
      password: newPassword,
      confirmPassword: newCPassword,
      email: newEmail,
    });
    if (adminAddManager.data.statusCode === 200) {
      toast.success("Manager data Created Successfully");
    } else toast.error(adminAddManager.data.message);

    handleClose2();
    loadData();
  }
  async function adminAddAdmin() {
    let adminAddAdmin = await axios.post(`${env.apiurl}/admin/signup/`, {
      firstName: newFirstName,
      lastName: newLastName,
      password: newPassword,
      confirmPassword: newCPassword,
      email: newEmail,
    });
    if (adminAddAdmin.data.statusCode === 200) {
      toast.success("Admin data Created Successfully");
    } else toast.error(adminAddAdmin.data.message);

    handleClose3();
    loadData();
  }

  async function managerEdit() {
    let managerUpdate = await axios.put(
      `${env.apiurl}/admin/manager_update/${id}`,
      {
        firstName: firstN,
        lastName: lastN,
        role: roleN,
        email: emailN,
      }
    );
    handleClose();
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
  async function deleteManager(e) {
    let deleteManager = await axios.delete(
      `${env.apiurl}/admin/deleteManager/${e._id}`
    );
    if (deleteManager.data.statusCode === 200) {
      toast.success(deleteManager.data.message);
      loadData();
    }
  }
  async function deleteAdmin(e) {
    if (e._id === "636fb208861b27ebc368f1fc") {
      toast.error("Can't delete the Administrator of this project");
    } else {
      let deleteAdmin = await axios.delete(
        `${env.apiurl}/admin/deleteAdmin/${e._id}`
      );
      if (deleteAdmin.data.statusCode === 200) {
        toast.success(deleteAdmin.data.message);
        loadData();
      }
    }
  }

  let loadData = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let res = await axios.get(`${env.apiurl}/admin/all-users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.data.statusCode === 200) {
        toast.success(res.data.message);
        setData(res.data.users);
        setMdata(res.data.manager);
        setAdata(res.data.admin);
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
    <main className={sideShow ? "space-toggle" : null}>
      <SidebarDashboard name={name} role={"admin"} />
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
                if (mainRole === "Manager") {
                  managerEdit(id);
                } else if (mainRole === "user") {
                  employeeEdit(id);
                } else if (mainRole === "admin") {
                  adminEdit(id);
                }
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

        {/* Adding manager modal........................................................................... */}
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Manager</Modal.Title>
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
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                adminAddManager();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ................Adding admin modal..................................................................... */}
        <Modal show={show3} onHide={handleClose3}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Manager</Modal.Title>
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
            <Button variant="secondary" onClick={handleClose3}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                adminAddAdmin();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* <div className="sidebar-dashboard"></div> */}
        <div className="dashboard-main">
          {/* <h1 style={{ textAlign: "center" }}>Dashboard</h1> */}
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
          {/* manager.............................................................................. */}
          <div className="addUser-button">
            <Button variant="primary">
              <div onClick={handleShow2}>
                <AddIcon />
                Add Manager
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
                  Manager
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
              {mdata ? (
                mdata.map((e, i) => {
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
                              deleteManager(e);
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
          {/* ..................................................admin.......................................... */}
          <div className="addUser-button">
            <Button variant="primary">
              <div onClick={handleShow3}>
                <AddIcon />
                Add Admin
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
                  Admin
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
              {adata ? (
                adata.map((e, i) => {
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
                              deleteAdmin(e);
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
      <div>
        <TaskAssign />
      </div>
    </main>
  );
}

export default AdminDashboard;
