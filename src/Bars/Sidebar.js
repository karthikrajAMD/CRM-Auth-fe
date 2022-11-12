import React, { useState, useContext } from "react";
import "../Sidebar.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../Context";
const Sidebar = () => {
  const [sideShow, setSideShow] = useContext(Context);
  console.log(sideShow);
  return (
    <main className={sideShow ? "space-toggle" : null}>
      <header className={`header ${sideShow ? "space-toggle" : null}`}>
        <div className="header-toggle" onClick={() => setSideShow(!sideShow)}>
          <i
            className={`fas fa-bars ${sideShow ? "fa-solid fa-xmark" : null}`}
          ></i>
        </div>
      </header>

      <aside className={`sidebar ${sideShow ? "show" : null}`}>
        <nav className="nav">
          <div>
            <Link to="/" className="nav-logo">
              <i className={`fas fa-home-alt nav-logo-icon`}></i>
              <span className="nav-logo-name">Homepage</span>
            </Link>

            <div className="nav-list">
              <Link to="/dashboard" className="nav-link active">
                <i className="fas fa-tachometer-alt nav-link-icon"></i>
                <span className="nav-link-name">Dashboard</span>
              </Link>
              <Link to="/hotel" className="nav-link">
                <i className="fas fa-hotel nav-link-icon"></i>
                <span className="nav-link-name">Hotel</span>
              </Link>
              <Link to="/gallery" className="nav-link">
                <i className="fas fa-image nav-link-icon"></i>
                <span className="nav-link-name">Gallery</span>
              </Link>
              <Link to="/gallery" className="nav-link">
                <i className="fas fa-dollar-sign nav-link-icon"></i>
                <span className="nav-link-name">Transaction</span>
              </Link>
            </div>
          </div>

          <Link to="/logout" className="nav-link">
            <i className="fas fa-sign-out nav-link-icon"></i>
            <span className="nav-link-name">Logout</span>
          </Link>
        </nav>
      </aside>

      <h1>Content</h1>
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
    </main>
  );
};

export default Sidebar;
