import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Component/Login";
import AdminDashboard from "./Component/dashboard/AdminDashboard";
import Home from "./Component/Home";
import AdminLoginPage from "./Component/AdminLoginPage";
import react, { useState } from "react";
import { Context } from "./Context";
import ServiceRequest from "./Component/ServiceRequest";
import ManagerLoginPage from "./Component/ManagerLoginPage";
import ManagerDashboard from "./Component/dashboard/ManagerDashboard";
import EmployeeLoginPage from "./Component/EmployeeLoginPage";
import UserTaskPage from "./Component/Task/UserTaskPage";
import TaskAssign from "./Component/Task/TaskAssign";
import ManagerTaskAssign from "./Component/Task/ManagerTaskAssign";
import ManagerProfile from "./Component/Profile/ManagerProfile";
import AdminProfile from "./Component/Profile/AdminProfile";
import Chat from "./chat/chat";
function App() {
  const [sideShow, setSideShow] = useState(false);
  return (
    <>
      <div>
        <BrowserRouter>
          <Context.Provider value={[sideShow, setSideShow]}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/user_task" element={<UserTaskPage />} />
              <Route path="/service_admin" element={<ServiceRequest />} />
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route path="/managerProfile" element={<ManagerProfile />} />
              <Route path="/adminProfile" element={<AdminProfile />} />
              <Route path="/task_assign_page" element={<TaskAssign />} />
              <Route path="/chat" element={<Chat />} />
              <Route
                path="/manager_dashboard"
                element={<ManagerTaskAssign />}
              />
              <Route path="/manager" element={<ManagerLoginPage />} />
              <Route path="/user_dashboard" element={<EmployeeLoginPage />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </Context.Provider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
