import { Link } from "react-router-dom";

const PostCardPrivate = ({
	title,
	descrip,
	imgsrc,
	id,
	excerpt,
	statuspost,
	handleDelete,
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
					<h2>{statuspost}</h2>
					<h1>{title}</h1>
					<p>{excerpt}</p>
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
