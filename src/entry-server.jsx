import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router";

import { AppRoutes } from "./App.jsx";

export const render = (url) => {
  const helmetContext = {};
  const markup = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>
  );

  return {
    markup,
    helmet: helmetContext.helmet,
  };
};