import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import AddMaterial from "./MaterialOperations/AddMaterial";
import Editmaterials from "./MaterialOperations/Editmaterials";
import "./materials.css";

function Materials() {
  const [modalShow, setModalShow] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/materials")
      .then((res) => {
        setMaterials(res.data.materials);
      })
      .catch((error) => {
        console.error("Error fetching materials:", error);
      });
  }, []);

  const handleShow = (materialId) => {
    setSelectedMaterialId(materialId);
    setModalShow(true);
  };

  const materialsDetails = materials.map((item, index) => (
    <tr key={index}>
      <td className="center">{item.material_id}</td>
      <td className="center">{item.material_name}</td>
      <td className="center">{item.unit}</td>
      <td className="center">{item.initial_qty}</td>
      <td className="center">
        <button
          className="btn btn-success"
          onClick={() => handleShow(item.material_id)}
        >
          <i className="bi bi-pencil-square"></i> {/* Edit icon */}
        </button>
        <Link to="/" className="btn btn-danger" style={{ marginLeft: "5px" }}>
          <i className="bi bi-trash"></i> {/* Delete icon */}
        </Link>
      </td>
    </tr>
  ));

  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Materials" pages={["Materials"]} icon="bi bi-house-up" />
      <main id="main" className="main" style={{ marginTop: "2px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header custom-card-header">
                  <h4>
                    Materials Details
                    <AddMaterial />
                  </h4>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="center">Id</th>
                        <th className="center">Name</th>
                        <th className="center">Unit</th>
                        <th className="center">Quantity</th>
                        <th className="center">Action</th>
                      </tr>
                    </thead>
                    <tbody>{materialsDetails}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for editing materials */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Material
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMaterialId && (
            <Editmaterials material_id={selectedMaterialId} />
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default Materials;
