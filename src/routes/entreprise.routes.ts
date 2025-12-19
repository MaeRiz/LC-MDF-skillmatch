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

router.post("/:id/projets", createProjectForEntreprise);
router.get("/:id/projets", getProjectsByEntrepriseId);
router.get("/:id/projets/:projectId/candidats-compatibles", getProjectFreelanceCompatibility);

export { router as EntrepriseRouter };
