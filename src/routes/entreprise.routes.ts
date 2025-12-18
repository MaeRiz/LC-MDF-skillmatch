import { Router } from "express";
import {
	createEntreprise,
	createProjectForEntreprise,
	getEntrepriseById,
	getEntreprises,
	getProjectFreelanceCompatibility,
	getProjectsByEntrepriseId,
} from "../controllers/entreprise.controller";

const router = Router();

router.post("/", createEntreprise);
router.get("/", getEntreprises);
router.get("/:id", getEntrepriseById);

router.post("/:id/projects", createProjectForEntreprise);
router.get("/:id/projects", getProjectsByEntrepriseId);
router.get("/:id/projects/:projectId/candidats-compatibles", getProjectFreelanceCompatibility);

export { router as EntrepriseRouter };
