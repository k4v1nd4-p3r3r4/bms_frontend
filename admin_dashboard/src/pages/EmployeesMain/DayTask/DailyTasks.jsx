import React from "react";
import "./dailytasks.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
function DailyTasks() {
  const pages = ["DailyTasks "];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Daily Tasks" pages={pages} icon={icon} />
      <main id="main" className="main">
        Daily tasks
      </main>
    </>
  );
}

export default DailyTasks;
