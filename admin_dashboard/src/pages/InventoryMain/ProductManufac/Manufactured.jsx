import React from "react";
import "./manufac.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
function Manufactured() {
  const pages = ["Manufactured"];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Manufactured products" pages={pages} icon={icon} />
      <main id="main" className="main">
        Manu
      </main>
    </>
  );
}

export default Manufactured;
