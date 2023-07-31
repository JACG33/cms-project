import { Op } from "sequelize";
import { Posts } from "../models/Posts.js";

const GetPosts = async (req, res) => {
  try {
    await Posts.sync();
    const getPosts = await Posts.findAll();
    if (getPosts.length == 0)
      return res
        .status(204)
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

const CreatePost = async (req, res) => {
  const { title, slug, descrip, excerpt, img, statuspost } = req.body;
  try {
    const create = await Posts.create({
      title,
      slug,
      descrip,
      excerpt,
      img,
      statuspost,
    });

    if (!create.dataValues)
      return res
        .status(500)
        .json({ message: "Error al crear nuevo registro", status: 500, data: null });
    res.status(201).json({ message: "Post Creado", status: 201, data: null });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error", status: 500 });
  }
};

const UpdatePost = async (req, res) => {
  const { id, title, slug, descrip, excerpt, img, statuspost } = req.body;
  try {
    const update = await Posts.update(
      {
        title,
        slug,
        descrip,
        excerpt,
        img,
        statuspost,
      },
      { where: { id: id } }
    );

    if (update.length == 0)
      return res
        .status(500)
        .json({ message: "Error al actualizar el registro", status: 500, data: null });
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
    const delte = await Posts.destroy({
      where: {
        id: id,
      },
    });
    if (delte != 1)
      return res
        .status(401)
        .json({ message: "Error en la peticion", status: 401, data: null });
    res
      .status(200)
      .json({ message: "Post eliminado", status: 200, data: null });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error", status: 500 });
  }
};

export { GetPosts, GetPost, CreatePost, UpdatePost, DeletePost };
