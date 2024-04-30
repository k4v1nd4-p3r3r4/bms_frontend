import React from "react";
import "./buyers.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
function Buyers() {
  const pages = ["Customers"];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Customers" pages={pages} icon={icon} />
      <main id="main" className="main">
        Buyers
      </main>
    </>
  );
}

export default Buyers;
