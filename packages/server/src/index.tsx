import express from "express";
import fs from "fs";
import path from "path";
import fmt from "string-template";
// import { render } from "lausanne";
import { renderToString, generateHydrationScript } from "solid-js/web";
import App from "app";

const app = express();

const root: string = path.resolve("./src");
const vendor = path.resolve("../app/dist");

// const options = {
//   path: process.env["DOMAIN"]
//     ? `https://${process.env["DOMAIN"]}/`
//     : "http://localhost:3000/",
//   root: path.resolve("./src"),
// };

// app.get("*", (_, response, next) => {
//   response.header("Service-Worker-Allowed", "/");
//   next();
// });

app.get("/", async (_, response) => {
  const html = fs.readFileSync(`${root}/index.html`, "utf-8");
  const todos = renderToString(() => <App />);
  response.send(fmt(html, { todos, styles: "", hydrationScript: generateHydrationScript() }));
});

app.use("/vendor", express.static(vendor));
app.use(express.static(root));

app.listen(3000);
