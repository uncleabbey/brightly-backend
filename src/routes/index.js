import { Router } from "express";
import { join } from "path";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../../swaggerDoc.json";
import user from "./user";
import classes from "./class";
import lesson from "./lesson";
import timetable from "./timetable";

// initialize router
const router = new Router();

// root route, entry point of the api
router.route("/").get((req, res) => {
  res.set("Content-Type", "text/html");
  res.sendFile(join(__dirname, "../../public/index.html"));
});
router.route("/api/v1").get((req, res) => {
  res.set("Content-Type", "text/html");
  res.sendFile(join(__dirname, "../../public/index.html"));
});

// swagger docs
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// other routes goes here
router.use("/api/v1/auth", user);
router.use("/api/v1", lesson);
router.use("/api/v1", timetable);
router.use("/api/v1/class", classes);

export default router;
