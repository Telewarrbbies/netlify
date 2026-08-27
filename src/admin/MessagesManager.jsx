import { useEffect, useState } from "react";
import axios from "axios";

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/messages`
      );

      setMessages(response.data);
    } catch (error) {
      console.error("Error loading messages:", error);

      if (error.response) {
        console.error("Response:", error.response.data);
        console.error("Status:", error.response.status);
      }

      if (error.request) {
        console.error("Request:", error.request);
      }

      alert("Failed to load messages. Check the browser console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <div className="projects-header">
        <p>ADMIN PANEL</p>
        <h1>Messages</h1>
      </div>

      <h3 style={{ marginBottom: "30px" }}>
        Total Messages ({messages.length})
      </h3>

      {loading ? (
        <h3>Loading messages...</h3>
      ) : messages.length === 0 ? (
        <h3>No messages found.</h3>
      ) : (
        messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              background: "#111827",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: "16px",
              padding: "25px",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                marginBottom: "10px",
              }}
            >
              {msg.name}
            </h2>

            <p>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${msg.email}`}
                style={{
                  color: "#38bdf8",
                }}
              >
                {msg.email}
              </a>
            </p>

            <div
              style={{
                marginTop: "18px",
                background: "#0b1220",
                padding: "18px",
                borderRadius: "10px",
                whiteSpace: "pre-wrap",
                lineHeight: "1.7",
              }}
            >
              {msg.message}
            </div>

            <p
              style={{
                marginTop: "18px",
                color: "#9ca3af",
                fontSize: "14px",
              }}
            >
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MessagesManager;