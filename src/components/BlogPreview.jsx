import { useNavigate } from "react-router-dom";
import blogData from "../data/blogData";

const BlogPreview = () => {
  const navigate = useNavigate();

  const openBlog = (blogId) => {
    navigate(`/blog?id=${blogId}`);
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
        {blogData.map((blog) => (
          <div
            className="blog-card"
            key={blog.id}
            onClick={() => openBlog(blog.id)}
            style={{ cursor: "pointer" }}
          >
            <img src={blog.image} alt={blog.title} />

            <div className="blog-overlay">
              <p>{blog.date}</p>
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>

              <button 
                className="btn-primary" 
                style={{ marginTop: "15px", padding: "10px 24px", fontSize: "15px" }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent double navigation
                  openBlog(blog.id);
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