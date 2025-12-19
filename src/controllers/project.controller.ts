import { NextFunction, Request, Response } from "express";
import { prisma } from "../orm/client";

export const getOpenProject = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const projects = await prisma.projet.findMany({
			where: { freelanceId: null },
		});
		if (!projects.length) {
			return res.jsonError("Il n'y a aucun projet de disponible.");
		}
		return res.jsonSuccess(projects);
	} catch (error) {
		next(error);
	}
};
