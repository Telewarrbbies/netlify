import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";

const Hero = () => {

  // Smooth Scroll Function
  const scrollToStory = () => {
    const storySection = document.getElementById("mystory");
    if (storySection) {
      storySection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section className="hero">

      {/* Background Image */}
      <div className="hero-bg">
        <img src={profile} alt="Creative Developer Potrait" />
      </div>

      {/* Text Content */}
      <motion.div
        className="hero-content"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>
          Hi, I’m <span>TeleWarrbbies</span>
        </h1>

        <h2>Creative Full-Stack Developer & Designer</h2>

        <p>
          Building modern web experiences, visual designs,
          and cinematic digital content.
        </p>

        <div className="hero-buttons">
          <button 
            className="btn-primary"
            onClick={scrollToStory}
          >
            My Story
          </button>

          <Link to="/contact" className="btn-outline">
            Contact Me
          </Link>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;