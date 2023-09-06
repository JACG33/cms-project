import { Op } from "sequelize";
import { ValidatePost } from "../helpers/validate.post.js";
import { Posts } from "../models/Posts.js";
import { PostCategories } from "../models/PostsCategories.js";

const GetPosts = async (req, res) => {
	try {
		await Posts.sync();
		const getPosts = await Posts.findAll({ order: [["updatedAt", "DESC"]] });
		console.log(getPosts.length);
		if (getPosts.length === 0)
			return res
				.status(200)
				.json({ message: "Sin posts", status: 204, data: null });
		res.status(200).json({ message: "Posts", status: 200, data: getPosts });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal error", status: 500 });
	}
};

const GetPost = async (req, res) => {
	const { id } = req.params;
	try {
		const getPost = await Posts.findOne({
			where: {
				[Op.or]: {
					id: id,
					slug: id,
				},
			},
		});
		if (!getPost.dataValues)
			return res
				.status(404)
				.json({ message: "El post no existe", status: 404, data: null });
		res
			.status(200)
			.json({ message: "Post", status: 200, data: getPost.dataValues });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal error", status: 500 });
	}
};

const GetPostByCategorie = async (req, res) => {
	const { id } = req.params;
	try {
		const postCategorie = await PostCategories.findOne({
			where: {
				name: id,
			},
		});
		const red = await Posts.findAll({
			order: [["updatedAt", "DESC"]],
			where: {
				id: { [Op.in]: JSON.parse(postCategorie.dataValues.posts) },
			},
		});
		res.status(200).json({ message: "Posts", status: 200, data: red });
	} catch (error) {
		res.json(error);
	}
};

const handlePostCat = async ({ name, postID, type = "add" }) => {
	try {
		await PostCategories.sync();
		const postCate = await PostCategories.findOne({
			where: {
				name,
			},
		});
		if (type === "add") {
			if (!postCate) {
				const create = await PostCategories.create({
					name,
					posts: JSON.stringify([postID]),
				});
			} else {
				const tmp = JSON.parse(postCate.dataValues.posts);
				tmp.push(postID);
				console.log({ tmp });
				const update = await PostCategories.update(
					{
						name,
						posts: JSON.stringify(tmp),
					},
					{
						where: { name },
					},
				);
			}
		}
		if (type === "remove") {
			const tmp = JSON.parse(postCate.dataValues.posts);
			const tmp2 = tmp.filter((ele) => ele !== postID);
			const update = await PostCategories.update(
				{
					name,
					posts: JSON.stringify(tmp2),
				},
				{
					where: { name },
				},
			);
		}
	} catch (error) {}
};

const CreatePost = async (req, res) => {
	const resul = ValidatePost(req.body);
	if (resul.error)
		return res
			.status(400)
			.json({ message: JSON.parse(resul.error.message), status: 400 });
	try {
		const create = await Posts.create(resul.data);

		const categories = JSON.parse(resul.data.categories);

		if (!create.dataValues)
			return res.status(500).json({
				message: "Error al crear nuevo registro",
				status: 500,
				data: null,
			});
		Object.values(categories).forEach((ele) => {
			handlePostCat({ name: ele, postID: create.dataValues.id });
		});

		res.status(201).json({ message: "Post Creado", status: 201, data: null });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal error", status: 500 });
	}
};

const UpdatePost = async (req, res) => {
	const { id } = req.body;
	const resul = ValidatePost(req.body);
	if (resul.error)
		return res
			.status(400)
			.json({ message: JSON.parse(resul.error.message), status: 400 });
	try {
		const findPost = await Posts.findOne({
			where: {
				id,
			},
		});
		const update = await Posts.update(resul.data, { where: { id: id } });

		if (update.length === 0)
			return res.status(500).json({
				message: "Error al actualizar el registro",
				status: 500,
				data: null,
			});

		if (resul.data.categories === "{}") {
			const cat = Object.values(JSON.parse(findPost.dataValues.categories));
			for (let i = 0; i < cat.length; i++) {
				handlePostCat({ name: cat[i], postID: id, type: "remove" });
			}
		} else {
			const cat = Object.values(JSON.parse(resul.data.categories));
			const cat2 = Object.values(JSON.parse(findPost.dataValues.categories));
			for (let i = 0; i < cat.length; i++) {
				if (!findPost.dataValues.categories.includes(cat[i]))
					handlePostCat({ name: cat[i], postID: id });
			}
			for (let i = 0; i < cat2.length; i++) {
				if (!resul.data.categories.includes(cat2[i]))
					handlePostCat({ name: cat2[i], postID: id, type: "remove" });
			}
		}
		res
			.status(201)
			.json({ message: "Post actualizado", status: 201, data: null });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal error", status: 500 });
	}
};

const DeletePost = async (req, res) => {
	const { id } = req.params;
	try {
		const findPost = await Posts.findOne({
			where: {
				id: id,
			},
		});
		const delte = await Posts.destroy({
			where: {
				id: id,
			},
		});
		if (delte !== 1)
			return res
				.status(401)
				.json({ message: "Error en la peticion", status: 401, data: null });

		if (findPost.dataValues.categories) {
			const categories = JSON.parse(findPost.dataValues.categories);
			Object.values(categories).forEach((ele) => {
				handlePostCat({ name: ele, postID: id, type: "remove" });
			});
		}
		res
			.status(200)
			.json({ message: "Post eliminado", status: 200, data: null });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal error", status: 500 });
	}
};

export {
	CreatePost,
	DeletePost,
	GetPost,
	GetPostByCategorie,
	GetPosts,
	UpdatePost
};

