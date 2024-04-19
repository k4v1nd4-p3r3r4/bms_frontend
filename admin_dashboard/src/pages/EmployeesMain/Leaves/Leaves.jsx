import React from "react";
import "./leaves.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
function Leaves() {
  const pages = ["Leves"];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Leave Management" pages={pages} icon={icon} />
      <main id="main" className="main">
        Leave management
      </main>
    </>
  );
}
export default Leaves;
