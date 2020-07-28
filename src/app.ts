import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import { router } from "./router";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(3000, () => {
  console.info("Server is established successfully!");
});
