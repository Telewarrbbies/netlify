import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogPreview = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSeconds, setLoadingSeconds] = useState(0);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    const timer = setInterval(() => {
      setLoadingSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");
      setLoadingSeconds(0);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/blogs`
        );
        setBlogs(response.data.slice(0, 3));
      } catch (err) {
        console.error("FAILED TO LOAD BLOG PREVIEW:", err);
        setError("The blog is taking longer than expected to load.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [retryCount]);

  const openBlog = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <section className="blog-section">
      <div className="blog-header">
        <p>LATEST THOUGHTS</p>
        <h2>From The Blog</h2>
        <span>
          Thoughts on creativity, storytelling, technology,
          visuals, and the journey behind the work.
        </span>
      </div>

      <div className="blog-grid">
        {loading ? (
          <div className="content-status" role="status">
            <span className="loader" aria-hidden="true" />
            <p>Loading blogs from the server... {loadingSeconds}s</p>
          </div>
        ) : error ? (
          <div className="content-status" role="alert">
            <p>{error}</p>
            <button type="button" className="btn-primary" onClick={() => setRetryCount((count) => count + 1)}>
              Try Again
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="content-status">
            <p>No blog posts available yet.</p>
          </div>
        ) : blogs.map((blog) => (
          <div
            className="blog-card"
            key={blog._id}
            onClick={() => openBlog(blog._id)}
            style={{ cursor: "pointer" }}
          >
            <img src={blog.featuredImage} alt={blog.title} />

            <div className="blog-overlay">
              <p>{new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>

              <button
                className="btn-primary"
                style={{ marginTop: "15px", padding: "10px 24px", fontSize: "15px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  openBlog(blog._id);
                }}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogPreview;