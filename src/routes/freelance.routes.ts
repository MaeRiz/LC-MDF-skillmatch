import { Router } from "express";
import {
	applyForProject,
	createFreelance,
	getFreelanceById,
	getFreelanceProjectsCompatibilty,
	getFreelances,
} from "../controllers/freelance.controller";

const router = Router();

router.post("/", createFreelance);
router.get("/", getFreelances);
router.get("/:id", getFreelanceById);
router.get("/:id/projets-compatibles", getFreelanceProjectsCompatibilty);
router.post("/:id/postuler/:projectId", applyForProject);

export { router as FreelanceRouter };
