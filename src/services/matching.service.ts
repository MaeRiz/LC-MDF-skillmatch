import { Freelance, Projet } from "@prisma/client";
import { prisma } from "../orm/client";

export const getFreelancesForProject = async function (project: Projet) {
	const { skillsRequis, budgetMaxTjm, freelanceId } = project;

	const freelances = await prisma.freelance.findMany();

	return freelances.filter((freelance) => {
		if (freelance.tjm > budgetMaxTjm) return false;
		if (freelanceId) return false;

		return skillsRequis.every((projectSkill) =>
			freelance.skills.some(
				(freelanceSkill) => freelanceSkill.toLowerCase().trim() === projectSkill.toLowerCase().trim()
			)
		);
	});
};

export const getProjectsForFreelance = async function (freelance: Freelance) {
	const { skills, tjm } = freelance;

	const projects = await prisma.projet.findMany();

	return projects.filter((project) => {
		if (project.budgetMaxTjm < tjm) return false;
		if (project.freelanceId) return false;

		return project.skillsRequis.every((projectSkill) =>
			skills.some((freelanceSkill) => freelanceSkill.toLowerCase().trim() === projectSkill.toLowerCase().trim())
		);
	});
};

export const checkCompatibility = function (freelance: Freelance, project: Projet) {
	const { skills, tjm } = freelance;
	const { skillsRequis, budgetMaxTjm, freelanceId } = project;

	if (freelanceId) return { result: false, message: "Un freelance est déjà inscrit sur ce projet." };
	if (budgetMaxTjm < tjm) return { result: false, message: "Le TJM du projet est en dessous de celui du freelance." };

	return {
		result: skillsRequis.every((projectSkill) =>
			skills.some((freelanceSkill) => freelanceSkill.toLowerCase().trim() === projectSkill.toLowerCase().trim())
		),
	};
};
