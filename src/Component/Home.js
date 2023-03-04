import React, { useEffect } from "react";
import ResponsiveDrawer from "../Bars/ResponsiveDrawer";

function Home() {
  let loadData = async () => {
    let token = sessionStorage.setItem("token", "");
    let email = sessionStorage.setItem("userEmail", "");
    let grade = sessionStorage.setItem("user-grade", "");
    let name = sessionStorage.setItem("name", "");
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <div className="home-sidebar">
        <aside>
          <ResponsiveDrawer />
        </aside>
      </div>
    </>
  );
}

export default Home;
