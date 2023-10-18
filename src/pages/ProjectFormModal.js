import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import FlagIcon from "@mui/icons-material/Flag";
import axios from "axios";
import { useNavigate as UseNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const ProjectFormModal = ({ onAddProject, onClose,  }) => {
  const navigate = UseNavigate();
//   const params = useParams();
//   console.log(params);
//   const { handlChange } = props;
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [project, setProject] = useState("");
  
  const handelproject = () => {
    axios
      .get("http://localhost:4000/projects/")
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    handelproject();
   
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const project = {
      label,
      description,
      status,
      starting_date: startingDate,
      ending_date: endingDate,
    };

    axios
      .post("http://localhost:4000/projects/", project)
      .then((response) => {
        console.log(response.data);
        setLabel("");
        setDescription("");
        setStatus("");
        setStartingDate("");
        setEndingDate("");

        navigate("/projects");
        handelproject();
        // handlChange();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Modal className="shadow rounded" show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <div className="row">
            <Modal.Title className="fs-2">
              <FlagIcon fontSize="large" /> Add New Project
            </Modal.Title>
            <div className="">
              <span className="ml-4 text-muted fs-6">
                Fill your project attributs
              </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="text-center">
          <form >
            <div className=" row mt-2">
              <div className="d-flex justify-content-start mt-2">
                <label>Label*</label>
              </div>
              <div className="d-flex justify-content-start ">
                <input
                  className="col rounded border border-secondary "
                  style={{ height: "140%" }}
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
                <textarea
                  className="col rounded border border-secondary"
                  style={{ height: "160%" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className=" row mt-4">
              <div className="d-flex justify-content-start mt-2">
                <label>status*</label>
              </div>
              <div className="d-flex justify-content-start ">
                <input
                  className="col rounded border border-secondary "
                  style={{ height: "140%" }}
                  type="text"
                  placeholder="write a status..."
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="d-flex justify-content-start mt-4">
                <label>Starting Date*</label>
              </div>
              <div className="d-flex justify-content-start ">
                <input
                  className="col rounded border border-secondary"
                  style={{ height: "140%" }}
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
                <input
                  className="col rounded border border-secondary "
                  style={{ height: "140%" }}
                  type="date"
                  value={endingDate}
                  onChange={(e) => setEndingDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-sm mx-2"
                style={{
                  color: "#800080",
                  borderColor: "#800080",
                  background: "#fff",
                }}
              >
                Cancel
              </button>
              <button
              onClick={handleSubmit}
                
                className="btn btn-sm"
                style={{
                  color: "#fff",
                  borderColor: "#800080",
                  background: "#800080",
                }}
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

export default ProjectFormModal;
