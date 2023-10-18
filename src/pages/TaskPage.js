import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "../redux/actions";
import TaskFormModal from "./TaskFormModal";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
const TasksPage = () => {
  const dispatch = useDispatch();
  const taskss = useSelector((state) => state.tasks);
  const projects = useSelector((state) => state.projects);
  const [showModal, setShowModal] = useState(false);

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:4000/tasks");
    const json = await response.json();

    if (response.ok) {
      setTasks(json);
    }
    console.log(json);
  };

  const handleAddTask = (task) => {
    dispatch(addTask(task));
    setShowModal(false);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
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
          New Task
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

            <th scope="col" className="align-middle text-muted">
              Starting Date
            </th>
            <th scope="col" className="align-middle text-muted ">
              Ending Date
            </th>
            <th scope="col" className="align-middle text-muted ">
              project
            </th>
            <th scope="col" className="align-middle text-muted">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.label}</td>
                <td>{task.description}</td>
                <td>{task.starting_date}</td>
                <td>{task.ending_date}</td>
                <td>{task._id}</td>
                <td>
                  <IconButton aria-label="update" color="secondary">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteTask(task.id)}
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
        <TaskFormModal
          projects={projects}
          onAddTask={handleAddTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TasksPage;
