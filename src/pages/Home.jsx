import Hero from "../components/Hero";
import RecentReel from "../components/RecentReel";
import MyStory from "../components/MyStory";
import BlogPreview from "../components/BlogPreview";
import Footer from "../components/Footer";

import { Helmet } from "react-helmet-async";

const Home = () => {

  return (
    <>

      <Helmet>

        <title>
          TeleWarrbbies | Creative Developer, Designer & Storyteller
        </title>

        <meta
          name="description"
          content="
          Creative portfolio showcasing web development,
          graphic design, cinematic visuals,
          storytelling, and immersive digital experiences.
          "
        />

      </Helmet>

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