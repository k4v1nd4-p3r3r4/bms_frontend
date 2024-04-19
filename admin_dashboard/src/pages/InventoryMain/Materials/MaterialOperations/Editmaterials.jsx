import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./editmaterials.css";
import { Link, useParams } from "react-router-dom";

function Editmaterials({ material_id }) {
  const [inputErrorList, setInputErrorList] = useState({});
  const [materials, setMaterials] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/materials/${material_id}/edit`)
      .then((res) => {
        console.log(res);
        setMaterials(res.data.material);
      })
      .catch((error) => {
        console.error("Error fetching material details:", error);
      });
  }, [material_id]);

  const handleInput = (e) => {
    e.persist();
    setMaterials({
      ...materials,
      [e.target.name]: e.target.value,
    });
  };

  const saveMaterials = (e) => {
    e.preventDefault();

    const data = {
      material_id: materials.material_id,
      material_name: materials.material_name,
      unit: materials.unit,
      initial_qty: materials.initial_qty,
    };
    axios
      .put(`http://127.0.0.1:8000/api/materials/${material_id}/edit`, data)
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

  return (
    <>
      <form onSubmit={saveMaterials}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="material_id" className="form-label">
              Material id
            </label>
            <input
              type="text"
              name="material_id"
              id="mid"
              placeholder="Enter material id here..(ex: Mxxx)"
              className="form-control"
              value={materials.material_id}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.material_id}</span>
          </div>

          <div className="col-md-6">
            <label htmlFor="material_name" className="form-label">
              Material Name
            </label>
            <input
              type="text"
              name="material_name"
              id="maname"
              placeholder="Enter material name here.."
              className="form-control"
              value={materials.material_name}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.material_name}</span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="unit of measure" className="form-label">
              Unit of measure
            </label>
            <select
              name="unit"
              id="material_unit"
              className="form-control"
              value={materials.unit}
              onChange={handleInput}
            >
              <option value="">Select Unit</option>
              <option value="Kg">Kg</option>
              <option value="g">g</option>
              <option value="cm">cm</option>
            </select>
            <span className="text-danger">{inputErrorList.unit}</span>
          </div>
          <div className="col-md-6">
            <label htmlFor="qty" className="form-label">
              Quantity
            </label>
            <input
              type="text"
              name="initial_qty"
              id="qty"
              placeholder="Enter your quantity here.."
              className="form-control"
              value={materials.initial_qty}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.initial_qty}</span>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary float-end"
          style={{ marginLeft: "5px" }}
        >
          Save
        </button>
      </form>
    </>
  );
}

export default Editmaterials;
