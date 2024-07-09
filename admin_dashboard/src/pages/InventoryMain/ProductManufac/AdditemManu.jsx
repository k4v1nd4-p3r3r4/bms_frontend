import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { fetchItemIds } from "../../../components/Apiservices";

function AdditemManu() {
  const [modalShow, setModalShow] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [itemIds, setItemIds] = useState([]); //this is for get item id to dropdown list

  const [manuitem, setmanuItem] = useState({
    item_id: "",
    qty: "",
    date: "",
  });

  useEffect(() => {
    fetchItemIds(setItemIds); // Call fetchFoodIds and update foodlIds state
  }, []);

  const handleShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const handleInput = (e) => {
    e.persist();
    setmanuItem({
      ...manuitem,
      [e.target.name]: e.target.value,
    });
  };

  const saveItemmenu = (e) => {
    e.preventDefault();
    const data = {
      item_id: manuitem.item_id,
      qty: manuitem.qty,
      date: manuitem.date,
    };
    axios
      .post("http://127.0.0.1:8000/api/manuitems", data)
      .then((res) => {
        alert(res.data.message);
        setModalShow(false); // Close the modal
        window.location.reload(); // Reload the materials page
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.message);
          }
          if (error.response.status === 422) {
            alert(error.response.data);
          }
        }
      });
  };

  const clearForm = () => {
    setmanuItem({
      item_id: "",
      qty: "",
      date: "",
    });
  };

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary float-end">
        Add new
      </button>

      <Modal
        show={modalShow}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={saveItemmenu}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="food_id" className="form-label">
                  Item id
                </label>
                <select
                  name="item_id"
                  id="item_id"
                  className="form-control"
                  value={manuitem.item_id}
                  onChange={handleInput}
                >
                  <option value="">Select item ID</option>
                  {itemIds.map((itemId) => (
                    <option key={itemId} value={itemId}>
                      {itemId}
                    </option>
                  ))}
                </select>
                <span className="text-danger">{inputErrorList.item_id}</span>
              </div>
              <div className="col-md-6">
                <label htmlFor="qty" className="form-label">
                  Qty
                </label>
                <input
                  type="text"
                  name="qty"
                  id="qty"
                  placeholder="Enter quantity here.."
                  className="form-control"
                  value={manuitem.qty}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.qty}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="form-control"
                  value={manuitem.date}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.date}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12 text-end">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  style={{ marginRight: "5px" }}
                  onClick={clearForm}
                >
                  Clear
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default AdditemManu;
