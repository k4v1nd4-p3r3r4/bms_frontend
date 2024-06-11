import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register"
import Dashboard from "../../pages/InventoryMain/Dashboard/Dashboard";
import Materials from "../../pages/InventoryMain/Materials/Materials";
import Purchase from "../../pages/InventoryMain/Purchase/Purchase";
import Usage from "../../pages/InventoryMain/Usage/Usage";
import Productlist from "../../pages/InventoryMain/ProductList/Productlist";
import Manufactured from "../../pages/InventoryMain/ProductManufac/Manufactured";
import Productsales from "../../pages/InventoryMain/ProductSales/Productsales";
import Productstock from "../../pages/InventoryMain/ProductStock/Productstock";
import Buyers from "../../pages/InventoryMain/Buyers/Buyers";
import Suppliers from "../../pages/InventoryMain/Suppliers/Suppliers";
import Users from "../../pages/EmployeesMain/Users/Users";
import AllEmp from "../../pages/EmployeesMain/Employees/AllEmp";
import Attendence from "../../pages/EmployeesMain/EmpAttendence/Attendence";
import Leaves from "../../pages/EmployeesMain/Leaves/Leaves";
import DailyTasks from "../../pages/EmployeesMain/DayTask/DailyTasks";
import DailyTransaction from "../../pages/FinanceMain/DayTransaction/DailyTransaction";
import Invoice from "../../pages/FinanceMain/Invoice/Invoice";
import Reports from "../../pages/FinanceMain/Reports/Reports";
import Editmaterials from "../../pages/InventoryMain/Materials/MaterialOperations/Editmaterials";



function MyRoutes() {
  return (
   
    <Routes>
      
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />


      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/materials" element={<Materials />} />
      <Route path="/purchase" element={<Purchase />} />
      <Route path="/usage" element={<Usage />} />
      <Route path="productlist" element={<Productlist />} />
      <Route path="manufactured" element={<Manufactured />} />
      <Route path="productsales" element={<Productsales />} />
      <Route path="productstock" element={<Productstock />} />
      <Route path="buyers" element={<Buyers />} />
      <Route path="suppliers" element={<Suppliers />} />
      <Route path="users" element={<Users />} />
      <Route path="allemp" element={<AllEmp />} />
      <Route path="attendence" element={<Attendence />} />
      <Route path="leaves" element={<Leaves />} />
      <Route path="dailytasks" element={<DailyTasks />} />
      <Route path="dayilytransaction" element={<DailyTransaction />} />
      <Route path="invoice" element={<Invoice />} />
      <Route path="reports" element={<Reports />} />

      <Route
        path="Editmaterials/:material_id/edit"
        element={<Editmaterials />}
      />
    
    </Routes>
   
  );
}

export default MyRoutes;
