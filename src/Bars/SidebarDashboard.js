import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";
import { ToastContainer } from "react-toastify";
import TaskIcon from "@mui/icons-material/Task";
import Person2Icon from "@mui/icons-material/Person2";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import "../Sidebar.css";
function SidebarDashboard(props) {
  const [sideShow, setSideShow] = useContext(Context);
  const grade = sessionStorage.getItem("user-grade");
  console.log(props);
  return (
    <>
      <div>
        {props.role === "user" ? (
          <>
            <header className={`header ${sideShow ? "space-toggle" : null}`}>
              <div
                className="header-toggle"
                onClick={() => setSideShow(!sideShow)}
              >
                <i
                  className={`fas fa-bars ${
                    sideShow ? "fa-solid fa-xmark" : null
                  }`}
                ></i>
              </div>
              <div>
                <h2 className="h2-title">{props.name}</h2>
              </div>
            </header>
            <aside className={`sidebar ${sideShow ? "sideShow" : null}`}>
              <nav className="nav">
                <div>
                  <Link to="/" className="nav-logo">
                    <HomeIcon />
                    <span className="nav-logo-name">Homepage</span>
                  </Link>

                  <div className="nav-list">
                    <Link
                      to="/user_dashboard"
                      className={
                        props.select === "dash" ? "nav-link active" : "nav-link"
                      }
                    >
                      <DashboardIcon />
                      <span className="nav-link-name">Dashboard</span>
                    </Link>
                    <Link
                      to="/user_task"
                      className={
                        props.select === "task" ? "nav-link active" : "nav-link"
                      }
                    >
                      <TaskIcon />
                      <span className="nav-link-name">Task Page</span>
                    </Link>
                    <Link
                      to="/chat"
                      className={
                        props.select === "chat" ? "nav-link active" : "nav-link"
                      }
                      // className={props.select === "chat" ? "active" : ""}
                    >
                      <ChatIcon />
                      <span className="nav-link-name">Chat Page</span>
                    </Link>
                  </div>
                </div>

                <Link to="/home" className="nav-link">
                  {/* <i className="fas fa-sign-out nav-link-icon"></i> */}
                  <LogoutIcon />
                  <span className="nav-link-name">Logout</span>
                </Link>
              </nav>
            </aside>
          </>
        ) : (
          <>
            <header className={`header ${sideShow ? "space-toggle" : null}`}>
              <div
                className="header-toggle"
                onClick={() => setSideShow(!sideShow)}
              >
                <i
                  className={`fas fa-bars ${
                    sideShow ? "fa-solid fa-xmark" : null
                  }`}
                ></i>
              </div>
              <div>
                <h2 className="h2-title">{props.name}</h2>
              </div>
            </header>
            <aside className={`sidebar ${sideShow ? "sideShow" : null}`}>
              <nav className="nav">
                <div>
                  <Link to="/" className="nav-logo">
                    <i className={`fas fa-home-alt nav-logo-icon`}></i>
                    <span className="nav-logo-name">Homepage</span>
                  </Link>

                  <div className="nav-list">
                    <Link
                      to={
                        grade === "manager"
                          ? "/manager_dashboard"
                          : "/dashboard"
                      }
                      className={
                        props.select === "dash" ? "nav-link active" : "nav-link"
                      }
                    >
                      {/* <i className="fas fa-tachometer-alt nav-link-icon"></i> */}
                      <DashboardIcon />
                      <span className="nav-link-name">Dashboard</span>
                    </Link>
                    <Link
                      to={
                        grade === "manager"
                          ? "/managerProfile"
                          : "/adminProfile"
                      }
                      className={
                        props.select === "profile"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      {/* <i className="fas fa-hotel nav-link-icon"></i> */}
                      <Person2Icon />
                      <span className="nav-link-name">Profile</span>
                    </Link>

                    {/* <Link
                      to={
                        grade === "manager"
                          ? "/manager_dashboard"
                          : "/service_admin"
                      }
                      className="nav-link"
                    >
                      <HomeRepairServiceIcon />
                      <span className="nav-link-name">Service Request</span>
                    </Link> */}
                    {/* <Link
                      to={
                        props.role === "manager"
                          ? "/manager_dashboard"
                          : "/dashboard"
                      }
                      className="nav-link"
                    >
                      <i className="fas fa-dollar-sign nav-link-icon"></i>
                      <span className="nav-link-name">Transaction</span>
                    </Link> */}
                  </div>
                </div>

                <Link to="/home" className="nav-link">
                  <LogoutIcon />
                  <span className="nav-link-name">Logout</span>
                </Link>
              </nav>
            </aside>
          </>
        )}
      </div>

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
    </>
  );
}

export default SidebarDashboard;
