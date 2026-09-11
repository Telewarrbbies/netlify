import Hero from "../components/Hero";
import RecentReel from "../components/RecentReel";
import MyStory from "../components/MyStory";
import BlogPreview from "../components/BlogPreview";
import Footer from "../components/Footer";

import Seo from "../components/Seo";

const Home = () => {

  return (
    <>

      <Seo
        title="Telewarrbbies | Creative Developer, Designer & Storyteller"
        description="Creative portfolio showcasing web development, graphic design, branding, cinematic visuals, storytelling, and immersive digital experiences."
        path="/"
        keywords="Telewarrbbies, portfolio, web developer, creative developer, designer, branding, graphic design, video editing, storytelling, frontend development, React"
      />
      <Hero />

      {/* RECENT PROJECTS */}
      <RecentReel />

      {/* STORY */}
      <MyStory />

      {/* RECENT BLOGS */}
      <BlogPreview />

      <Footer />

    </>
  );
};

export default Home;