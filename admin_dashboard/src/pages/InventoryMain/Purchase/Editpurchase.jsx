import React, { useEffect, useState } from "react";
import axios from "axios";

function Editpurchase({ purchase_id }) {
  const [inputErrorList, setInputErrorList] = useState({});
  const [purchase, setPurchase] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/purchaseMaterial/${purchase_id}/purchaseedit`
      )
      .then((res) => {
        console.log(res);
        setPurchase(res.data.purchase);
      })
      .catch((error) => {
        console.error("Error fetching purchase details:", error);
      });
  }, [purchase_id]);

  const handleInput = (e) => {
    e.persist();
    setPurchase({
      ...purchase,
      [e.target.name]: e.target.value,
    });
  };
  const savePurchase = (e) => {
    e.preventDefault();
    const data = {
      material_id: purchase.material_id,
      supplier_id: purchase.supplier_id,
      date: purchase.date,
      qty: purchase.qty,
      unit_price: purchase.unit_price,
    };

    axios
      .put(
        `http://127.0.0.1:8000/api/purchaseMaterial/${purchase_id}/purchaseedit`,
        data
      )
      .then((res) => {
        alert(res.data.message);
        // Close the modal
        document.getElementById("editMaterialModal").click();
        // Reload the materials page
        window.location.reload();
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
    setPurchase({
      material_id: "",
      supplier_id: "",
      date: "",
      qty: "",
      unit_price: "",
    });
  };
  return (
    <>
      <form onSubmit={savePurchase}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="material_id" className="form-label">
              Material id
            </label>
            <select
              name="material_id"
              id="material_id"
              className="form-control"
              value={purchase.material_id}
              onChange={handleInput}
            >
              <option value="">Select Id</option>
              <option value="M001">M001</option>
              <option value="M002">M002</option>
              <option value="M003">M003</option>
              <option value="M004">M004</option>
              <option value="M005">M005</option>
            </select>
            <span className="text-danger">{inputErrorList.material_id}</span>
          </div>

          <div className="col-md-6">
            <label htmlFor="supplier_id" className="form-label">
              Supplier id
            </label>
            <select
              name="supplier_id"
              id="supplier_id"
              className="form-control"
              value={purchase.supplier_id}
              onChange={handleInput}
            >
              <option value="">Select Id</option>
              <option value="S001">S001</option>
              <option value="S002">S002</option>
              <option value="S003">S003</option>
              <option value="S004">S004</option>
              <option value="S005">S005</option>
            </select>
            <span className="text-danger">{inputErrorList.supplier_id}</span>
          </div>
        </div>
        <div className="row mb-3">
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
              value={purchase.qty}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.qty}</span>
          </div>

          <div className="col-md-6">
            <label htmlFor="unit_price" className="form-label">
              Unit price
            </label>
            <input
              type="text"
              name="unit_price"
              id="unit_price"
              placeholder="Enter unit price here.."
              className="form-control"
              value={purchase.unit_price}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.unit_price}</span>
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
              value={purchase.date}
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
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginRight: "5px" }}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Editpurchase;
