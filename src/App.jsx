import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Achievements from "./pages/Achievements";

import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";

function App() {

  return (

    <Router>
      <ScrollToTop />

      <Routes>

        {/* PUBLIC */}

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/projects"
          element={
            <>
              <Navbar />
              <Projects />
            </>
          }
        />

        <Route
          path="/blog"
          element={
            <>
              <Navbar />
              <Blog />
            </>
          }
        />

        <Route
          path="/blog/:blogId"
          element={
            <>
              <Navbar />
              <Blog />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />

        <Route
          path="/achievements"
          element={
            <>
              <Navbar />
              <Achievements />
            </>
          }
        />

        {/* ADMIN */}

        <Route
          path="/adminlogin"
          element={<Login />}
        />

        <Route
          path="/admilogin"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>Page not found.</div>}
        />

      </Routes>

    </Router>

  );

}

export default App;