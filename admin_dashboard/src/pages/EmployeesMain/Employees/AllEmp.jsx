import React from "react";
import "./allemp.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
function AllEmp() {
  const pages = ["All Employees"];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="All Employees" pages={pages} icon={icon} />
      <main id="main" className="main">
        all employees
      </main>
    </>
  );
}

export default AllEmp;
