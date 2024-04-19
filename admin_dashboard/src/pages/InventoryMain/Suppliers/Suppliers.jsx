import React from "react";
import "./suppliers.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
function Suppliers() {
  const pages = ["Suppliers"];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Suppliers" pages={pages} icon={icon} />
      <main id="main" className="main">
        suppliers
      </main>
    </>
  );
}

export default Suppliers;
