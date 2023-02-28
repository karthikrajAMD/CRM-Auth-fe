import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Context } from "../../Context";
import { useContext, useState, useEffect } from "react";
import SidebarDashboard from "../../Bars/SidebarDashboard";
import { env } from "../../environment";
import LoadingPage from "../../Loading/LoadingPage";
import Button from "react-bootstrap/Button";
function UserTaskPage() {
  let navigate = useNavigate();
  let name = "Task Page";
  const [userName, setUname] = useState();
  const [sideShow, setSideShow] = useContext(Context);
  const [show0, setShow0] = useState(false);
  const [show1, setShow1] = useState(false);
  const [tasks, setTask] = useState();
  const [trigger, setTrigger] = useState([]);
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
  const taskEdit = () => {};
  const loadData = async () => {
    let getallTask = await axios.get(`${env.apiurl}/admin/get_all_task`);
    setTask(getallTask.data.allTask.filter((e) => e.assignedTo === userName));
    // setTask(tasks.filter((e) => e.assignedTo === userName));
    setTrigger(true);
    console.log(tasks);
  };
  useEffect(() => {
    setUname(sessionStorage.getItem("userEmail"));
    loadData();
  }, [trigger]);
  return (
    <div>
      <main className={sideShow ? "space-toggle" : null}>
        <SidebarDashboard name={name} role={"user"} />
      </main>
      <div className="container">
        '
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
  );
}

export default UserTaskPage;
