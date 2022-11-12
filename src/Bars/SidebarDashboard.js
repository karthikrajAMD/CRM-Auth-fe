import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";
import { ToastContainer } from "react-toastify";
import "../Sidebar.css";
function SidebarDashboard(props) {
  const [sideShow, setSideShow] = useContext(Context);

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
                    <i className={`fas fa-home-alt nav-logo-icon`}></i>
                    <span className="nav-logo-name">Homepage</span>
                  </Link>

                  <div className="nav-list">
                    <Link to="/user_dashboard" className="nav-link active">
                      <i className="fas fa-tachometer-alt nav-link-icon"></i>
                      <span className="nav-link-name">Dashboard</span>
                    </Link>
                    {/* <Link to="/hotel" className="nav-link">
                      <i className="fas fa-hotel nav-link-icon"></i>
                      <span className="nav-link-name">Hotel</span>
                    </Link>
                    <Link to="/service_admin" className="nav-link">
                      <i className="fas fa-image nav-link-icon"></i>
                      <span className="nav-link-name">Service Request</span>
                    </Link>
                    <Link to="/gallery" className="nav-link">
                      <i className="fas fa-dollar-sign nav-link-icon"></i>
                      <span className="nav-link-name">Transaction</span>
                    </Link> */}
                  </div>
                </div>

                <Link to="/home" className="nav-link">
                  <i className="fas fa-sign-out nav-link-icon"></i>
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
                        props.role === "manager"
                          ? "/manager_dashboard"
                          : "/dashboard"
                      }
                      className="nav-link active"
                    >
                      <i className="fas fa-tachometer-alt nav-link-icon"></i>
                      <span className="nav-link-name">Dashboard</span>
                    </Link>
                    <Link
                      to={
                        props.role === "manager"
                          ? "/manager_dashboard"
                          : "/dashboard"
                      }
                      className="nav-link"
                    >
                      <i className="fas fa-hotel nav-link-icon"></i>
                      <span className="nav-link-name">Profile</span>
                    </Link>
                    <Link
                      to={
                        props.role === "manager"
                          ? "/manager_dashboard"
                          : "/service_admin"
                      }
                      className="nav-link"
                    >
                      <i className="fas fa-image nav-link-icon"></i>
                      <span className="nav-link-name">Service Request</span>
                    </Link>
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
                  <i className="fas fa-sign-out nav-link-icon"></i>
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
