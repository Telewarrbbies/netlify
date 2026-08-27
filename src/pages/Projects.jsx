import { useState, useEffect } from "react";
import axios from "axios";

import { FiEye, FiShare2 } from "react-icons/fi";

import Footer from "../components/Footer";
import ReactionBar from "../components/ReactionBar";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [active, setActive] = useState("All");

  const filters = [
    "All",
    "Web Development",
    "Graphic Design",
    "Video Editing",
  ];

  /* ================= LOAD PROJECTS ================= */

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/projects`
      );

      console.log("PROJECTS FROM BACKEND:", res.data);

      setProjects(res.data);
    } catch (err) {
      console.error(
        "FAILED TO FETCH PROJECTS:",
        err.response?.data || err.message
      );
    }
  };

  /* ================= FILTER ================= */

  const filteredProjects =
    active === "All"
      ? projects
      : projects.filter(
          (project) => project.category === active
        );

  /* ================= BODY LOCK ================= */

  useEffect(() => {
    document.body.style.overflow = selectedProject
      ? "hidden"
      : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  /* ================= OPEN PROJECT ================= */

  const openProject = async (project) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/projects/${project._id}/view`
      );

      const updatedProject = {
        ...project,
        views: res.data.views,
      };

      setProjects((prev) =>
        prev.map((item) =>
          item._id === project._id
            ? updatedProject
            : item
        )
      );

      setSelectedProject(updatedProject);
    } catch (err) {
      console.error(
        "VIEW ERROR:",
        err.response?.data || err.message
      );

      setSelectedProject(project);
    }
  };

  /* ================= SHARE ================= */

  const handleShare = async (e, project) => {
    e.stopPropagation();

    const url = `${window.location.origin}/projects/${project.slug}`;

    try {
      await navigator.clipboard.writeText(url);

      alert("Project link copied successfully.");
    } catch (err) {
      console.error(err);
      alert("Unable to copy link.");
    }
  };

  return (
    <>
      <section className="projects-page">

        {/* ================= HEADER ================= */}

        <div className="projects-header">
          <p>CREATIVE SHOWCASE</p>

          <h1>Projects</h1>

          <span>
            A collection of web applications,
            graphic designs and creative
            experiences I've built.
          </span>
        </div>

        {/* ================= FILTER ================= */}

        <div className="project-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={
                active === filter
                  ? "filter-btn active"
                  : "filter-btn"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* ================= PROJECT GRID ================= */}

        <div className="projects-grid">

          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="project-card"
              onClick={() => openProject(project)}
            >

              <img
                src={project.coverImage}
                alt={project.title}
              />

              <div className="project-overlay">

                {/* TOP BAR */}

                <div className="project-top-bar">

                  <button
                    className="views-pill"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProject(project);
                    }}
                  >
                    <FiEye />

                    <span>
                      {project.views || 0}
                    </span>
                  </button>

                  <button
                    className="share-pill"
                    onClick={(e) =>
                      handleShare(e, project)
                    }
                  >
                    <FiShare2 />

                    <span>
                      Share
                    </span>
                  </button>

                </div>

                <p>
                  {project.category}
                </p>

                <h2>
                  {project.title}
                </h2>

                <p className="project-short-description">
                  {project.shortDescription}
                </p>

                <ReactionBar
                  project={project}
                  projects={projects}
                  setProjects={setProjects}
                />

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* ================= PROJECT MODAL ================= */}

      {selectedProject && (
        <div className="project-modal-wrapper">

          <div className="project-modal">

            <button
              className="close-project-modal"
              onClick={() =>
                setSelectedProject(null)
              }
            >
              ✕
            </button>

            <img
              src={selectedProject.coverImage}
              alt={selectedProject.title}
              className="project-modal-image"
            />

            <div className="project-modal-content">

              <p className="project-category">
                {selectedProject.category}
              </p>

              <h1>
                {selectedProject.title}
              </h1>

              <ReactionBar
                project={selectedProject}
                projects={projects}
                setProjects={setProjects}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              />

              {/* ================= SKILLS ================= */}

              {selectedProject.skills &&
                selectedProject.skills.length > 0 && (
                  <div className="project-tools">

                    {selectedProject.skills.map(
                      (skill, index) => (
                        <span key={index}>
                          {skill}
                        </span>
                      )
                    )}

                  </div>
                )}

              {/* ================= DESCRIPTION ================= */}

              <div className="project-description">
                <p>
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* ================= LINKS ================= */}

              <div className="project-links">

                {selectedProject.liveDemo && (
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>
                )}

                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}

                {selectedProject.behance && (
                  <a
                    href={selectedProject.behance}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Behance
                  </a>
                )}

                {selectedProject.dribbble && (
                  <a
                    href={selectedProject.dribbble}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Dribbble
                  </a>
                )}

                {selectedProject.youtube && (
                  <a
                    href={selectedProject.youtube}
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube
                  </a>
                )}

                {selectedProject.driveLink && (
                  <a
                    href={selectedProject.driveLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google Drive
                  </a>
                )}

              </div>

              {/* ================= MORE PROJECTS ================= */}

              <button
                className="see-more-projects"
                onClick={() =>
                  setSelectedProject(null)
                }
              >
                See More Projects
              </button>

            </div>

          </div>

        </div>
      )}

      <Footer />
    </>
  );
};

export default Projects;

