import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import AddMaterial from "./MaterialOperations/AddMaterial";
import Editmaterials from "./MaterialOperations/Editmaterials";
import Pagination from "../../../components/Pagination"; // Import Pagination component
import "./materials.css";

function Materials() {
  const [modalShow, setModalShow] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

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

  // Logic to get current materials for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMaterials = materials.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for rendering pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(materials.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShow = (materialId) => {
    setSelectedMaterialId(materialId);
    setModalShow(true);
  };

  const materialsDetails = currentMaterials.map((item, index) => (
    <tr key={index}>
      <td>{item.material_id}</td>
      <td>{item.material_name}</td>
      <td>{item.unit}</td>
      <td>{item.initial_qty}</td>
      <td>
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
        <div className="container tbl-container">
          <div className="row tbl-fixed">
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
                        <th>Id</th>
                        <th>Name</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{materialsDetails}</tbody>
                    <tfoot>
                      <tr></tr>
                    </tfoot>
                  </table>
                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={materials.length}
                    paginate={paginate}
                    className="custom-pagination"
                  />
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
