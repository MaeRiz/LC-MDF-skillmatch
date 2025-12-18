export interface CreateEntrepriseInput {
	nom: string;
	secteur: string;
}

export interface CreateProjectInput {
	titre: string;
	description: string;
	skillsRequis: [string];
	budgetMaxTjm: number;
	entrepriseId: number;
}
