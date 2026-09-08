import { useEffect, useState } from "react";
import axios from "axios";

const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/newsletter`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );

        setSubscribers(response.data);
      } catch (err) {
        console.error("Failed to load subscribers:", err);
        setError(
          err.response?.data?.message ||
            "Unable to load subscribers right now."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <div className="projects-header">
        <p>ADMIN PANEL</p>
        <h1>Subscribers</h1>
        <span>People who subscribed through the newsletter or blog comments.</span>
      </div>

      <h3 style={{ marginBottom: "30px" }}>
        Total Subscribers ({subscribers.length})
      </h3>

      {loading ? (
        <h3>Loading subscribers...</h3>
      ) : error ? (
        <p className="comment-error">{error}</p>
      ) : subscribers.length === 0 ? (
        <h3>No subscribers found.</h3>
      ) : (
        <div
          style={{
            overflowX: "auto",
            background: "#111827",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "16px",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={cellStyle}>Email</th>
                <th style={cellStyle}>Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber._id}>
                  <td style={cellStyle}>{subscriber.email}</td>
                  <td style={cellStyle}>
                    {new Date(subscriber.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const cellStyle = {
  padding: "18px 20px",
  borderBottom: "1px solid rgba(255,255,255,.08)",
  textAlign: "left",
};

export default NewsletterManager;