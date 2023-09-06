export const SliceTextExtensionFile = (text, length = 7) => {
	const ext = text.split(".").pop();
	const textreduce = text.slice(0, length);
	return `${textreduce}[...].${ext}`;
};

export const SliceText = ({ text, length = 7 }) => {
	const textreduce = text.slice(0, length);
	return `${textreduce}[...]`;
};

export const SlugText = ({ text }) => {
	const REGEXP = /[\W]/g;
	let slug = text.trim().split(" ");
	for (let i = 0; i < slug.length; i++) slug[i] = slug[i].replace(REGEXP, "");
	slug = slug.filter((ele) => ele !== "");
	slug = slug.join("-");
	return slug;
};

/**
 * Funciona para quitar signos de acentuacion de las palabras escritas por el usuario.
 * @param {string} texto Texto a quitar acentos.
 * @returns Texto si los acentos.
 */
export const EliminarAcentos = (texto) =>
	texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
