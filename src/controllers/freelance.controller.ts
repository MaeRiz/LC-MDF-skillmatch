import { NextFunction, Request, Response } from "express";
import { CreateFreelanceInput } from "../dtos";
import { prisma } from "../orm/client";
import { checkCompatibility, getProjectsForFreelance } from "../services/matching.service";

export const createFreelance = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as CreateFreelanceInput;

		const existingFreelance = await prisma.freelance.findUnique({
			where: { email: body.email },
		});

		if (existingFreelance) {
			return res.jsonError(`Le freelance avec l'email ${body.email} existe déjà.`);
		}

		const freelance = await prisma.freelance.create({
			data: { ...body },
		});

		return res.jsonSuccess(freelance, 201);
	} catch (error) {
		next(error);
	}
};

export const getFreelances = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const skill = req.query.skill?.toString();
		if (skill) {
			const freelances = await prisma.freelance.findMany();
			const filteredFreelance = freelances.filter((fl) =>
				fl.skills.some((s) => s.toLowerCase().trim() === skill.toLowerCase().trim())
			);
			if (!filteredFreelance.length) {
				return res.jsonError("Il n'y a aucun freelance d'enregistré avec la compétence: " + skill);
			}
			return res.jsonSuccess(filteredFreelance);
		}
		const freelances = await prisma.freelance.findMany();
		if (!freelances.length) {
			return res.jsonError("Il n'y a aucun freelance d'enregistré.");
		}
		return res.jsonSuccess(freelances);
	} catch (error) {
		next(error);
	}
};

export const getFreelanceById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const id = Number(req.params.id);
		const freelance = await prisma.freelance.findUnique({
			where: { id },
		});

		if (!freelance) return res.jsonError(`Freelance introuvable avec l\'id: ${id}`);

		return res.jsonSuccess(freelance);
	} catch (error) {
		next(error);
	}
};

export const getFreelanceProjectsCompatibilty = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const freelance = await prisma.freelance.findUnique({
			where: { id: Number(req.params.id) },
		});

		if (!freelance) {
			return res.jsonError(`Le freelance avec l'id ${req.params.id} n'existe pas.`);
		}

		const projects = await getProjectsForFreelance(freelance);
		if (!projects.length) {
			return res.jsonError("Il n'y a aucun projet de disponible pour ce freelance.", 404);
		}

		return res.jsonSuccess(projects, 201);
	} catch (error) {
		next(error);
	}
};

export const applyForProject = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const freelance = await prisma.freelance.findUnique({
			where: { id: Number(req.params.id) },
		});

		if (!freelance) {
			return res.jsonError(`Le freelance avec l'id ${req.params.id} n'existe pas.`, 404);
		}

		const projects = await prisma.projet.findUnique({
			where: { id: Number(req.params.projectId) },
		});
		if (!projects) {
			return res.jsonError("Ce projet n'existe pas.", 404);
		}

		const { result, message } = checkCompatibility(freelance, projects);
		if (!result) return res.jsonError(message);

		const updatedProject = await prisma.projet.update({
			where: { id: Number(req.params.projectId) },
			data: { freelanceId: freelance.id },
		});

		return res.jsonSuccess(updatedProject, 201);
	} catch (error) {
		next(error);
	}
};
