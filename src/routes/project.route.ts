import { Router } from "express";
import { getOpenProject } from "../controllers/project.controller";

const router = Router();

router.get("/ouvert", getOpenProject);

export { router as ProjectRouter };
