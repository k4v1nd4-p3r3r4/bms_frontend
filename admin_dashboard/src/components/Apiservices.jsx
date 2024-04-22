import axios from "axios";

export const fetchMaterialIds = (setMaterialIds) => {
  axios
    .get("http://127.0.0.1:8000/api/materials")
    .then((res) => {
      if (res.data && Array.isArray(res.data.materials)) {
        const ids = res.data.materials.map((material) => material.material_id);
        setMaterialIds(ids);
      } else {
        console.error("Invalid response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching material IDs:", error);
    });
};

export const fetchSupplierIds = (setSupplierIds) => {
  axios
    .get("http://127.0.0.1:8000/api/suppliers")
    .then((res) => {
      console.log("Supplier IDs response:", res.data); // Log the response
      if (res.data && Array.isArray(res.data.supplier)) {
        const ids = res.data.supplier.map((supplier) => supplier.supplier_id);
        setSupplierIds(ids);
      } else {
        console.error("Invalid response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching supplier IDs:", error);
    });
};
