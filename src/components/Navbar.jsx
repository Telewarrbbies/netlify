import {
  House,
  LayoutGrid,
  PenSquare,
  Trophy,
  Mail
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="dock-nav">

      <NavLink to="/" className="dock-link">
        <House size={22} />
      </NavLink>

      <NavLink to="/projects" className="dock-link">
        <LayoutGrid size={22} />
      </NavLink>

      <NavLink to="/blog" className="dock-link">
        <PenSquare size={22} />
      </NavLink>

      <NavLink to="/achievements" className="dock-link">
        <Trophy size={22} />
      </NavLink>

      <NavLink to="/contact" className="dock-link">
        <Mail size={22} />
      </NavLink>

    </nav>
  );
};

export default Navbar;