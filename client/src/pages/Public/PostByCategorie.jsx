import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../components/Post/PostCard";
import { API_URL } from "../../config/constans";
import { SliceText } from "../../helpers/strings";

const PostByCategorie = () => {
	const [posts, setPosts] = useState([]);
	const { name } = useParams();
	useEffect(() => {
		fetch(`${API_URL}postbycategorie/${name}`)
			.then((res) => res.json())
			.then((res) => (res.message === "Sin posts" ? "" : setPosts(res.data)));
	}, []);
	return (
		<div className="posts__wrapper">
			{posts?.length > 0 ? (
				posts.map((post) => (
					<PostCard
						key={post.id}
						title={SliceText({ text: post.title, length: 15 })}
						excerpt={post.excerpt}
						imgsrc={post.img}
						id={post.id}
						slug={post.slug}
						categories={
							post.categories !== ""
								? Object.values(JSON.parse(post.categories))
								: ""
						}
					/>
				))
			) : (
				<PostCard
					title={"Sin Post aun, o ne se pudieron cargar"}
					excerpt={"😢 😢 😢"}
				/>
			)}
		</div>
	);
};

export default PostByCategorie;
