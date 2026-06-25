import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { cafeRouter } from "./routes/cafe.routes.js";
export const app = express();
const port = 3000;

app.use(express.json());

app.use("/v1/cafes", cafeRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ status: "fail", message: err.message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
