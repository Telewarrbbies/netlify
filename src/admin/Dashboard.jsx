import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./Sidebar";

import ProjectsManager from "./ProjectsManager";
import BlogManager from "./BlogManager";
import ResumeManager from "./ResumeManager";
import TestimonialManager from "./TestimonialManager";
import AchievementsManager from "./AchievementsManager";
import MessagesManager from "./MessagesManager";
import NewsletterManager from "./NewsletterManager";
import AnalyticsManager from "./AnalyticsManager";

const Dashboard = () => {
  const [active, setActive] = useState("Overview");
  const [overview, setOverview] = useState({
    projects: 0,
    blogs: 0,
    views: 0,
    messages: 0,
    subscribers: 0,
  });
  const [overviewLoading, setOverviewLoading] = useState(true);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const [projectsRes, blogsRes, messagesRes, subscribersRes] = await Promise.all([
          axios.get(`${apiUrl}/api/projects`),
          axios.get(`${apiUrl}/blogs`),
          axios.get(`${apiUrl}/api/messages`),
          axios.get(`${apiUrl}/api/newsletter`),
        ]);

        const projects = projectsRes.data;

        setOverview({
          projects: projects.length,
          blogs: blogsRes.data.length,
          views: projects.reduce(
            (total, project) => total + (project.views || 0),
            0
          ),
          messages: messagesRes.data.length,
          subscribers: subscribersRes.data.length,
        });
      } catch (err) {
        console.error("Failed to load dashboard overview:", err);
      } finally {
        setOverviewLoading(false);
      }
    };

    loadOverview();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Admin Dashboard | Telewarrbbies
        </title>
      </Helmet>

      <div
        className="admin-layout"
        style={{
          minHeight: "100vh",
          background: "#0f0f0f",
          display: "flex",
        }}
      >
        <Sidebar
          active={active}
          setActive={setActive}
        />

        <div
          className="admin-content"
          style={{
            flex: 1,
            padding: "40px",
          }}
        >
          <div
            className="projects-header"
            style={{
              marginBottom: "50px",
            }}
          >
            <p>ADMIN CONTROL CENTER</p>

            <h1>{active}</h1>

            <span>
              Welcome back,
              Telewarrbbies.
            </span>
          </div>

          {/* OVERVIEW */}
          {active === "Overview" && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(220px,1fr))",
                  gap: "20px",
                  marginBottom: "40px",
                }}
              >
                <div className="story-card">
                  <h3>Total Projects</h3>
                  <h1>{overviewLoading ? "..." : overview.projects}</h1>
                </div>

                <div className="story-card">
                  <h3>Total Blogs</h3>
                  <h1>{overviewLoading ? "..." : overview.blogs}</h1>
                </div>

                <div className="story-card">
                  <h3>Total Views</h3>
                  <h1>{overviewLoading ? "..." : overview.views}</h1>
                </div>

                <div className="story-card">
                  <h3>Total Subscribers</h3>
                  <h1>{overviewLoading ? "..." : overview.subscribers}</h1>
                </div>

                <div className="story-card">
                  <h3>Total Messages</h3>
                  <h1>{overviewLoading ? "..." : overview.messages}</h1>
                </div>
              </div>

              <div className="story-card">
                <h2>Recent Activity</h2>

                <p>
                  New Project Added —
                  Cinematic Portfolio v2
                </p>

                <p>
                  Blog Published —
                  Why Cinematic UI Feels
                  Different
                </p>
              </div>
            </>
          )}

          {active === "Projects" && (
            <ProjectsManager />
          )}

          {active === "Blog" && (
            <BlogManager />
          )}

          {active === "Resume" && (
            <ResumeManager />
          )}

          {active === "Achievements" && (
            <AchievementsManager />
          )}

          {active === "Messages" && (
            <MessagesManager />
          )}

          {active === "Newsletter" && (
            <NewsletterManager />
          )}

          {active === "Analytics" && (
            <AnalyticsManager />
          )}

          {active === "Testimonials" && (
            <TestimonialManager />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;