import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import AssignmentIcon from '@mui/icons-material/Assignment';
const TaskFormModal = ({ projects, onAddTask, onClose }) => {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [project, setProject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      label,
      description,
      starting_date: startingDate,
      ending_date: endingDate,
      project,
    };
    onAddTask(task);
    setLabel("");
    setDescription("");
    setStartingDate("");
    setEndingDate("");
    setProject("");
  };

  return (
    <div>
    
      
      <Modal className="shadow rounded" show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <div className="row">
            <Modal.Title className="fs-2">
              <AssignmentIcon fontSize="large" /> Add New Task
            </Modal.Title>
            <div className="">
              <span className="ml-4 text-muted fs-6">
                Fill your task attributs
              </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="text-center">
          <form onSubmit={handleSubmit}>
            <div className=" row mt-2">
              <div className="d-flex justify-content-start mt-2">
                <label>Label*</label>
              </div>
              <div className="d-flex justify-content-start ">
                <input
                  className="col rounded border border-secondary "style={{height:"140%"}}
                  type="text"
                  placeholder="write a label..."
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className=" row mt-2">
              <div className="d-flex justify-content-start mt-2">
                <label>Description*</label>
              </div>
              <div className="d-flex justify-content-start">
                <textarea  className="col rounded border border-secondary"style={{height:"160%"}}
                
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="d-flex justify-content-start mt-4">
                <label>Starting Date*</label>
              </div>
              <div className="d-flex justify-content-start ">
                <input  className="col rounded border border-secondary"style={{height:"140%"}}
                
                  type="date"
                  value={startingDate}
                  onChange={(e) => setStartingDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="d-flex justify-content-start mt-2">
                <label>Ending Date*</label>
              </div>
              <div className="d-flex justify-content-start">
                <input  className="col rounded border border-secondary "style={{height:"140%"}}
                 
                  type="date"
                  value={endingDate}
                  onChange={(e) => setEndingDate(e.target.value)}
                  required
                />
              </div>
            </div>


            <div className="row mt-2">
              <div className="d-flex justify-content-start mt-2">
                <label>Project*</label>
              </div>
              <div className="d-flex justify-content-start">
              <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            required
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.label}
              </option>
            ))}
          </select>
              </div>
            </div>

          

      
            <div className="d-flex justify-content-end mt-3">
              
              <button
                type="button"
                onClick={onClose}
                className="btn btn-sm mx-2"
                style={{ color: "#800080", borderColor: "#800080",background:"#fff" }}
              >
               Cancel
              </button>
              <button
                type="submit"
                className="btn btn-sm"
                style={{ color: "#fff", borderColor: "#800080",background:"#800080" }}
              >
                Save
                
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskFormModal;
