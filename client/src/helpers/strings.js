export const SliceTextExtensionFile = (text, length = 7) => {
	const ext = text.split(".").pop();
	const textreduce = text.slice(0, length);
	return `${textreduce}[...].${ext}`;
};

export const SliceText = ({text, length = 7}) => {
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
