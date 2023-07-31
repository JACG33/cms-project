import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { unlinkSync } from "fs";
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * 
 * @param {string} originOfFile Ruta en la que se guardo la imagen subida
 * @param {string} name Nombre la imagen subida
 * @param {string} prefix Prefijo que se le asignara a
 * @param {number} size Dimencion de la imagen
 * @returns 
 */
export const resizeImg = (originOfFile,name, prefix, size = 300) =>
  sharp(originOfFile)
    .resize(size)
    .toFile(join(__dirname, `../uploads/images/${prefix}-${name}`));

/**
 * 
 * @param {string} filePath Nombre del Archivo
 * @param {string} fileFolder Nombre de la Carpeta
 */
export const deleteFile = (filePath,fileFolder) => {
  try {
    unlinkSync(join(__dirname, `../uploads/${fileFolder}/${filePath}`));
  } catch (error) {
    console.log("dele++++++++++++", error);
  }
};
