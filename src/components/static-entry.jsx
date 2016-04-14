import React from "react";
import { render } from "react-dom";
import { Router, RouterContext, match, useRouterHistory } from "react-router";
import { createHistory, createMemoryHistory } from 'history';
import createBrowserHistory from "history/lib/createBrowserHistory";
import useScroll from "scroll-behavior/lib/useStandardScroll";
import { renderToString } from "react-dom/server";
const routing = { base: "/open-source/victory/" };

import App from "./app";
import Index from "../../templates/index.hbs";
import routes from "../routes";
import staticRoutes from "../../static-routes.js";

// ----------------------------------------------------------------------------
// With `static-site-generator-webpack-plugin`, the same bundle is responsible for
// both 1.) telling the plugin what to render to HTML and
// 2.) running the app on the client side. In other words, this entry point
// the roles of `server/index` and `client/app`.
// ----------------------------------------------------------------------------

// Client render (optional):
if (typeof document !== "undefined") {
  const appHistory = useScroll(useRouterHistory(createBrowserHistory))();
  render(
    <Router
      history={appHistory}
      routes={routes}
    />,
    document.getElementById("content")
  );
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(null, Index({
      content: renderToString(<RouterContext {...renderProps} />),
      bundleJs: locals.assets.main,
      baseHref: routing.base
    }));
  });
};
