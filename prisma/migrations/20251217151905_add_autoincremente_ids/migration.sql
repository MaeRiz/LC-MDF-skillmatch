-- AlterTable
CREATE SEQUENCE entreprise_id_seq;
ALTER TABLE "Entreprise" ALTER COLUMN "id" SET DEFAULT nextval('entreprise_id_seq');
ALTER SEQUENCE entreprise_id_seq OWNED BY "Entreprise"."id";

-- AlterTable
CREATE SEQUENCE freelance_id_seq;
ALTER TABLE "Freelance" ALTER COLUMN "id" SET DEFAULT nextval('freelance_id_seq');
ALTER SEQUENCE freelance_id_seq OWNED BY "Freelance"."id";

-- AlterTable
CREATE SEQUENCE projet_id_seq;
ALTER TABLE "Projet" ALTER COLUMN "id" SET DEFAULT nextval('projet_id_seq');
ALTER SEQUENCE projet_id_seq OWNED BY "Projet"."id";
