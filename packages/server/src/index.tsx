import express from "express";
import * as path from "node:path";
import { h, template, render } from "lausanne";
import App_ from "app";

const App = App_ as any;

const app = express();
const root = path.resolve("./src");
const vendor = path.resolve("..");

app.get("/", async (_, response) => {
  response.send(render(template({ app: <App /> })));
});

app.use("/client", express.static(vendor));
app.use(express.static(root));

app.listen(3000);
