
import Seo from "../components/Seo";
import { useState } from "react";
import Footer from "../components/Footer";

import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaGithub,
  FaLinkedinIn,
  FaBehance,
} from "react-icons/fa";

import { SiGmail } from "react-icons/si";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  /* ================= CONTACT FORM ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Sending your message...");

    try {
      const res = await fetch(
        `${API_URL}/api/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStatus(`✅ ${data.message}`);

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus(
          data.message ||
            "❌ Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.error("CONTACT ERROR:", err);

      setStatus(
        "❌ Failed to send message. Please try again later."
      );
    }
  };

  /* ================= NEWSLETTER ================= */

  const handleNewsletter = async (e) => {
    e.preventDefault();

    if (!newsletterEmail.trim()) return;

    setIsSubscribing(true);
    setNewsletterStatus("");

    try {
      const res = await fetch(
        `${API_URL}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: newsletterEmail,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setNewsletterStatus(`❌ ${data.message || "Subscription failed."}`);
        return;
      }

      setNewsletterStatus(`✅ ${data.message}`);
      setNewsletterEmail("");

      setTimeout(() => setNewsletterStatus(""), 4000);
    } catch (err) {
      console.error("NEWSLETTER ERROR:", err);
      setNewsletterStatus("❌ Unable to subscribe right now.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact | Telewarrbbies"
        description="Let's work together. Reach out for collaborations, creative projects, branding, and product design opportunities."
        path="/contact"
        keywords="contact, freelance developer, web design collaboration, creative projects, branding, e-commerce, app development"
      />

      <section className="contact-page">

        {/* ================= HEADER ================= */}

        <div className="projects-header contact-header">
          <p>GET IN TOUCH</p>

          <h1>Let's Collaborate</h1>

          <span>
            Have a project in mind? I'm currently
            available for new opportunities.
          </span>
        </div>

        <div className="contact-container">

          {/* ================= CONTACT FORM ================= */}

          <div className="story-card contact-card">

            <form
              onSubmit={handleSubmit}
              className="contact-form"
            >

              <input
                type="text"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                required
              />

              <input
                type="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                required
              />

              <textarea
                rows="8"
                placeholder="Tell me about your project, vision, or how we can work together..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                required
              />

              <button
                type="submit"
                className="btn-primary contact-submit"
              >
                Send Message
              </button>

              {status && (
                <p
                  className={
                    status.includes("✅")
                      ? "contact-status success"
                      : "contact-status error"
                  }
                >
                  {status}
                </p>
              )}

            </form>

          </div>

          {/* ================= NEWSLETTER ================= */}

          <div className="newsletter-section">

            <div className="story-card newsletter-card">

              <h2>
                Stay in the Loop
              </h2>

              <p>
                Get updates on new projects,
                behind-the-scenes, and creative
                insights.
              </p>

              <form
                onSubmit={handleNewsletter}
                className="newsletter-form"
              >

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) =>
                    setNewsletterEmail(e.target.value)
                  }
                  required
                />

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </button>

              </form>

              {newsletterStatus && (
                <p className="newsletter-status">
                  {newsletterStatus}
                </p>
              )}

            </div>

          </div>

          {/* ================= SOCIAL LINKS ================= */}

          <div className="contact-socials">

            <p>
              OR REACH ME ON
            </p>

            <div className="contact-social-icons">

              <a
                href="mailto:your@email.com"
                title="Gmail"
                aria-label="Gmail"
              >
                <SiGmail />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                title="Facebook"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                title="TikTok"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                title="Behance"
                aria-label="Behance"
              >
                <FaBehance />
              </a>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default Contact;