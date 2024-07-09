
import React, { useEffect, useState } from "react";

import "./dailytasks.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import axios from "axios";
function DailyTasks() {
  const pages = ["DailyTasks "];
  const icon = "bi bi-house-up";
  const [id,setId] = useState('');
  const [empid,setEmpId] = useState('');
  const [taskname,setTaskname] = useState('');
  const [date,setDate] = useState('');
  const [status,setStatus] = useState('');
  const [tasks,setTasks] = useState([]);

  // const formatDate = (date) => {
  //   const d = new Date(date);
  //   const year = d.getFullYear();
  //   let month = '' + (d.getMonth() + 1);
  //   let day = '' + d.getDate();
  
  //   if (month.length < 2) 
  //     month = '0' + month;
  //   if (day.length < 2) 
  //     day = '0' + day;
  
  //   return [year, month, day].join('-');
  // };

   useEffect(() => {
    (async () => await Load())();
    }, []);

    async function Load(){
      const result = await axios.get(
        "http://127.0.0.1:8000/api/task"
      );
      setTasks(result.data);
      console.log(result.data);
    }

    async function save(event)
    {
        event.preventDefault();
       
    try
        {
         await axios.post("http://127.0.0.1:8000/api/task",
        {
          
          empid:empid,
          taskname:taskname,
          date:date,
          status:status,
          
        
        });
          alert("Task Saved");
          setEmpId("");
          setTaskname("");
          setDate("");
          setStatus("");
          setId("");
          Load();
        
        }
    catch(err)
        {
          alert("Task Save Failed");
        }
   }

   async function editTask(tasks)
   {
    setEmpId(tasks.empid);
    setTaskname(tasks.taskname);
    setDate(tasks.date);
    setStatus(tasks.status);
    setId(tasks.id);
    
   }

   async function deletetask(id)
   {
       
        await axios.delete("http://127.0.0.1:8000/api/task/" + id); 
        alert("Task deleted Successfully");
        Load();
   
   }

   async function update(event)
   {
    event.preventDefault();
   try
       {
        
        await axios.put("http://127.0.0.1:8000/api/task/"+ tasks.find(u => u.id === id).id || id,
       {
         id: id,
         empid:empid,
         taskname:taskname,
         date:date,
         status:status,
       
       });
         alert("Task Updated..");
         setId('');
         setEmpId('');
         setTaskname('');
         setDate('');
         setStatus('');
         Load();
       
       }
   catch(err)
       {
         alert("Task Updated Failed");
       }
  }
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Daily Tasks" pages={pages} icon={icon} />
      <main id="main" className="main"  style={{ marginTop: "10px" }}>
      <div className="container">
       <div className="row">
        <div class="">
            <div className="signup-form">
                <form action="" className="mt-5 border p-4 bg-light shadow">
                    <h4 className="mb-5 text-secondary">Daily Task</h4>
                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <label>Employee ID<span class="text-danger">*</span></label>
                            <input type="text"  className="form-control" placeholder="Employee ID"
                            value={empid} onChange={(event) =>
                              {
                                setEmpId(event.target.value);      
                              }}/>
                        </div>
                        <div className="mb-3 col-md-6">
                            <label>Task<span className="text-danger">*</span></label>
                            <input type="text" name="fname" class="form-control" placeholder="Enter Task"
                             value={taskname} onChange={(event) =>
                              {
                                setTaskname(event.target.value);      
                              }}/>
                        </div>
                      
                        <div class="mb-3 col-md-6">
                            <label>Date<span class="text-danger">*</span></label>
                            <input type="date" className="form-control" placeholder="Select Date"
                             value={date} onChange={(event) =>
                              {
                                setDate(event.target.value);      
                              }}/>
                        </div>

                        <div class="mb-3 col-md-6">
                        <label>Status<span className="text-danger">*</span></label>
                        <select
                            name="Status"
                            className="form-control"
                            value={status} onChange={(event) =>
                              {
                                setStatus(event.target.value);      
                              }}
                            
                        >
                            <option value="">Select Status</option>
                            <option value="Pending">Penging</option>
                            <option value="Done">Done</option>
                            <option value="Start">Start</option>
                        </select>
                        
                        </div>

                        <div class="col-md-12">
                           <button className="btn btn-primary float-end" style={{marginRight:"10px"}}onClick={save}>Save</button>
                           <button className="btn btn-primary float-end" style={{marginRight:"10px"}}onClick={update}>Update</button>
                           <button className="btn btn-primary float-end" style={{marginRight:"10px"}}>Reset</button>
                        </div>
                    </div>
                </form>
               
            </div>
        </div>
      </div>
      <br />
      <div className="table-responsive">
        <div className="scrollable">
        <table className="table table-striped table-hover">
          
          <thead>
            <tr>
              <th scope="col">Task ID</th>
              <th scope="col">Employee Id</th>
              <th scope="col">Task</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
              
            </tr>
          </thead>
          {tasks.map(function fn(task)
       {
            return(
            <tbody>
                <tr>
                <th scope="row">{task.id} </th>
                <td>{task.empid}</td>
                <td>{task.taskname}</td>
                <td>{task.date}</td>
                <td>{task.status}</td>        
                <td>
                    <button type="button" class="btn btn-warning"  onClick={() => editTask(task)} style={{marginRight:"10px"}}><i class="bi bi-pencil"> </i>Edit</button>  
                    <button type="button" class="btn btn-danger" onClick={() => deletetask(task.id)}style={{marginRight:"10px"}}><i class="bi bi-trash"></i>Delete</button>
                </td>
                </tr>
            </tbody>
            );
          })}
        </table>
        
      </div>
      </div>
  
    </div>
      </main>
    </>
  );
}

export default DailyTasks;
