import { deleteFile, resizeImg } from "../helpers/handleImg.js";
import Uploads from "../models/Uploads.js";

const CreateUpload = async (req, res) => {
  const file = req.files;
  try {
    await Uploads.sync();
    let dataToUpload = [];
    file.forEach(async (ele) => {
      const nameFile = ele.path.split("/").pop();
      let pathFile;
      let sizeFile = {};
      let typeFile;
      if (ele.mimetype.includes("image")) {
        resizeImg(ele.path, nameFile, "small", 150);
        resizeImg(ele.path, nameFile, "medium", 300);
        resizeImg(ele.path, nameFile, "large", 700);

        pathFile = `${process.env.SITE_URL}/uploads/images/${nameFile}`;
        typeFile = "image";

        sizeFile = {
          small: `${process.env.SITE_URL}/uploads/images/small-${nameFile}`,
          medium: `${process.env.SITE_URL}/uploads/images/medium-${nameFile}`,
          large: `${process.env.SITE_URL}/uploads/images/large-${nameFile}`,
          original: `${process.env.SITE_URL}/uploads/images/${nameFile}`,
        };
      }

      if (ele.mimetype.includes("pdf")) {
        pathFile = `${process.env.SITE_URL}/uploads/docs/${nameFile}`;
        typeFile = "docs";
      }

      if (ele.mimetype.includes("zip") || ele.mimetype.includes("rar")) {
        pathFile = `${process.env.SITE_URL}/uploads/zips/${nameFile}`;
        typeFile = "zips";
      }
      dataToUpload.push({
        path: pathFile,
        nameFile,
        typeFile,
        sizeFile,
      });
    });
    let upload = await Uploads.bulkCreate(dataToUpload);
    if (upload.length == 0)
      return res
        .status(500)
        .json({ message: "Error al crear nuevo registro", status: 500, data: null });
    res.status(201).json(upload);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error", status: 500 });
  }
};
const GetUploads = async (req, res) => {
  let typeGetFile = req.headers["x-type-file"];
  try {
    await Uploads.sync();
    const getUplodas = await Uploads.findAll({
      where: {
        typeFile: typeGetFile,
      },
      order: [["id", "DESC"]],
    });
    if (getUplodas.length == 0)
      return res
        .status(404)
        .json({ message: "No hay informacion", status: 404, data: null });
    res.status(200).json(getUplodas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error", status: 500 });
  }
};
const GetUpload = async (req, res) => {};

const DeleteUpload = async (req, res) => {
  const { id } = req.params;
  let typeGetFile = req.headers["x-type-file"];
  try {
    const find = await Uploads.findOne({
      where: { id: id },
    });

    if (!find.dataValues)
      return res
        .status(401)
        .json({ message: "El elemento no existe", status: 401, data: null });

    let paths;
    if (typeGetFile == "image") {
      paths = JSON.parse(find.dataValues.sizeFile);
      Object.keys(paths).forEach((path) =>
        deleteFile(paths[path].split("/").pop(), "images")
      );
    }
    if (typeGetFile == "docs") {
      paths = find.dataValues.path;
      deleteFile(paths.split("/").pop(), "docs");
    }
    if (typeGetFile == "zips") {
      paths = find.dataValues.path;
      deleteFile(paths.split("/").pop(), "zips");
    }
    const deleteUpload = await Uploads.destroy({
      where: { id: id },
    });
    res.json(deleteUpload);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error", status: 500 });
  }
};

export { CreateUpload, GetUploads, GetUpload, DeleteUpload };
