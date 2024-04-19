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

function Purchase() {
  const pages = ["Purchase"];
  const icon = "bi bi-house-up";

  const [modalShow, setModalShow] = useState(false);
  const [selectPurchaseId, setSelectedPurchaseId] = useState(null);
  //this one for fetch purchase materials
  const [purchase, setPurchase] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/purchaseMaterial").then((res) => {
      console.log(res);
      setPurchase(res.data.purchase);
    });
  }, []);

  const handleShow = (purchaseId) => {
    setSelectedPurchaseId(purchaseId);
    setModalShow(true);
  };

  var PurchaseMaterialsDetails = "";
  PurchaseMaterialsDetails = purchase.map((pitem, index) => {
    return (
      <tr key={index}>
        <td className="center">{pitem.purchase_id}</td>
        <td className="center">{pitem.material_id}</td>
        <td className="center">{pitem.supplier_id}</td>
        <td className="center">{pitem.date}</td>
        <td className="center">{pitem.qty}</td>
        <td className="center">{pitem.unit_price}</td>
        <td className="center">{pitem.total_amount}</td>
        <td className="center">
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
        <div className="container">
          <div className="row">
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
                        <th className="center">P_Id</th>
                        <th className="center">M_Id</th>
                        <th className="center">S_Id</th>
                        <th className="center">Date</th>
                        <th className="center">Qty</th>
                        <th className="center">U_Price</th>
                        <th className="center">T_Amount</th>
                        <th className="center">Action</th>
                      </tr>
                    </thead>
                    <tbody>{PurchaseMaterialsDetails}</tbody>
                  </table>
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
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default Purchase;
