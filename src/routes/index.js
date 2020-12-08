import { Router } from "express";
import { join } from "path";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../../swaggerDoc.json";
import user from "./user";

// initialize router
const router = new Router();

// root route, entry point of the api
router.route("/").get((req, res) => {
  res.set("Content-Type", "text/html");
  res.sendFile(join(__dirname, "../../public/index.html"));
});

// swagger docs
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// other routes goes here
router.use("/api/v1/auth", user);

export default router;
