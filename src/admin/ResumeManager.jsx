import { useEffect, useRef, useState } from "react";

const ResumeManager = () => {
  const [resume, setResume] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  /* ================= LOAD CURRENT RESUME ================= */

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/resume`
      );

      if (!response.ok) {
        setResume(null);
        return;
      }

      const data = await response.json();

      setResume(data);

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= SELECT FILE ================= */

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
  };

  /* ================= UPLOAD RESUME ================= */

  const uploadResume = async () => {

    if (!selectedFile) {
      alert("Please select a PDF.");
      return;
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("adminToken");

      const formData = new FormData();

      formData.append("resume", selectedFile);
      formData.append("title", "My Resume");
      formData.append("description", "Latest Resume");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/resume`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      alert("Resume uploaded successfully.");

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      fetchResume();

    } catch (err) {

      console.log(err);

      alert("Upload failed.");

    }

    setLoading(false);

  };

  return (

    <div>

      <h2>Resume Manager</h2>

      {/* ================= CURRENT RESUME ================= */}

      <div
        className="story-card"
        style={{
          padding: "30px",
          marginTop: "20px",
        }}
      >

        <h3>Current Resume</h3>

        {resume ? (
          <>

            <p>
              File:
              <strong> {resume.title}</strong>
            </p>

            <p>
              Last Updated:
              <strong>
                {" "}
                {new Date(
                  resume.uploadedAt
                ).toLocaleDateString()}
              </strong>
            </p>

<a
  href={`${import.meta.env.VITE_API_URL}${resume.file}`}
  target="_blank"
  rel="noreferrer"
  download
>
  Download Resume
</a>

          </>
        ) : (
          <p>No resume uploaded yet.</p>
        )}

      </div>

      {/* ================= UPLOAD ================= */}

      <div
        className="story-card"
        style={{
          padding: "30px",
          marginTop: "20px",
        }}
      >

        <h3>Upload New Resume</h3>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />

        <br />

        <button
          style={{
            marginTop: "20px",
          }}
          disabled={loading}
          onClick={uploadResume}
        >
          {loading
            ? "Uploading..."
            : "Upload Resume"}
        </button>

      </div>

    </div>

  );
};

export default ResumeManager;