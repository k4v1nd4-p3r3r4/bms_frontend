// Dashboard.jsx
import React from "react";
import "./dashboard.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";

function Dashboard() {
  const pages = ["Dashboard"];
  const icon = "bi bi-house-up";

  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Dashboard" pages={pages} icon={icon} />
      <main id="main" className="main" style={{ marginTop: "5px" }}></main>
    </>
  );
}

export default Dashboard;
