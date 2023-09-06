import { Link } from "react-router-dom";

const PostCardPrivate = ({
	title,
	descrip,
	imgsrc,
	id,
	excerpt,
	statuspost,
	handleDelete,
	categories = "",
}) => {
	return (
		<>
			<div className="post__card--private">
				{imgsrc && (
					<img
						src={imgsrc}
						width={100}
						height={100}
						alt={title}
						className="post__card__img"
					/>
				)}
				<div>
					<h3>{statuspost}</h3>
					<h2>{title}</h2>
					<p>{excerpt}</p>
					{categories !== "" &&
						categories.map((ele) => (
							<a href={`/postbycategorie/${ele}`} target="_blank" className="btn" rel="noreferrer" key={ele}>
								{ele}{" "}
							</a>
						))}
					{id && (
						<div className="flex gap-2 items-center justify-evenly">
							<Link className="btn btn__edit" to={`/admin/editcontenido/${id}`}>
								Editar
							</Link>

							<button
								className="btn btn__delete"
								type="button"
								onClick={() => handleDelete({ id })}
							>
								Eliminar
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default PostCardPrivate;
