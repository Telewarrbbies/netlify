import { useState, useEffect } from "react";
import axios from "axios";

import Footer from "../components/Footer";

import {
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";

import {
  FiShare2,
  FiEye,
  FiSearch,
} from "react-icons/fi";

import { IoClose } from "react-icons/io5";

import { useSearchParams } from "react-router-dom";

/* =========================================================
   REACTION BAR
========================================================= */

const ReactionBar = ({ blog, blogs, setBlogs }) => {
  const [reaction, setReaction] = useState(null);

  const likes = blog.likes || 0;
  const dislikes = blog.dislikes || 0;

  const total = likes + dislikes;

  const likePercent =
    total === 0 ? 50 : (likes / total) * 100;

  const handleLike = async (e) => {
    e.stopPropagation();

    if (reaction === "like") {
      return;
    }

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/blogs/${blog._id}/like`
      );

      setBlogs((prevBlogs) =>
        prevBlogs.map((item) =>
          item._id === blog._id
            ? { ...item, likes: res.data.likes }
            : item
        )
      );
      setReaction("like");
    } catch (err) {
      console.error("BLOG LIKE ERROR:", err);
    }
  };

  const handleDislike = async (e) => {
    e.stopPropagation();

    if (reaction === "dislike") {
      return;
    }

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/blogs/${blog._id}/dislike`
      );

      setBlogs((prevBlogs) =>
        prevBlogs.map((item) =>
          item._id === blog._id
            ? { ...item, dislikes: res.data.dislikes }
            : item
        )
      );
      setReaction("dislike");
    } catch (err) {
      console.error("BLOG DISLIKE ERROR:", err);
    }
  };

  return (
    <div className="reaction-container">

      {/* LIKE */}

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
        <span>{likes}</span>
      </button>

      {/* BAR */}

      <div className="reaction-bar">
        <div
          className="reaction-like"
          style={{
            width: `${likePercent}%`,
          }}
        />
      </div>

      {/* DISLIKE */}

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
        <span>{dislikes}</span>
      </button>

    </div>
  );
};

/* =========================================================
   MAIN BLOG COMPONENT
========================================================= */

const Blog = () => {

  const [search, setSearch] = useState("");

  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [loadingSeconds, setLoadingSeconds] = useState(0);

  const [retryCount, setRetryCount] = useState(0);

  const [selectedBlog, setSelectedBlog] = useState(null);

  const [searchParams] = useSearchParams();

  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [error, setError] = useState("");

  /* =========================================================
     LOAD BLOGS FROM BACKEND
  ========================================================= */

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

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/blogs`
        );

        console.log(
          "BLOGS FROM BACKEND:",
          res.data
        );

        setBlogs(res.data);

      } catch (err) {

        console.error(
          "FAILED TO FETCH BLOGS:",
          err.response?.data ||
            err.message
        );

        setError(
          "The blog is taking longer than expected to load."
        );

      } finally {

        setLoading(false);
      }

    };

    fetchBlogs();

  }, [retryCount]);

  /* =========================================================
     OPEN BLOG FROM URL
  ========================================================= */

  useEffect(() => {

    const blogId = searchParams.get("id");

    if (!blogId || blogs.length === 0) {
      return;
    }

    const foundBlog = blogs.find(
      (blog) => blog._id === blogId
    );

    if (foundBlog) {
      setSelectedBlog(foundBlog);
    }

  }, [searchParams, blogs]);

  /* =========================================================
     LOCK BODY WHEN MODAL IS OPEN
  ========================================================= */

  useEffect(() => {

    if (selectedBlog) {

      document.body.style.overflow = "hidden";

    } else {

      document.body.style.overflow = "auto";

    }

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [selectedBlog]);

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredBlogs = blogs.filter((blog) =>
    blog.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  /* =========================================================
     EMAIL VALIDATION
  ========================================================= */

  const validateEmail = (email) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );

  };

  /* =========================================================
     COMMENT SUBMISSION
  ========================================================= */

  const handleCommentSubmit = (e) => {

    e.preventDefault();

    if (
      !commentData.name ||
      !commentData.email ||
      !commentData.comment
    ) {

      setError(
        "All fields are required."
      );

      return;
    }

    if (
      !validateEmail(
        commentData.email
      )
    ) {

      setError(
        "Enter a valid email."
      );

      return;
    }

    setError("");

    alert("Comment Submitted!");

    setCommentData({
      name: "",
      email: "",
      comment: "",
    });

  };

  /* =========================================================
     OPEN BLOG
  ========================================================= */

  const openBlog = (blog) => {

    const updatedBlog = {
      ...blog,
      views: (blog.views || 0) + 1,
    };

    setBlogs((prevBlogs) =>
      prevBlogs.map((item) =>
        item._id === blog._id
          ? updatedBlog
          : item
      )
    );

    setSelectedBlog(updatedBlog);

  };

  /* =========================================================
     CLOSE BLOG
  ========================================================= */

  const closeBlog = () => {

    setSelectedBlog(null);

  };

  /* =========================================================
     SHARE BLOG
  ========================================================= */

  const handleShare = async () => {

    try {

      await navigator.clipboard.writeText(
        window.location.href
      );

      alert("Blog link copied!");

    } catch (err) {

      console.error(
        "SHARE ERROR:",
        err
      );

      alert(
        "Unable to copy blog link."
      );

    }

  };

  /* =========================================================
     DATE FORMATTER
  ========================================================= */

  const formatDate = (date) => {

    if (!date) {
      return "";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <section className="blog-page">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="blog-page-header">

          <p>
            CREATIVE WRITING
          </p>

          <h1>
            Blog
          </h1>

          <span>
            Thoughts, experiences,
            storytelling, creativity,
            design, and the journey
            behind the work.
          </span>

        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="blog-search">

          <FiSearch
            className="search-icon"
          />

          <input
            type="text"
            placeholder="Search blog posts..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* =================================================
            BLOG GRID
        ================================================= */}

        <div className="blog-page-grid">

          {loading ? (

            <div className="content-status" role="status">
              <span className="loader" aria-hidden="true" />
              <p>Loading blogs from the server... {loadingSeconds}s</p>
            </div>

          ) : error ? (

            <div className="content-status" role="alert">
              <p>{error}</p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setRetryCount((count) => count + 1)}
              >
                Try Again
              </button>
            </div>

          ) : filteredBlogs.length > 0 ? (

            filteredBlogs.map((blog) => (

              <div
                className="blog-page-card"
                key={blog._id}
                onClick={() =>
                  openBlog(blog)
                }
              >

                {/* IMAGE */}

                <img
                  src={
                    blog.featuredImage ||
                    "https://via.placeholder.com/800x500?text=No+Image"
                  }
                  alt={blog.title}
                />

                {/* OVERLAY */}

                <div className="blog-page-overlay">

                  <p>
                    {formatDate(
                      blog.createdAt
                    )}
                  </p>

                  <h2>
                    {blog.title}
                  </h2>

                  <span>
                    {blog.excerpt ||
                      "Read this article..."}
                  </span>

                  <ReactionBar
                    blog={blog}
                    blogs={blogs}
                    setBlogs={setBlogs}
                  />

                </div>

              </div>

            ))

          ) : (

            <div className="no-blogs">

              <h2>
                No blog posts found.
              </h2>

              <p>
                {blogs.length === 0
                  ? "There are currently no published articles."
                  : "Try a different search term."}
              </p>

            </div>

          )}

        </div>

      </section>

      {/* ===================================================
          BLOG MODAL
      =================================================== */}

      {selectedBlog && (

        <div className="blog-modal-wrapper">

          <div className="blog-modal">

            {/* CLOSE BUTTON */}

            <button
              type="button"
              className="close-modal"
              onClick={closeBlog}
            >
              <IoClose />
            </button>

            {/* FEATURED IMAGE */}

            <img
              src={
                selectedBlog.featuredImage ||
                "https://via.placeholder.com/1000x600?text=No+Image"
              }
              alt={selectedBlog.title}
              className="modal-image"
            />

            {/* MODAL CONTENT */}

            <div
              className="modal-content"
              style={{
                paddingBottom: "120px",
              }}
            >

              {/* DATE */}

              <p className="modal-date">

                {formatDate(
                  selectedBlog.createdAt
                )}

              </p>

              {/* TITLE */}

              <h1>
                {selectedBlog.title}
              </h1>

              {/* CATEGORY */}

              {selectedBlog.category && (

                <p className="modal-category">

                  {selectedBlog.category}

                </p>

              )}

              {/* BLOG CONTENT */}

              <div
                className="modal-text blog-content"
                dangerouslySetInnerHTML={{
                  __html:
                    selectedBlog.content ||
                    "<p>No content available.</p>",
                }}
              />

              {/* REACTION BAR */}

              <ReactionBar
                blog={selectedBlog}
                blogs={blogs}
                setBlogs={setBlogs}
              />

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div
                className="project-top-bar"
                style={{
                  margin: "25px 0",
                }}
              >

                {/* VIEWS */}

                <div className="views-pill viewed">

                  <FiEye />

                  <span>
                    {selectedBlog.views ||
                      0}
                  </span>

                </div>

                {/* SHARE */}

                <button
                  type="button"
                  className="share-pill"
                  onClick={
                    handleShare
                  }
                >

                  <FiShare2 />

                  <span>
                    Share
                  </span>

                </button>

              </div>

              {/* =================================================
                  COMMENTS
              ================================================= */}

              <div className="comment-box">

                <h3>
                  Leave a Comment
                </h3>

                <form
                  onSubmit={
                    handleCommentSubmit
                  }
                >

                  {/* NAME */}

                  <input
                    type="text"
                    placeholder="Your Name"
                    value={
                      commentData.name
                    }
                    onChange={(e) =>
                      setCommentData({
                        ...commentData,
                        name:
                          e.target.value,
                      })
                    }
                  />

                  {/* EMAIL */}

                  <input
                    type="email"
                    placeholder="Your Email"
                    value={
                      commentData.email
                    }
                    onChange={(e) =>
                      setCommentData({
                        ...commentData,
                        email:
                          e.target.value,
                      })
                    }
                  />

                  {/* COMMENT */}

                  <textarea
                    rows="5"
                    placeholder="Write your comment..."
                    value={
                      commentData.comment
                    }
                    onChange={(e) =>
                      setCommentData({
                        ...commentData,
                        comment:
                          e.target.value,
                      })
                    }
                  />

                  {/* ERROR */}

                  {error && (

                    <p className="comment-error">
                      {error}
                    </p>

                  )}

                  {/* SUBMIT */}

                  <button
                    type="submit"
                  >
                    Submit Comment
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      )}

      <Footer />

    </>
  );
};

export default Blog;

