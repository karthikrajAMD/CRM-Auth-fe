import React, { useContext, useEffect } from "react";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { env } from "../environment";
import axios from "axios";
import SidebarDashboard from "../Bars/SidebarDashboard";
function EmployeeLoginPage() {
  const [sideShow, setSideShow] = useContext(Context);
  let navigate = useNavigate();
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
    <>
      <main className={sideShow ? "space-toggle" : null}>
        <SidebarDashboard role={"user"} />
        <div>
          <h1>Content</h1>
        </div>
      </main>
    </>
  );
}

export default EmployeeLoginPage;
