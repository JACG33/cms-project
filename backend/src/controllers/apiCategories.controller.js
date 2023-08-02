import Categories from "../models/Categories.js";

const GetCategorie = async (req, res) => {
  const { id } = req.params;
  try {
    await Categories.sync();
    const getCategorie = await Categories.findOne({
      where: { id },
    });
    if (!getPost.dataValues)
      return res
        .status(204)
        .json({ message: "La categoria no existe", status: 204, data: null });
    res
      .status(200)
      .json({ message: "categoria", status: 200, data: getCategorie });
  } catch (error) {
    res.status(500).json({ message: "Internal error", status: 500 });
  }
};

const GetCategories = async (req, res) => {
  try {
    await Categories.sync();
    const getCategories = await Categories.findAll();
    if (getCategories.length == 0)
      return res
        .status(404)
        .json({ message: "Sin categorias", status: 404, data: null });
    res
      .status(200)
      .json({ message: "Categorias", status: 200, data: getCategories });
  } catch (error) {
    res.status(500).json({ message: "Internal error", status: 500 });
  }
};

const CreateCategorie = async (req, res) => {
  const { name, slug } = req.body;
  try {
    await Categories.sync();
    const createCategories = await Categories.create({
      name,
      slug,
    });
    if (!createCategories.dataValues)
      return res.status(500).json({
        message: "Error al crear nuevo registro",
        status: 500,
        data: null,
      });
    res
      .status(201)
      .json({ message: "Categoria Creada", status: 201, data: createCategories });
  } catch (error) {
    res.status(500).json({ message: "Internal error", status: 500 });
  }
};

const UpdateCategorie = async (req, res) => {
  const { id, name, slug } = req.body;
  try {
    await Categories.sync();
    const updateCategorie = await Categories.update(
      {
        name,
        slug,
      },
      { where: { id } }
    );
    if (updateCategorie.length == 0)
    return res
      .status(500)
      .json({ message: "Error al actualizar el registro", status: 500, data: null });
  res
    .status(201)
    .json({ message: "Post actualizado", status: 201, data: updateCategorie });
  } catch (error) {
    res.status(500).json({ message: "Internal error", status: 500 });
  }
};

const DeleteCategorie = async (req, res) => {
  const { id } = req.params;
  try {
    await Categories.sync();
    const deleteCategorie = await Categories.destroy({
      where: {
        id,
      },
    });

    if (deleteCategorie != 1)
      return res
        .status(401)
        .json({ message: "Error en la peticion", status: 401, data: null });
    res
      .status(200)
      .json({ message: "Categoria eliminada", status: 200, data: null });
  } catch (error) {
    res.status(500).json({ message: "Internal error", status: 500 });
  }
};

export {
  CreateCategorie, DeleteCategorie, GetCategorie,
  GetCategories, UpdateCategorie
};

