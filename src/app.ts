import express from "express";
import { jsonApiResponseMiddleware } from "./middlewares/json-api-response.middleware";
import { FreelanceRouter } from "./routes/freelance.routes";
import { EntrepriseRouter } from "./routes/entreprise.routes";
import { ProjectRouter } from "./routes/project.route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jsonApiResponseMiddleware);

app.use("/freelances", FreelanceRouter);
app.use("/entreprises", EntrepriseRouter);
app.use("/projets", ProjectRouter);

app.listen(8000, () => console.log("✅ Server is running on port 8000"));
