import { useState } from "react";
import axios from "axios";

import {
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";

const ReactionBar = ({
  project,
  projects,
  setProjects,
  selectedProject,
  setSelectedProject,
}) => {

  const [reaction, setReaction] = useState(null);

  /* ================= UPDATE PROJECT EVERYWHERE ================= */

  const updateProject = (updatedProject) => {

    setProjects((prevProjects) =>
      prevProjects.map((item) =>
        item._id === updatedProject._id
          ? updatedProject
          : item
      )
    );

    if (
      selectedProject &&
      selectedProject._id === updatedProject._id
    ) {

      setSelectedProject(updatedProject);

    }

  };


  /* ================= LIKE ================= */

  const handleLike = async (e) => {

    e.stopPropagation();

    try {

      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/projects/${project._id}/like`
      );

      const updatedProject = {
        ...project,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
      };

      updateProject(updatedProject);

      setReaction("like");

    } catch (err) {

      console.error(
        "LIKE ERROR:",
        err
      );

    }

  };


  /* ================= DISLIKE ================= */

  const handleDislike = async (e) => {

    e.stopPropagation();

    try {

      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/projects/${project._id}/dislike`
      );

      const updatedProject = {
        ...project,
        dislikes: res.data.dislikes,
        likes: res.data.likes,
      };

      updateProject(updatedProject);

      setReaction("dislike");

    } catch (err) {

      console.error(
        "DISLIKE ERROR:",
        err
      );

    }

  };


  const total =
    (project.likes || 0) +
    (project.dislikes || 0);

  const likePercent =
    total === 0
      ? 50
      : ((project.likes || 0) / total) * 100;


  return (

    <div className="reaction-container">

      <button
        type="button"
        className={
          reaction === "like"
            ? "reaction-icon active-like"
            : "reaction-icon"
        }
        onClick={handleLike}
      >

        <AiOutlineLike />

        <span>
          {project.likes || 0}
        </span>

      </button>


      <div className="reaction-bar">

        <div
          className="reaction-like"
          style={{
            width: `${likePercent}%`,
          }}
        />

      </div>


      <button
        type="button"
        className={
          reaction === "dislike"
            ? "reaction-icon active-dislike"
            : "reaction-icon"
        }
        onClick={handleDislike}
      >

        <AiOutlineDislike />

        <span>
          {project.dislikes || 0}
        </span>

      </button>

    </div>

  );

};

export default ReactionBar;