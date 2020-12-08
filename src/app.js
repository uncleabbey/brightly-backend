import cors from "cors";
import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import morgan from "morgan";
import routes from "./routes";
import errorResponse from "./helpers/errorResponse";
import { connectDatabase } from "./models/index";
import getDb from "./helpers/getDb";
import { cloudinaryConfig } from "./middlewares/cloudinary";

config();

// initialize app
const app = express();

const port = process.env.PORT || 3000;

// database
const dbUrl = getDb(process.env.NODE_ENV);
connectDatabase(dbUrl);

// middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
/* istanbul ignore if */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}
app.use("*", cloudinaryConfig);
// routes
app.use(routes);

// handling errors
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    error: "404 Page Not Found",
  });
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  return errorResponse(res, error);
});

// server
app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`Server is Listening at port ${port}`)
);

export default app;
