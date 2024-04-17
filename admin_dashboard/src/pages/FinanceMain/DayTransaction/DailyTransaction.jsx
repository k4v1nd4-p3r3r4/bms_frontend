import React from "react";
import "./dailytransaction.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
function DailyTransaction() {
  const pages = ["DailyTransaction "];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Daily Transaction" pages={pages} icon={icon} />
      <main id="main" className="main">
        Daily Transactions
      </main>
    </>
  );
}

export default DailyTransaction;
