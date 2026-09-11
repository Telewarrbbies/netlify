import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import Footer from "../components/Footer";

const Achievements = () => {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/resume`
      );

      if (!response.ok) return;

      const data = await response.json();

      setResume(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Seo
        title="Achievements & Journey | Telewarrbbies"
        description="Explore my professional journey, certifications, achievements, testimonials, and creative milestones."
        path="/achievements"
        keywords="achievement, journey, developer profile, portfolio milestones, creative career, certifications, testimonials, design experience"
      />

      <section className="projects-page">

        {/* HEADER */}

        <div className="projects-header">

          <p>MY JOURNEY</p>

          <h1>Achievements</h1>

          <span>
            Every project, every lesson learned and every milestone has helped
            shape my journey as a developer and creative professional.
          </span>

          <div
            style={{
              textAlign: "center",
              margin: "50px 0 60px",
            }}
          >
            {resume ? (
              <a
                href={`${import.meta.env.VITE_API_URL}${resume.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px 42px",
                  fontSize: "18px",
                  textDecoration: "none",
                  borderRadius: "50px",
                }}
              >
                📄 View Resume
              </a>
            ) : (
              <button
                className="btn-primary"
                disabled
                style={{
                  padding: "16px 42px",
                  borderRadius: "50px",
                }}
              >
                Resume Unavailable
              </button>
            )}
          </div>

        </div>

        {/* PROFESSIONAL JOURNEY */}

        <section style={{ marginBottom: "100px" }}>

          <h2
            style={{
              textAlign: "center",
              fontSize: "42px",
              marginBottom: "40px",
            }}
          >
            Professional Journey
          </h2>

          <div className="projects-grid">

            <div className="project-card">
              <div className="project-overlay">

                <p>Frontend Development</p>

                <h2>Responsive Web Design</h2>

                <p>
                  Building responsive and modern user interfaces using HTML,
                  CSS, JavaScript and React.
                </p>

              </div>
            </div>

            <div className="project-card">
              <div className="project-overlay">

                <p>Backend Development</p>

                <h2>Node & Express</h2>

                <p>
                  Developing secure REST APIs with Express, MongoDB and JWT
                  authentication.
                </p>

              </div>
            </div>

            <div className="project-card">
              <div className="project-overlay">

                <p>Creative Design</p>

                <h2>Graphics & Branding</h2>

                <p>
                  Creating flyers, logos, branding materials and digital
                  graphics for businesses and individuals.
                </p>

              </div>
            </div>

          </div>

        </section>

        {/* CERTIFICATES */}

        <section style={{ marginBottom: "100px" }}>

          <h2
            style={{
              textAlign: "center",
              fontSize: "42px",
              marginBottom: "40px",
            }}
          >
            Certifications
          </h2>

          <div className="projects-grid">

            <div className="project-card">
              <div className="project-overlay">

                <h2>Saylor Academy</h2>

                <p>Coming Soon</p>

              </div>
            </div>

            <div className="project-card">
              <div className="project-overlay">

                <h2>Udemy</h2>

                <p>Coming Soon</p>

              </div>
            </div>

            <div className="project-card">
              <div className="project-overlay">

                <h2>More Certifications</h2>

                <p>Coming Soon</p>

              </div>
            </div>

          </div>

        </section>

        {/* ACHIEVEMENTS */}

        <section style={{ marginBottom: "100px" }}>

          <h2
            style={{
              textAlign: "center",
              fontSize: "42px",
              marginBottom: "40px",
            }}
          >
            Achievements
          </h2>

          <div className="projects-grid">

            <div className="project-card">
              <div className="project-overlay">

                <h2>Coming Soon</h2>

                <p>
                  Awards, recognitions and professional milestones will appear
                  here.
                </p>

              </div>
            </div>

          </div>

        </section>

        {/* TESTIMONIALS */}

        <section>

          <h2
            style={{
              textAlign: "center",
              fontSize: "42px",
              marginBottom: "40px",
            }}
          >
            Testimonials
          </h2>

          <div className="projects-grid">

            <div className="project-card">
              <div className="project-overlay">

                <h2>Coming Soon</h2>

                <p>
                  Testimonials from clients and collaborators will be displayed
                  here.
                </p>

              </div>
            </div>

          </div>

        </section>

      </section>

      <Footer />
    </>
  );
};

export default Achievements;