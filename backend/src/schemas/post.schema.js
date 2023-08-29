import z from "zod";

export const postSchema = z.object({
	title: z
		.string()
		.min(5, {
			message:
				"El titulo esta vacio o su contenido tiene menos de 10 caracteres",
		}),
	slug: z.string(),
	descrip: z
		.string()
		.min(32, {
			message:
				"La descripcion esta vacia o su contenido tiene menos de 20 caracteres",
		}),
	excerpt: z.string(),
	img: z
		.string({
			required_error: "El no puede ser vacio",
		})
		.url({ message: "La url no es correcta" }),
	statuspost: z.string(),
	categories: z.string(),
});
