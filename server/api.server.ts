import { readFileSync } from 'fs'
import register from 'react-server-dom-webpack/node-register'
import babelRegister from '@babel/register'
import ReactApp from '../src/App.server'
import React from 'react'
import express from 'express'
import compress from 'compression'
import { renderToPipeableStream } from 'react-server-dom-webpack/writer'
import path from 'path'

register();
babelRegister({
  ignore: [/[\\\/](dist|server|node_modules)[\\\/]/],
  presets: [["@babel/preset-react", { runtime: "automatic" }]],
  plugins: ["@babel/transform-modules-commonjs"],
});

const PORT = process.env.PORT || 4000;
const app = express();

app.use(compress());
app.use(express.json());

app
  .listen(PORT, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT}`);
  })
  .on("error", (error) => {
    if (error.syscall !== "listen") {
      throw error;
    }
    const isPipe = (portOrPipe) => Number.isNaN(portOrPipe);
    const bind = isPipe(PORT) ? "Pipe " + PORT : "Port " + PORT;
    switch (error.code) {
      case "EACCESS":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

const handleErrors = (fn) => {
  return async (req, res, next) => {
    try {
      return await fn(req, res);
    } catch (e) {
      next(e);
    }
  };
};

const waitForWebpack = async () => {
  while (true) {
    try {
      readFileSync(path.resolve(__dirname, "../dist/index.html"));
      return;
    } catch (err) {
      console.log(
        "Could not find webpack build output. Will retry in a second..."
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};

const renderReactTree = async (res, props) => {
  await waitForWebpack();
  const manifest = readFileSync(
    path.resolve(__dirname, "../dist/react-client-manifest.json"),
    "utf8"
  );
  const moduleMap = JSON.parse(manifest);
  const { pipe } = renderToPipeableStream(
    React.createElement(ReactApp, props),
    moduleMap
  );
  pipe(res);
};

const sendResponse = (req, res, redirectToId) => {
  const location = JSON.parse(
    req.query?.location ??
      JSON.stringify({
        selectedId: null,
        isEditing: false,
        searchText: "",
      })
  );
  if (redirectToId) {
    location.selectedId = redirectToId;
  }
  res.set("X-Location", JSON.stringify(location));
  renderReactTree(res, {
    selectedId: location.selectedId,
    isEditing: location.isEditing,
    searchText: location.searchText,
  });
};

app.get(
  "/",
  handleErrors(async (_req, res) => {
    await waitForWebpack();
    const html = readFileSync(
      path.resolve(__dirname, "../dist/index.html"),
      "utf8"
    );
    // Note: this is sending an empty HTML shell, like a client-side-only app.
    // However, the intended solution (which isn't built out yet) is to read
    // from the Server endpoint and turn its response into an HTML stream.
    res.send(html);
  })
);

app.get("/rsc", (req, res) => {
  sendResponse(req, res, null);
});



app.use(express.static("dist"));
app.use(express.static("public"));
