import express from "express";
import { cafeRouter } from "./routes/cafe.routes.js";
const app = express();
const port = 3000;

app.use(express.json());

app.use("/v1/cafes", cafeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
