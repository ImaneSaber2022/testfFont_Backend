import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import TaskPage from "./pages/TaskPage";

const App = () => {
  return (
    <Router>
      <div>
        <div className="d-flex  justify-content-center mb-5">
          <h1 style={{ color: "#800080" }}>Rubicon Coding Challenge</h1>
        </div>

        <button
          className="btn "
          style={{
            color: "#fff",
            borderColor: "#800080",
            background: "#800080",
          }}
        >
          <Link
            to="/projects"
            className="text-decoration-none"
            style={{ color: "#fff" }}
          >
            Projects
          </Link>
        </button>
        <button
          className="btn mx-3"
          style={{ borderColor: "#800080", background: "#fff" }}
        >
          <Link
            to="/tasks"
            className="text-decoration-none"
            style={{ color: "#800080" }}
          >
            Tasks
          </Link>
        </button>

        <Routes>
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/tasks" element={<TaskPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
