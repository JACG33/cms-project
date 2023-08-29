import { useRef } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config/constans";

const PostCardPrivate = ({
	title,
	descrip,
	imgsrc,
	id,
	excerpt,
	statuspost,
}) => {
	const cardRef = useRef();

	const handleDelete = () => {
		fetch(`${API_URL}posts/${id}`, {
			method: "DELETE",
			headers: { "content-type": "application/json" },
		})
			.then((res) => res.json())
			.then((res) => {
				cardRef.current.remove();
				console.log(res);
			});
	};

	return (
		<div className="post__card--private" ref={cardRef}>
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
							onClick={handleDelete}
						>
							Eliminar
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default PostCardPrivate;
