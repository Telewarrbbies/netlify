import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecentReel = () => {
  const navigate = useNavigate();

  const [recentWork, setRecentWork] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRecentWork = async () => {
      try {
        const [projectsRes, blogsRes] = await Promise.all([
          axios.get(`${API_URL}/api/projects`),
          axios.get(`${API_URL}/blogs`),
        ]);

        const projects = projectsRes.data.map((project) => ({
          ...project,
          type: "project",
        }));

        const blogs = blogsRes.data.map((blog) => ({
          ...blog,
          type: "blog",
        }));

        // Combine projects and blogs
        const combined = [...projects, ...blogs];

        // Sort newest first
        combined.sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Only show the 7 most recent
        setRecentWork(combined.slice(0, 7));

      } catch (error) {
        console.error(
          "FAILED TO LOAD RECENT WORK:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecentWork();
  }, [API_URL]);

  const openItem = (item) => {
    if (item.type === "project") {
      navigate(`/projects?projectId=${item._id}`);
    } else {
      navigate(`/blog?id=${item._id}`);
    }
  };

  if (loading) {
    return (
      <section className="reel-section">
        <div className="reel-header">
          <p>RECENT WORK</p>
          <h2>Latest Updates</h2>
        </div>

        <div className="reel-container">
          <p>Loading recent work...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="reel-section">

      <div className="reel-header">
        <p>RECENT WORK</p>
        <h2>Latest Updates</h2>
      </div>

      <div className="reel-container">

        {recentWork.length === 0 ? (
          <p>No recent work available.</p>
        ) : (
          recentWork.map((item) => (

            <div
              className="reel-card"
              key={`${item.type}-${item._id}`}
              onClick={() => openItem(item)}
              style={{ cursor: "pointer" }}
            >

<img
  src={
    item.type === "project"
      ? item.coverImage || "/Blue_and_Purple_Modern_Technology_Logo_1_-removebg-preview.png"
      : item.featuredImage || "/Blue_and_Purple_Modern_Technology_Logo_1_-removebg-preview.png"
  }
  alt={item.title}
/>

              <div className="reel-overlay">

                <span className="reel-type">
                  {item.type === "project"
                    ? "PROJECT"
                    : "BLOG"}
                </span>

                <h3>{item.title}</h3>

                <p>
                  {item.category}
                </p>

              </div>

            </div>

          ))
        )}

      </div>

    </section>
  );
};

export default RecentReel;
