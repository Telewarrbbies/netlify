import { useEffect, useState } from "react";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/projects`;

const categories = {
  "Web Development": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose",
    "Bootstrap",
    "SCSS",
    "REST API",
    "JWT",
    "Responsive Design",
    "Git",
    "GitHub",
    "Vite",
  ],

  "Graphic Design": [
    "Photoshop",
    "Illustrator",
    "CorelDRAW",
    "Canva",
    "Brand Identity",
    "Logo Design",
    "Flyer Design",
    "Social Media Design",
    "Typography",
    "Print Design",
  ],

  "Video Editing": [
    "Premiere Pro",
    "After Effects",
    "CapCut",
    "DaVinci Resolve",
    "Motion Graphics",
    "Color Grading",
    "Short-form Content",
    "YouTube Editing",
    "Instagram Reels",
    "TikTok Editing",
  ],
};

const emptyForm = {
  title: "",
  category: "",

  skills: [],

  shortDescription: "",
  fullDescription: "",

  coverImage: "",

  github: "",
  liveDemo: "",

  behance: "",
  dribbble: "",

  youtube: "",
  driveLink: "",

  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",

  featured: false,
  published: true,
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);

  /* ================= LOAD PROJECTS ================= */

  useEffect(() => {
    fetchProjects();
  }, []);

const fetchProjects = async () => {
  try {
    const res = await axios.get(API);

    console.log("PROJECTS FROM BACKEND:", res.data);

    setProjects(res.data);

  } catch (err) {

    console.error(
      "FAILED TO FETCH PROJECTS:",
      err.response?.data || err.message
    );

  }
};

  /* ================= TEXT INPUT ================= */

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* ================= CATEGORY ================= */

  const handleCategory = (e) => {

    setForm((prev) => ({
      ...prev,

      category: e.target.value,

      skills: [],
    }));
  };

  /* ================= SKILLS ================= */

  const toggleSkill = (skill) => {

    setForm((prev) => {

      const exists = prev.skills.includes(skill);

      return {

        ...prev,

        skills: exists
          ? prev.skills.filter(
              (s) => s !== skill
            )
          : [...prev.skills, skill],
      };
    });
  };

  /* ================= RESET ================= */

  const resetForm = () => {

    setEditingId(null);

    setForm(emptyForm);
  };
    /* ================= SAVE PROJECT ================= */

  const saveProject = async () => {

    if (!form.title.trim()) {
      return alert("Project title is required.");
    }

    if (!form.category) {
      return alert("Please select a category.");
    }

    if (form.skills.length === 0) {
      return alert("Please select at least one skill.");
    }

    try {

      setLoading(true);

      const payload = {

        ...form,

        seoKeywords: form.seoKeywords
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

      };

      if (editingId) {

        await axios.put(
          `${API}/${editingId}`,
          payload
        );

        alert("Project updated successfully.");

      } else {

        await axios.post(
          API,
          payload
        );

        alert("Project added successfully.");

      }

      fetchProjects();

      resetForm();

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        "Unable to save project."
      );

    } finally {

      setLoading(false);

    }

  };

  /* ================= EDIT PROJECT ================= */

  const editProject = (project) => {

    setEditingId(project._id);

    setForm({

      title: project.title || "",

      category: project.category || "",

      skills: project.skills || [],

      shortDescription:
        project.shortDescription || "",

      fullDescription:
        project.fullDescription || "",

      coverImage:
        project.coverImage || "",

      github:
        project.github || "",

      liveDemo:
        project.liveDemo || "",

      behance:
        project.behance || "",

      dribbble:
        project.dribbble || "",

      youtube:
        project.youtube || "",

      driveLink:
        project.driveLink || "",

      seoTitle:
        project.seoTitle || "",

      seoDescription:
        project.seoDescription || "",

      seoKeywords:
        Array.isArray(project.seoKeywords)
          ? project.seoKeywords.join(", ")
          : "",

      featured:
        project.featured || false,

      published:
        project.published ?? true,

    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  /* ================= DELETE ================= */

  const deleteProject = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this project?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `${API}/${id}`
      );

      fetchProjects();

      alert("Project deleted.");

    } catch (err) {

      console.error(err);

      alert("Unable to delete project.");

    }

  };

  return (
    <div className="project-manager">
      <div className="project-manager-header">
        <div>
          <p className="admin-eyebrow">WORK MANAGEMENT</p>
          <h1>{editingId ? "Edit Project" : "Projects"}</h1>
          <span>Create, update, and organize the work shown on your portfolio.</span>
        </div>
        {editingId && <span className="admin-status-badge">Editing project</span>}
      </div>

      {/* ================= FORM ================= */}

      <div className="project-editor-layout">
      <div className="admin-form project-form">

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleCategory}
        >
          <option value="">Select Category</option>

          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Skills */}

        {form.category && (
          <div className="skills-section">
            <h3>Skills Used</h3>

            <div className="skills-grid">
              {categories[form.category].map((skill) => (
                <label key={skill}>

                  <input
                    type="checkbox"
                    checked={form.skills.includes(skill)}
                    onChange={() =>
                      toggleSkill(skill)
                    }
                  />

                  {" "}
                  {skill}

                </label>
              ))}
            </div>
          </div>
        )}

        <textarea
          rows="3"
          name="shortDescription"
          placeholder="Short Description"
          value={form.shortDescription}
          onChange={handleChange}
        />

        <textarea
          rows="8"
          name="fullDescription"
          placeholder="Full Description"
          value={form.fullDescription}
          onChange={handleChange}
        />

        <input
          type="url"
          name="coverImage"
          placeholder="Cover Image URL"
          value={form.coverImage}
          onChange={handleChange}
        />

        {form.coverImage.trim() && (
          <img
            src={form.coverImage.trim()}
            alt="Project cover preview"
            style={{
              width: "100%",
              maxWidth: "420px",
              aspectRatio: "16 / 9",
              objectFit: "cover",
              borderRadius: "8px",
              marginTop: "12px",
            }}
          />
        )}

        <input
          type="text"
          name="github"
          placeholder="GitHub Link"
          value={form.github}
          onChange={handleChange}
        />

        <input
          type="text"
          name="liveDemo"
          placeholder="Live Demo"
          value={form.liveDemo}
          onChange={handleChange}
        />

        <input
          type="text"
          name="behance"
          placeholder="Behance"
          value={form.behance}
          onChange={handleChange}
        />

        <input
          type="text"
          name="dribbble"
          placeholder="Dribbble"
          value={form.dribbble}
          onChange={handleChange}
        />

        <input
          type="text"
          name="youtube"
          placeholder="YouTube"
          value={form.youtube}
          onChange={handleChange}
        />

        <input
          type="text"
          name="driveLink"
          placeholder="Google Drive"
          value={form.driveLink}
          onChange={handleChange}
        />

        <hr />

        <h2>SEO</h2>

        <input
          type="text"
          name="seoTitle"
          placeholder="SEO Title"
          value={form.seoTitle}
          onChange={handleChange}
        />

        <textarea
          rows="4"
          name="seoDescription"
          placeholder="SEO Description"
          value={form.seoDescription}
          onChange={handleChange}
        />

        <input
          type="text"
          name="seoKeywords"
          placeholder="seo keywords separated with commas"
          value={form.seoKeywords}
          onChange={handleChange}
        />

        <div className="project-toggle-row">
          <label>
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />

            Featured
          </label>

          <label>
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
            />

            Published
          </label>
        </div>

        <div className="project-form-actions">
          <button
            onClick={saveProject}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update Project"
              : "Add Project"}
          </button>

          {editingId && (
            <button onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <aside className="project-editor-aside">
        <div className="admin-info-card">
          <p className="admin-eyebrow">WORKFLOW</p>
          <h3>{editingId ? "Update this project" : "Add a project"}</h3>
          <p>Complete the details, choose the skills, then save. Published projects appear on the public portfolio.</p>
        </div>
        <div className="admin-info-card">
          <p className="admin-eyebrow">QUICK CHECK</p>
          <ul>
            <li>{form.title.trim() ? "Title added" : "Add a title"}</li>
            <li>{form.category ? "Category selected" : "Choose a category"}</li>
            <li>{form.skills.length ? `${form.skills.length} skills selected` : "Select at least one skill"}</li>
          </ul>
        </div>
      </aside>
      </div>

      {/* ================= PROJECT LIST ================= */}

      <hr style={{ margin: "60px 0" }} />

      <div className="admin-section-heading">
        <div>
          <p className="admin-eyebrow">PORTFOLIO CONTENT</p>
          <h2>Existing Projects</h2>
        </div>
        <span>{projects.length} total</span>
      </div>

      {projects.length === 0 && (
        <p>No projects yet.</p>
      )}

      {projects.map((project) => (
        <div key={project._id} className="project-list-card">
          <h3>{project.title}</h3>

          <p>{project.category}</p>

          <p>{project.shortDescription}</p>

          <div className="project-list-actions">
            <button
              onClick={() =>
                editProject(project)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                deleteProject(project._id)
              }
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsManager;