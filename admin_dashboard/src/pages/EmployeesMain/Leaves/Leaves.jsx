import React from "react";
import "./leaves.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Link } from "react-router-dom";
function Leaves() {
  const pages = ["Leves"];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Leave Management" pages={pages} icon={icon} />
      <main id="main" className="main">
        <div className="continer mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                    <h4>Leave List
                      <Link to="/" className="btn btn-primary float-end">Add Leaves</Link>
                    </h4>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Leave Id</th>
                        <th>Employee Id</th>
                        <th>Date</th> 
                        <th>Leave Type</th>
                        <th>Reason</th>
                        <th>Stasus</th>
                      </tr>
                    </thead>


                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
export default Leaves;
