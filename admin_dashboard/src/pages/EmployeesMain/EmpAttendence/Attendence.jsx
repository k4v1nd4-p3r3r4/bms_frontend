import React from "react";
import "./attendence.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
function Attendence() {
  const pages = ["Attendence"];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Attendence" pages={pages} icon={icon} />
      <main id="main" className="main">
        Attendence
      </main>
    </>
  );
}

export default Attendence;
