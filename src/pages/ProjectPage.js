import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate as UseNavigate } from "react-router-dom";
import { addProject, deleteProject, updateProject } from "../redux/actions";
import ProjectFormModal from "./ProjectFormModal";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
import Button from "@mui/material/Button";
const ProjectsPage = () => {
  const [show, setShow] = useState(false);
  const [project, setProject] = useState("");
 
  const handelproject =async () => {
   await axios
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

  const handleDeleteClick = async (_id) => {
    console.log(_id);
    try {
      await axios.delete(`http://localhost:4000/projects/${_id}`)
      .then((response) => {
        handelproject();
      })
     
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateClick = (_id) => {
    console.log(_id);
    
    navigate(`/projects/${_id}`, ProjectFormModal);
  };
  const handleSaveModal = (data) => {
    // Effectuer des actions avec les données enregistrées
    console.log(data);
  };  const navigate = UseNavigate();
  const [projects, setProjets] = useState([]);
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    const response = await fetch("http://localhost:4000/projects");
    const json = await response.json();

    if (response.ok) {
      setProjets(json);
    }
    console.log(json);
  };
  const dispatch = useDispatch();
  const projectss = useSelector((state) => state.projectss);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleAddProject = (project) => {
    dispatch(addProject(project));
    setShowModal(false);
  };

  const handleDeleteProject = (projectId) => {
    dispatch(deleteProject(projectId));
  };
  const handleEditProject = (projectId) => {
    const projectToEdit = projectss.find((project) => project.id === projectId);

    if (projectToEdit) {
      setEditingProject(projectToEdit);
      setShowModal(true);
    }
  };

  const handleUpdateProject = (updatedProject) => {
    // Dispatch an action to update the project using the updated project data
    // For example, assuming you have an "updateProject" action creator:
    dispatch(updateProject(updatedProject));
    setShowModal(false);
    setEditingProject(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-sm"
          style={{ color: "#800080", borderColor: "#800080" }}
          startIcon={<AddIcon />}
          onClick={() => setShowModal(true)}
        >
          <AddIcon />
          New Project
        </button>
      </div>

      <table className="table table-hover align-middle">
        <thead className="text-muted">
          <tr>
            <th scope="col" className="align-middle  text-muted">
              Label
            </th>
            <th scope="col" className="align-middle text-muted">
              Description
            </th>
            <th scope="col" className="align-middle text-muted ">
              Status
            </th>
            <th scope="col" className="align-middle text-muted">
              Starting Date
            </th>
            <th scope="col" className="align-middle text-muted ">
              Ending Date
            </th>
            <th scope="col" className="align-middle text-muted">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="">
          {projects &&
            projects.map((project) => (
              <tr key={project.id}>
                <td className="align-middle ">{project.label}</td>
                <td className="align-middle ">{project.description}</td>
                <td className="align-middle ">{project.status}</td>
                <td className="align-middle ">{project.starting_date}</td>
                <td className="align-middle ">{project.ending_date}</td>
                <td>
                  <IconButton
                    onClick={() => handleUpdateClick(project._id)}
                    aria-label="update"
                    color="secondary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(project._id)}
                    aria-label="delete"
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showModal && (
        <ProjectFormModal
          project={editingProject}
          onAddProject={handleAddProject}
          onUpdateProject={handleUpdateProject}
          onClose={() => {
            setShowModal(false);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
};

const Modal = ({ onClose, onSave }) => {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [endedAt, setEndedAt] = useState("");

  const handleSave = () => {
    // Enregistrer les données dans la base de données ou effectuer d'autres actions
    onSave({
      label,
      description,
      startedAt,
      endedAt,
    });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Modal Title</h2>
        <label>
          Label:
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Started At:
          <input
            type="date"
            value={startedAt}
            onChange={(e) => setStartedAt(e.target.value)}
          />
        </label>
        <label>
          Ended At:
          <input
            type="date"
            value={endedAt}
            onChange={(e) => setEndedAt(e.target.value)}
          />
        </label>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ProjectsPage;
