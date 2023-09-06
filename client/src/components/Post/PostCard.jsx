import { Link } from "react-router-dom";

const PostCard = ({ title, imgsrc,slug, id, excerpt, categories = "" }) => {
	return (
		<div className="post__card">
			{imgsrc && <img src={imgsrc} alt={title} className="post__card__img" />}
			<h2>{title}</h2>
			<p>{excerpt}</p>
			{categories !== "" &&
				categories.map((ele) => (
					<a
						href={`/postbycategorie/${ele}`}
						target="_blank"
						rel="noreferrer"
						key={ele}
					>
						{ele}{" "}
					</a>
				))}
			{id && (
				<div className="flex gap-2 items-center justify-evenly">
					<Link className="btn btn__edit" to={`/${slug}`}>
						Leer mas
					</Link>
				</div>
			)}
		</div>
	);
};

export default PostCard;
