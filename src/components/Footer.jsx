import {
  FaWhatsapp,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-glow"></div>

      <div className="footer-content">

        <p className="footer-tag">
          LET’S CONNECT
        </p>

        <h2>
          Let’s Build Something Creative
        </h2>

        <p className="footer-text">
          Available for collaborations, creative projects,
          immersive digital experiences, and storytelling-driven work.
        </p>

        <div className="footer-icons">

          <a
            href="https://wa.me/234XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>

          <a
            href="mailto:yourmail@gmail.com"
          >
            <MdEmail />
          </a>

          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>

          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>

        </div>

        <span className="footer-copy">
          © 2026 TeleWarrbbies — Built with creativity & curiosity.
        </span>

      </div>

    </footer>
  );
};

export default Footer;