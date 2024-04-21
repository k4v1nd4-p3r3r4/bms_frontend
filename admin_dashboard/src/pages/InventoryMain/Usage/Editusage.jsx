import React, { useEffect, useState } from "react";
import axios from "axios";

function Editusage({ usage_id }) {
  const [inputErrorList, setInputErrorList] = useState({});
  const [usage, setUsage] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/usagematerials/${usage_id}/usageedit`)
      .then((res) => {
        console.log(res);
        setUsage(res.data.usage);
      })
      .catch((error) => {
        console.error("Error fetching usage details:", error);
      });
  }, [usage_id]);

  const handleInput = (e) => {
    e.persist();
    setUsage({
      ...usage,
      [e.target.name]: e.target.value,
    });
  };

  const saveUsage = (e) => {
    e.preventDefault();
    const data = {
      material_id: usage.material_id,
      date: usage.date,
      usage_qty: usage.usage_qty,
    };

    axios
      .put(
        `http://127.0.0.1:8000/api/usagematerials/${usage_id}/usageedit`,
        data
      )
      .then((res) => {
        alert(res.data.message);
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
    setUsage({
      material_id: "",
      date: "",
      usage_qty: "",
    });
  };

  return (
    <>
      <form onSubmit={saveUsage}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="material_id" className="form-label">
              Material id
            </label>
            <select
              name="material_id"
              id="material_id"
              className="form-control"
              value={usage.material_id}
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
              value={usage.date}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.date}</span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="qty" className="form-label">
              Usage Qty
            </label>
            <input
              type="text"
              name="usage_qty"
              id="qty"
              placeholder="Enter quantity here.."
              className="form-control"
              value={usage.usage_qty}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.usage_qty}</span>
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
export default Editusage;
