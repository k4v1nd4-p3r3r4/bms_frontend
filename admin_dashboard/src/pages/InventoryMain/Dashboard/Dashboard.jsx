import React from "react";
import "./dashboard.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Cards from "../../../components/Widget/Cards";
import ReportCharts from "../../../components/ReportCharts/ReportCharts";
import Piechart from "../../../components/ReportCharts/Piechart";
import Clock from "../../../components/Clock/Clock/Clock";

function Dashboard() {
  const pages = ["Dashboard"];
  const icon = "bi bi-house-up";

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-header">
        <PageTitle page="Dashboard" pages={pages} icon={icon} />
        <Clock />
      </div>
      <main id="main" className="main" style={{ marginTop: "5px" }}>
        <Cards />
        <section className="dashboard section">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12" style={{ marginTop: "30px" }}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-bar-chart-fill"></i>
                        <span>Product Summary</span>
                      </h5>
                      <ReportCharts />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12" style={{ marginTop: "30px" }}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-bar-chart-fill "></i>
                        <span>Material availability</span>
                      </h5>
                      <Piechart />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12" style={{ marginTop: "30px" }}></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
