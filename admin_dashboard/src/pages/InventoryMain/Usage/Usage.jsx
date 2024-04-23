import "./usage.css";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import PageTitle from "../../../components/PageTitle/PageTitle";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Addusage from "./Addusage";
import Editusage from "./Editusage";
import Pagination from "../../../components/Pagination";

function Usage() {
  const pages = ["Usage"];
  const icon = "bi bi-house-up";

  const [modalShow, setModalShow] = useState(false);
  const [selectUsageId, setSelectedUsageId] = useState(null);

  //this for usage pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  const [usage, setUsage] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/usagematerials").then((res) => {
      console.log(res);
      setUsage(res.data.usage);
    });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsage = usage.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for rendering pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(usage.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShow = (usageId) => {
    setSelectedUsageId(usageId);
    setModalShow(true);
  };

  var UsageMaterialsDetails = "";
  UsageMaterialsDetails = currentUsage.map((uitem, index) => {
    return (
      <tr key={index}>
        <td>{uitem.usage_id}</td>
        <td>{uitem.material_id}</td>
        <td>{uitem.date}</td>
        <td>{uitem.usage_qty}</td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => handleShow(uitem.usage_id)}
          >
            <i className="bi bi-pencil-square"></i> {/* Edit icon */}
          </button>
          <Link to="/" className="btn btn-danger" style={{ marginLeft: "5px" }}>
            <i className="bi bi-trash"></i> {/* Delete icon */}
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Usage" pages={pages} icon={icon} />
      <main id="main" className="main" style={{ marginTop: "2px" }}>
        <div className="container  tbl-container">
          <div className="row  tbl-fixed">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header custom-card-header">
                  <h4>
                    Usage Materials
                    <Addusage />
                  </h4>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Usage Id</th>
                        <th>Material Id</th>

                        <th>Date</th>
                        <th>Qty</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{UsageMaterialsDetails}</tbody>
                  </table>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={usage.length}
                    paginate={paginate}
                    className="custom-pagination"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Usage
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectUsageId && <Editusage usage_id={selectUsageId} />}
        </Modal.Body>
        <Modal.Footer>
          {/* Hidden button for simulating modal close */}
          <button
            id="editusageModal"
            style={{ display: "none" }}
            data-bs-dismiss="modal"
          ></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Usage;
