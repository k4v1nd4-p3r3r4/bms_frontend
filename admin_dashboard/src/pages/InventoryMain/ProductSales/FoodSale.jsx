import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../../components/Pagination";
import Modal from "react-bootstrap/Modal";
import Addfoodsale from "./Addfoodsale";
import Editfoodsale from "./Editfoodsale";
import SearchBox from "../../../components/SearchBox"; // Import the SearchBox component

function FoodSale() {
  const [modalShow, setModalShow] = useState(false);
  const [foodsale, setfoodsale] = useState([]);
  const [selectedSaleId, setSelectedSaleId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

  //Get  request to get foodsaless data
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/foodsales")
      .then((res) => {
        console.log("Item sale data:", res.data);
        setfoodsale(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching foodsale", error);
      });
  }, []);

  // Logic to get current Manufoods for the current page and search term
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredSaleFood = foodsale
    .filter((sale) =>
      Object.values(sale).some(
        (val) =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  // Logic for rendering pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSaleFood.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //this one for delete function
  const handleShow = (FoodsaleId) => {
    setSelectedSaleId(FoodsaleId);
    setModalShow(true);
  };

  // popup message for conform delete
  const deletefoodsale = (e, foodsale_id) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this food item?"
    );
    if (shouldDelete) {
      const thisClicked = e.currentTarget;
      //request for delete
      axios
        .delete(
          `http://127.0.0.1:8000/api/foodsales/${foodsale_id}/foodsaledelete`
        )
        .then((res) => {
          alert(res.data.message);
          thisClicked.closest("tr").remove();
          // Reload the materials page
          window.location.reload();
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status === 422) {
              alert(error.response.data);
            }
          }
        });
    }
  };

  const Salefooddetails = filteredSaleFood.map((fdsale, index) => (
    <tr key={index}>
      <td>{fdsale.sale_id}</td>
      <td>{fdsale.food_id}</td>
      <td>{fdsale.customer_id}</td>
      <td>{fdsale.date}</td>
      <td>{fdsale.qty}</td>
      <td>{fdsale.unit_price}</td>
      <td>{fdsale.total_amount}</td>

      <td>
        <button
          className="btn btn-success"
          onClick={() => handleShow(fdsale.sale_id)}
        >
          <i className="bi bi-pencil-square"></i> {/* Edit icon */}
        </button>

        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px" }}
          onClick={(e) => deletefoodsale(e, fdsale.sale_id)}
        >
          <i className="bi bi-trash"></i> {/* Delete icon */}
        </button>
      </td>
    </tr>
  ));

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="container tbl-container" style={{ marginLeft: "5px" }}>
        <div className="row tbl-fixed">
          <div className="col-md-12">
            <div className="card">
              <div
                className="card-header custom-card-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <SearchBox
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                />
                <Addfoodsale />
              </div>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sale Id</th>
                    <th>Food Id</th>
                    <th>Customer Id</th>
                    <th>Date</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total Amount</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{Salefooddetails}</tbody>
                <tfoot>
                  <tr></tr>
                </tfoot>
              </table>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredSaleFood.length}
                paginate={paginate}
                className="custom-pagination"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Food sale
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSaleId && <Editfoodsale foodsale_id={selectedSaleId} />}
        </Modal.Body>
        <Modal.Footer>
          {/* Hidden button for simulating modal close */}
          <button
            id="editsalefoodModal"
            style={{ display: "none" }}
            data-bs-dismiss="modal"
          ></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FoodSale;
