/*
  Warnings:

  - A unique constraint covering the columns `[nom]` on the table `Entreprise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Freelance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Entreprise_nom_key" ON "Entreprise"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Freelance_email_key" ON "Freelance"("email");
