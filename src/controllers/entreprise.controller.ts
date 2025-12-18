import { NextFunction, Request, Response } from "express";
import { CreateEntrepriseInput, CreateProjectInput } from "../dtos";
import { prisma } from "../orm/client";
import { getFreelancesForProject } from "../services/matching.service";

export const createEntreprise = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body as CreateEntrepriseInput;

		const existingEntreprise = await prisma.entreprise.findUnique({
			where: { nom: body.nom },
		});

		if (existingEntreprise) {
			return res.jsonError(`L'entreprise avec le nom ${body.nom} existe déjà.`);
		}

		const entreprise = await prisma.entreprise.create({
			data: { ...body },
		});

		return res.jsonSuccess(entreprise, 201);
	} catch (error) {
		next(error);
	}
};

export const getEntreprises = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const entreprises = await prisma.entreprise.findMany();
		if (!entreprises.length) {
			return res.jsonError("Il n'y a aucune entreprise d'enregistrée.");
		}
		return res.jsonSuccess(entreprises);
	} catch (error) {
		next(error);
	}
};

export const getEntrepriseById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const id = Number(req.params.id);
		const entreprise = await prisma.entreprise.findUnique({
			where: { id },
		});

		if (!entreprise) return res.jsonError(`Entreprise introuvable avec l\'id: ${id}`);

		return res.jsonSuccess(entreprise);
	} catch (error) {
		next(error);
	}
};

export const createProjectForEntreprise = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		const entreprise = await prisma.entreprise.findUnique({
			where: { id: id },
		});

		if (!entreprise) {
			return res.jsonError(`L'entreprise avec l'id ${id} n'existe pas.`);
		}

		const body = req.body as CreateProjectInput;
		const project = await prisma.projet.create({
			data: { ...body },
		});

		return res.jsonSuccess(project, 201);
	} catch (error) {
		next(error);
	}
};

export const getProjectsByEntrepriseId = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		const entreprise = await prisma.entreprise.findUnique({
			where: { id: id },
		});

		if (!entreprise) {
			return res.jsonError(`L'entreprise avec l'id ${id} n'existe pas.`);
		}

		const projects = await prisma.projet.findMany({
			where: { entrepriseId: entreprise.id },
		});

		return res.jsonSuccess(projects, 201);
	} catch (error) {
		next(error);
	}
};

export const getProjectFreelanceCompatibility = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const entreprise = await prisma.entreprise.findUnique({
			where: { id: Number(req.params.id) },
		});

		if (!entreprise) {
			return res.jsonError(`L'entreprise avec l'id ${req.params.id} n'existe pas.`);
		}

		const project = await prisma.projet.findUnique({
			where: { id: Number(req.params.projectId) },
		});

		if (!project) {
			return res.jsonError(`Le projet avec l'id ${req.params.projectId} n'existe pas.`);
		}

		const freelances = await getFreelancesForProject(project);
		if (!freelances.length) {
			return res.jsonError("Il n'y a aucun freelance disponible pour ce projet.", 404);
		}

		return res.jsonSuccess(freelances, 201);
	} catch (error) {
		next(error);
	}
};
