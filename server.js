const express = require("express");
const fs = require("fs");
const path = require("path");
const vite = require("vite");
const PORT = process.env.PORT;

async function createServer(root = process.cwd()) {
  const resolve = (p) => path.resolve(__dirname, p);
  const app = express();

  app.get("/random", (req, res) => {
    const number = Math.floor(Math.random() * 100 + 1);
    res.send({ number });

  });

  const viteServer = await vite.createServer({
    root,
    logLevel: "error",
    server: {
      middlewareMode: true,
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 1000,
      },
    },
  });

  // use vite's connect instance as middleware
  app.use(viteServer.middlewares);

  app.use("*", async (req, res) => {
    const url = req.originalUrl;

    const template = fs.readFileSync(resolve("./index.html"), "utf-8");

    res.status(200).set({ "Content-Type": "text/html" }).end(template);
  });

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  })
);
