import React from "react";
import "./usage.css";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import PageTitle from "../../../components/PageTitle/PageTitle";
function Usage() {
  const pages = ["Usage"];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Usage" pages={pages} icon={icon} />
      <main id="main" className="main">
        Usage
      </main>
    </>
  );
}

export default Usage;
