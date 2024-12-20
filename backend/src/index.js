import { dirname, join } from "path";
import { fileURLToPath } from "url";
// Import Dependencies
import cors from "cors";
import express from "express";
import morgan from "morgan";
import RouterApiCategories from "./routes/apiCategories.routes.js";
import RouerApiPosts from "./routes/apiPosts.routes.js";
import RouterApiUploads from "./routes/apiUploads.routes.js";


// Define Variables
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Express Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express Routes
app.use(RouerApiPosts, RouterApiUploads, RouterApiCategories);
app.use("/uploads", express.static(join(__dirname, "uploads")));
app.use(
	[
		"/admin/contenido",
		"/admin/categorias",
		"/admin/addcontenido",
		"/admin/editcontenido",
		"/admin/uploads/imagenes",
		"/admin/uploads/pdf",
		"/admin/uploads/comprimidos",
		"/admin",
		"/",
	],
	express.static(join(__dirname, "dist/")),
);

// Express Server Up
app.listen(PORT, () => {
	console.log(`Server up on port http://localhost:${PORT}`);
});
