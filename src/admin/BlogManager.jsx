import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Web Dev",
    featuredImage: "",
    excerpt: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    images: [],
  });

  /* ================= EDITOR ================= */

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Image,
      Youtube.configure({
        controls: true,
        nocookie: true,
        width: 640,
        height: 360,
      }),
    ],
    content: "<p>Start writing your blog post here...</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

/* ================= LOAD BLOGS ================= */

useEffect(() => {
const fetchBlogs = async () => {
try {
const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
setBlogs(res.data);
} catch (err) {
console.error("Failed to load blogs:", err);
}
};

fetchBlogs();
}, []);

/* ================= INPUT ================= */

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({
...prev,
[name]: value,
}));

if (name === "title") {
const slug = value
.toLowerCase()
.replace(/[^a-z0-9]+/g, "-")
.replace(/(^-|-$)/g, "");

setFormData((prev) => ({
...prev,
slug,
seoTitle: value,
}));
}
};

/* ================= IMAGE UPLOAD ================= */

const handleImageChange = (e) => {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;

  setFormData((prev) => ({
    ...prev,
    images: [...prev.images, ...files],
  }));
};

const handleEditorImageUpload = (event) => {
  const files = Array.from(event.target.files || []);
  if (!files.length || !editor) return;

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({
        src: reader.result,
        alt: file.name,
      }).run();
    };
    reader.readAsDataURL(file);
  });

  setFormData((prev) => ({
    ...prev,
    images: [...prev.images, ...files],
  }));

  event.target.value = "";
};

/* ================= INSERT IMAGE URL ================= */

const insertImage = () => {
  const url = prompt("Paste the image URL:");
  if (!url) return;

  editor
    ?.chain()
    .focus()
    .setImage({
      src: url,
      alt: "Blog image",
    })
    .run();
};

/* ================= INSERT YOUTUBE ================= */

const insertYoutube = () => {
  const url = prompt("Paste the YouTube URL:");
  if (!url) return;

  editor?.chain().focus().setYoutubeVideo({ src: url }).run();
};

/* ================= INSERT LINK ================= */

const insertLink = () => {
  const url = prompt("Enter the link URL:");
  if (!url) return;

  const text = prompt("What text should readers click?", "Read more");
  if (!text) return;

  editor
    ?.chain()
    .focus()
    .insertContent({
      type: "text",
      text,
      marks: [
        {
          type: "link",
          attrs: {
            href: url,
            target: "_blank",
            rel: "noopener noreferrer",
          },
        },
      ],
    })
    .run();
};

/* ================= PUBLISH BLOG ================= */

const handlePublish = async () => {
  try {
    if (!formData.title.trim() || !editor?.getText().trim()) {
      alert("Please enter a title and blog content.");
      return;
    }

    setIsPublishing(true);

    const data = new FormData();

    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("category", formData.category);
    data.append("featuredImage", formData.featuredImage);
    data.append("content", editor.getHTML());
    data.append("excerpt", formData.excerpt);
    data.append("seoTitle", formData.seoTitle);
    data.append("seoDescription", formData.seoDescription);
    data.append("seoKeywords", formData.seoKeywords);

    formData.images.forEach((image) => {
      data.append("images", image);
    });

    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("You are not logged in. Please log in again.");
      return;
    }

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/blogs`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setBlogs((prev) => [res.data, ...prev]);

    alert("Blog published successfully!");

    setFormData({
      title: "",
      slug: "",
      category: "Web Dev",
      featuredImage: "",
      excerpt: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      images: [],
    });

    editor.commands.setContent(
      "<p>Start writing your blog post here...</p>"
    );

  } catch (err) {
    console.error(
      "BLOG UPLOAD ERROR:",
      err.response?.data || err.message
    );

    alert(
      err.response?.data?.message ||
      "Blog upload failed."
    );

  } finally {
    setIsPublishing(false);
  }
};

/* ================= DELETE ================= */

const deleteBlog = async (id) => {
if (!window.confirm("Delete this blog?")) {
return;
}

try {
await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
headers: {
Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
},
});

setBlogs((prev) => prev.filter((blog) => blog._id !== id));
} catch (err) {
console.error("DELETE BLOG ERROR:", err);
alert("Failed to delete blog.");
}
};

const categories = [
"Web Dev",
"Graphic Design",
"Video Editing",
"3D",
"Career",
"Behind the Scenes",
];

return (


<div className="blog-manager">

  <div className="blog-manager-header">

    <div>
      <p className="admin-eyebrow">
        CONTENT MANAGEMENT
      </p>

      <h1>
        Blog Manager
      </h1>

      <span>
        Write, publish, and manage your articles.
      </span>
    </div>

  </div>


  <div className="blog-editor-layout">


    {/* ================= WRITING AREA ================= */}

    <main className="blog-writing-area">

      <div className="blog-card">

        <input
          className="blog-title-input"
          name="title"
          placeholder="Enter your blog title..."
          value={formData.title}
          onChange={handleChange}
        />


        <div className="blog-meta-row">

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >

            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}

          </select>


          <input
            className="slug-input"
            name="slug"
            placeholder="your-blog-slug"
            value={formData.slug}
            onChange={handleChange}
          />

        </div>

        <div className="featured-image-section">
          <label htmlFor="featuredImage">
            Featured Image URL
          </label>

          <input
            id="featuredImage"
            type="url"
            name="featuredImage"
            placeholder="https://example.com/blog-header.jpg"
            value={formData.featuredImage}
            onChange={handleChange}
          />

          {formData.featuredImage.trim() && (
            <img
              className="featured-image-preview"
              src={formData.featuredImage.trim()}
              alt="Featured blog preview"
            />
          )}
        </div>


        {/* ================= TOOLBAR ================= */}

        <div className="editor-toolbar">

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Upload local image"
          >
            🖼 Upload
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleEditorImageUpload}
          />

          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .toggleBold()
                .run()
            }
          >
            <strong>B</strong>
          </button>


          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .toggleItalic()
                .run()
            }
          >
            <em>I</em>
          </button>


          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .toggleHeading({
                  level: 1,
                })
                .run()
            }
          >
            H1
          </button>


          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .toggleHeading({
                  level: 2,
                })
                .run()
            }
          >
            H2
          </button>


          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .toggleHeading({
                  level: 3,
                })
                .run()
            }
          >
            H3
          </button>


          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .toggleBulletList()
                .run()
            }
          >
            • List
          </button>


          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
          >
            1. List
          </button>


          <button
            type="button"
            onClick={insertLink}
          >
            🔗 Link
          </button>


          <button
            type="button"
            onClick={insertImage}
          >
            🖼 Image URL
          </button>


          <button
            type="button"
            onClick={insertYoutube}
          >
            ▶ YouTube
          </button>


          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .undo()
                .run()
            }
          >
            ↶
          </button>


          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .redo()
                .run()
            }
          >
            ↷
          </button>

        </div>


        {/* ================= EDITOR ================= */}

        <div className="blog-editor-wrapper">

          <EditorContent
            editor={editor}
          />

        </div>


        {/* ================= EXCERPT ================= */}

        <div className="excerpt-section">

          <label>
            Short Description / Excerpt
          </label>

          <textarea
            name="excerpt"
            placeholder="Write a short description that will appear on blog cards and previews..."
            value={formData.excerpt}
            onChange={handleChange}
          />

        </div>

      </div>

    </main>


    {/* ================= SIDEBAR ================= */}

    <aside className="blog-sidebar">


      <div className="blog-card">

        <h3>
          Publish
        </h3>

        <button
          className="publish-button"
          onClick={handlePublish}
          disabled={isPublishing}
        >

          {isPublishing
            ? "Publishing..."
            : "Publish Blog"}

        </button>

      </div>


      <div className="blog-card">

        <h3>
          Blog Images
        </h3>

        <p>
          Upload images for this blog.
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />

        <button
          type="button"
          className="secondary-action"
          onClick={() => fileInputRef.current?.click()}
        >
          Insert image in editor
        </button>

        {formData.images.length > 0 && (

          <p>
            {formData.images.length}
            {" "}
            image(s) selected
          </p>

        )}

      </div>


      <div className="blog-card">

        <h3>
          SEO Settings
        </h3>


        <input
          name="seoTitle"
          placeholder="SEO Title"
          value={formData.seoTitle}
          onChange={handleChange}
        />


        <textarea
          name="seoDescription"
          placeholder="SEO Description"
          value={formData.seoDescription}
          onChange={handleChange}
        />


        <input
          name="seoKeywords"
          placeholder="SEO Keywords: react, web development"
          value={formData.seoKeywords}
          onChange={handleChange}
        />

      </div>

    </aside>

  </div>


  {/* ================= BLOG LIST ================= */}

  <section className="published-blogs">

    <h2>
      Published Blogs
      {" "}
      ({blogs.length})
    </h2>


    <div className="published-blog-grid">

      {blogs.map(
        (blog) => (

          <div
            className="published-blog-card"
            key={blog._id}
          >

            <div>

              <h3>
                {blog.title}
              </h3>

              <p>
                {blog.category}
              </p>

            </div>


            <button
              onClick={() =>
                deleteBlog(
                  blog._id
                )
              }
            >
              Delete
            </button>

          </div>

        )
      )}

    </div>

  </section>

</div>


);
};

export default BlogManager