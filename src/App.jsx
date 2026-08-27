import { BrowserRouter as Router, Routes, Route }
from "react-router-dom";

import Navbar from "./components/Navbar";

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
          path="/admin"
          element={<Dashboard />}
        />

      </Routes>

    </Router>

  );

}

export default App;