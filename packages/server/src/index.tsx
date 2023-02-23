import express from "express";
import * as path from "node:path";
import { h, template, render } from "lausanne";
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
  // response.send(render(template({ title: "Adam", app: <App /> })));
  response.send(render(<App />));
});

app.use("/vendor", express.static(vendor));
app.use(express.static(root));

app.listen(3000);
