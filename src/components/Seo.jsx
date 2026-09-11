import { Helmet } from "react-helmet-async";

const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://telewarrbbies.com").replace(/\/$/, "");
const DEFAULT_IMAGE = "/Blue_and_Purple_Modern_Technology_Logo__1_-removebg-preview.png";
const DEFAULT_TITLE = "Telewarrbbies | Creative Developer, Designer & Storyteller";
const DEFAULT_DESCRIPTION =
  "Creative portfolio showcasing web development, graphic design, branding, cinematic visuals, storytelling, and immersive digital experiences.";

const Seo = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  keywords = "web developer, creative developer, designer, portfolio, brand strategy, graphic design, video editing, storytelling, React, frontend development",
  author = "Telewarrbbies",
  siteName = "Telewarrbbies",
  publishedTime,
  modifiedTime,
}) => {
  const canonicalUrl = `${SITE_URL}${path}`;
  const imagePath = image || DEFAULT_IMAGE;
  const imageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${SITE_URL}${imagePath}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebSite",
    "@id": canonicalUrl,
    name: title,
    headline: title,
    description,
    url: canonicalUrl,
    image: imageUrl,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${DEFAULT_IMAGE}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
    keywords,
    ...(type === "website"
      ? {
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }
      : {}),
  };

  const schemaJson = JSON.stringify(schema);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="en" />
      <meta name="theme-color" content="#050505" />
      <meta name="color-scheme" content="dark light" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@telewarrbbies" />
      <meta name="twitter:creator" content="@telewarrbbies" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
    </Helmet>
  );
};

export default Seo;
