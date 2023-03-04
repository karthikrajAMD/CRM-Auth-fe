import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../Context";
import { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import SidebarDashboard from "../../Bars/SidebarDashboard";
import { ToastContainer, toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Button from "react-bootstrap/Button";
import LoadingPage from "../../Loading/LoadingPage";
import { env } from "../../environment";
function TaskAssign() {
  let navigate = useNavigate();
  let name = "Admin Dashboard";
  const [sideShow, setSideShow] = useContext(Context);
  const [show0, setShow0] = useState(false);
  const [show1, setShow1] = useState(false);
  const [tData, setData] = useState([]);
  const [tName, setTName] = useState(null);
  const [aName, setAssignByName] = useState();
  const [eName, setAssignToName] = useState();
  const [dDate, setDeadDate] = useState();
  const [status, setStatus] = useState();
  const [tasks, setTask] = useState();
  const [type, setType] = useState("");
  const [trigger, setTrigger] = useState([]);
  const [myDate, setDate] = useState();
  const [id, setId] = useState();
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
  const addTask = async () => {
    if (type !== "" && type !== "select role") {
      if (
        tName !== null &&
        aName !== null &&
        eName !== null &&
        dDate !== null &&
        status !== null
      ) {
        let addtask = await axios.post(`${env.apiurl}/admin/add_task`, {
          assignedDate: myDate,
          taskName: tName,
          assignedBy: aName,
          assignedTo: eName,
          deadLine: dDate,
          role: type,
          status: status,
        });
        if (addtask.data.statusCode === 200) {
          toast.success(addtask.data.message);
          handleClose1();
          loadData();
        } else {
          toast.error(addtask.data.message);
        }
      } else {
        toast.error("Fill all Details");
      }
    } else {
      toast.error("Select Role");
    }
  };
  async function setting({ e }) {
    await setId(e._id);
    await setDate(e.assignedDate);
    await setTName(e.taskName);
    await setAssignByName(e.assignedBy);
    await setAssignToName(e.assignedTo);
    await setDeadDate(e.deadLine);
    await setType(e.role);
    await setStatus(e.status);
  }
  async function managerEdit() {
    let managerUpdate = await axios.put(
      `${env.apiurl}/admin/task_assign_update/${id}`,
      {
        assignedDate: myDate,
        taskName: tName,
        assignedBy: aName,
        assignedTo: eName,
        deadLine: dDate,
        role: type,
        status: status,
      }
    );
    handleClose();
    loadData();
  }
  async function deleteTask(e) {
    let deleteAdmin = await axios.delete(
      `${env.apiurl}/admin/delete_task_assign/${e._id}`
    );
    if (deleteAdmin.data.statusCode === 200) {
      toast.success(deleteAdmin.data.message);
      loadData();
    }
  }

  const loadData = async () => {
    let getallTask = await axios.get(`${env.apiurl}/admin/get_all_task`);
    setTask(getallTask.data.allTask);
    setTrigger(true);
    console.log(tasks);
    setDate(new Date().toJSON().slice(0, 10));
  };
  useEffect(() => {
    loadData();
  }, [trigger]);
  return (
    <div>
      <div className="dash-cont">
        <div className="addUser-button">
          <Button variant="primary">
            <div onClick={handleShow1}>
              <AddIcon />
              Assign Task
            </div>
          </Button>
        </div>
        {/* Editing task model.................................................................. */}
        <Modal show={show0} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update your database</Modal.Title>
          </Modal.Header>
          <Form className="dashboardPopupForm">
            <Form.Group className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type="text" value={myDate} />
              </Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task"
                value={tName}
                onChange={(e) => setTName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assigned By</Form.Label>
              <Form.Control
                type="text"
                placeholder="Head Name"
                value={aName}
                onChange={(e) => setAssignByName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assigned to</Form.Label>
              <Form.Control
                type="email"
                placeholder="Employee User_Name"
                value={eName}
                onChange={(e) => setAssignToName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              {/* <Form.Control as="select"> */}
              <Form.Select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="user">User</option>
                <option value="Manager">Manager</option>
              </Form.Select>
              {/* value={type}
                onChange={(e) => setType(e.target.value)} */}
              {/* </Form.Control> */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dead Line</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                value={dDate}
                onChange={(e) => setDeadDate(e.target.value)}
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
                managerEdit(id);
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Adding user Modal ............................................................. */}
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Task</Modal.Title>
          </Modal.Header>
          <Form className="dashboardPopupForm">
            <Form.Group className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type="text" value={myDate} />
              </Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task"
                onChange={(e) => setTName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assigned By</Form.Label>
              <Form.Control
                type="text"
                placeholder="Head Name"
                onChange={(e) => setAssignByName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assigned to</Form.Label>
              <Form.Control
                type="email"
                placeholder="Employee User_Name"
                onChange={(e) => setAssignToName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="select role">Select Role</option>
                <option value="user">User</option>
                <option value="Manager">Manager</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="status"
                onChange={(e) => setStatus(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dead Line</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                onChange={(e) => setDeadDate(e.target.value)}
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
                addTask();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th
                  style={{ textAlign: "center", fontSize: "25px" }}
                  colSpan="12"
                >
                  Task
                </th>
              </tr>
            </thead>

            <thead>
              <tr>
                <th>S.No</th>
                <th>Task </th>
                <th>Assigned Date</th>
                <th>Assigned To</th>
                <th>Assigned By</th>
                <th>Role</th>
                <th>Status</th>
                <th>Dead Line</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks ? (
                tasks.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{e.taskName}</td>
                      <td>{e.assignedDate}</td>
                      <td>{e.assignedTo}</td>
                      <td>{e.assignedBy}</td>
                      <td>{e.role}</td>
                      <td>{e.status}</td>
                      <td>{e.deadLine}</td>
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
                              deleteTask(e);
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
        </div>
      </div>
    </div>
  );
}

export default TaskAssign;
