import React from "react";
import "./productstock.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
function Productstock() {
  const pages = ["Stock"];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Product Stock" pages={pages} icon={icon} />
      <main id="main" className="main">
        products stock
      </main>
    </>
  );
}

export default Productstock;
