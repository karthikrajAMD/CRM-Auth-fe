import React, { useEffect, useContext } from "react";
import { env } from "../environment";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../Context";
import axios from "axios";
import SidebarDashboard from "../Bars/SidebarDashboard";
function AdminLoginPage() {
  const [sideShow, setSideShow] = useContext(Context);
  let navigate = useNavigate();
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
        <SidebarDashboard role={"admin"} />
        <div>
          <h1>Home Page</h1>
        </div>
      </main>
    </>
  );
}

export default AdminLoginPage;
