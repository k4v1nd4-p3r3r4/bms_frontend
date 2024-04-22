import "./purchase.css";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import PageTitle from "../../../components/PageTitle/PageTitle";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import AddPurchase from "./AddPurchase";
import Editpurchase from "./Editpurchase";
import Pagination from "../../../components/Pagination";

function Purchase() {
  const pages = ["Purchase"];
  const icon = "bi bi-house-up";

  const [modalShow, setModalShow] = useState(false);
  const [selectPurchaseId, setSelectedPurchaseId] = useState(null);
  //this one for fetch purchase materials
  const [purchase, setPurchase] = useState([]);
  //this for paginate purchase materials
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/purchaseMaterial").then((res) => {
      console.log(res);
      setPurchase(res.data.purchase);
    });
  }, []);

  // Logic to get current purchase for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPurchase = purchase.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for rendering pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(purchase.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShow = (purchaseId) => {
    setSelectedPurchaseId(purchaseId);
    setModalShow(true);
  };

  var PurchaseMaterialsDetails = "";
  PurchaseMaterialsDetails = currentPurchase.map((pitem, index) => {
    return (
      <tr key={index}>
        <td>{pitem.purchase_id}</td>
        <td>{pitem.material_id}</td>
        <td>{pitem.supplier_id}</td>
        <td>{pitem.date}</td>
        <td>{pitem.qty}</td>
        <td>{pitem.unit_price}</td>
        <td>{pitem.total_amount}</td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => handleShow(pitem.purchase_id)}
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
      <PageTitle page="Purchase" pages={pages} icon={icon} />
      <main id="main" className="main" style={{ marginTop: "2px" }}>
        <div className="container tbl-container">
          <div className="row tbl-fixed">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header custom-card-header">
                  <h4>
                    Purchase Materials
                    <AddPurchase />
                  </h4>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Purchase Id</th>
                        <th>Material Id</th>
                        <th>Supplier Id</th>
                        <th>Date</th>
                        <th>Qty</th>
                        <th>Unit_Price</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{PurchaseMaterialsDetails}</tbody>
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={purchase.length}
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
            Edit Purchase
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectPurchaseId && <Editpurchase purchase_id={selectPurchaseId} />}
        </Modal.Body>
        <Modal.Footer>
          {/* Hidden button for simulating modal close */}
          <button
            id="editpurchaseModal"
            style={{ display: "none" }}
            data-bs-dismiss="modal"
          ></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Purchase;
