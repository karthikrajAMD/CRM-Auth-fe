import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { env } from "../../environment";
import axios from "axios";

import { Context } from "../../Context";
import SidebarDashboard from "../../Bars/SidebarDashboard";

function UserDashboard() {
  let navigate = useNavigate();
  const [sideShow, setSideShow] = useContext(Context);

  let name = "Dashboard";
  let loadData = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let res = await axios.get(`${env.apiurl}/employee/verify`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.data.statusCode === 200) {
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
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <main className={sideShow ? "space-toggle" : null}>
        <SidebarDashboard name={name} role={"user"} />
      </main>
    </div>
  );
}

export default UserDashboard;
