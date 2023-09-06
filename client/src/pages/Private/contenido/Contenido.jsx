import { useEffect, useState } from "react";
import Toast from "../../../components/Notifications/Toast";
import PostCardPrivate from "../../../components/Post/PostCardPrivate";
import { API_URL } from "../../../config/constans";
import { SliceText } from "../../../helpers/strings";

const Contenido = () => {
	const [posts, setPosts] = useState([]);
	const [messageRequest, setMessageRequest] = useState({ type: "", body: [] });

	const deletePost = ({ id }) => {
		const tmp = [...posts].filter((ele) => ele.id !== id);
		setMessageRequest({
			type: "",
			body: [],
		});
		setPosts(tmp);
	};

	const handleDelete = ({ id }) => {
		fetch(`${API_URL}posts/${id}`, {
			method: "DELETE",
			headers: { "content-type": "application/json" },
		})
			.then((res) => {
				if (!res.ok) throw res.json();
				return res.json();
			})
			.then((res) => {
				deletePost({ id });
				console.log(res);
				setMessageRequest({
					type: "success",
					body: res,
				});
			})
			.catch((error) => {
				setMessageRequest({
					type: "error",
					body: error,
				});
			})
			.finally(() => {
				setTimeout(() => {
					setMessageRequest({
						type: "",
						body: [],
					});
				}, 6500);
			});
	};

	useEffect(() => {
		fetch(`${API_URL}posts`)
			.then((res) => res.json())
			.then((res) => (res.message === "Sin posts" ? "" : setPosts(res.data)));
	}, []);
	return (
		<div className="posts__wrapper">
			{messageRequest.type === "success" && (
				<Toast data={messageRequest.body} messageType={"Success"} />
			)}
			{messageRequest.type === "error" && (
				<Toast data={messageRequest.body} messageType={"Error"} />
			)}
			{posts.length > 0 ? (
				posts.map((post) => (
					<PostCardPrivate
						key={post.id}
						title={SliceText({ text: post.title, length: 15 })}
						descrip={post.descrip}
						excerpt={post.excerpt}
						imgsrc={post.img}
						id={post.id}
						statuspost={post.statuspost}
						handleDelete={handleDelete}
						categories={
							post.categories !== ""
								? Object.values(JSON.parse(post.categories))
								: ""
						}
					/>
				))
			) : (
				<PostCardPrivate
					title={"Sin Post aun, o ne se pudieron cargar"}
					excerpt={"😢 😢 😢"}
				/>
			)}
		</div>
	);
};

export default Contenido;
