import { useEffect, useRef, useState } from "react";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { IMG_PlACEHOLDER, acceptedFiles } from "../../../config/constans";
import { SliceText } from "../../../helpers/strings";
import { delet, get, post } from "../../../services";
import ModalUpload from "./ModalUpload";

let filesToUpload;
let tmpFiles = [];

const Uploads = () => {
  const fileRef = useRef();
  const filesContentRef = useRef();

  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [zips, setZips] = useState([]);
  const [typeFileAccept, setTypeFileAccept] = useState(acceptedFiles);
  const [loading, setLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    if (openModal) setErrorUpload([]);
    setOpenModal(!openModal);
  };

  const handleFile = () => fileRef.current.click();

  const handleChangeFile = (e) => {
    let file = e.target.files;
    let tmpErros = [];
    filesToUpload = Array.from(file);
    if (file.length >= 1) {
      setLoading(true);
      filesToUpload.map((file) => {
        if (file.size > 1572864) {
          tmpErros.push(
            `El archivo ${file.name} supera los 1.5mb y no podra ser subido`
          );
        }
        tmpFiles.push({
          id: 0,
          path: IMG_PlACEHOLDER,
          nameFile: file.name,
          typeFile: "image",
          sizeFile: `{"small":"${URL.createObjectURL(file)}"}`,
          nameFileSlice: SliceText(file.name),
        });
      });
      if (tmpErros.length == 0) return saveFile(file, filesToUpload);
      handleError(tmpErros);
      setLoading(false);
      fileRef.current.value = null;
      tmpFiles = [];
    }
  };

  const handleError = (name) => setErrorUpload(name);

  const handleTypeFile = (ext, type) =>
    setTypeFileAccept({ accept: ext, type });

  const actionsOfModifyFiles = (action, type, id = null) => {
    if (action == "delete") {
      if (type == "image") setImages(images.filter((ele) => ele.id != id));
      if (type == "zips") setZips(zips.filter((ele) => ele.id != id));
      if (type == "docs") setPdfs(pdfs.filter((ele) => ele.id != id));
    }
    if (action == "save") {
      if (type == "image") setImages([...tmpFiles.reverse(), ...images]);
      if (type == "zips") setZips([...tmpFiles.reverse(), ...zips]);
      if (type == "docs") setPdfs([...tmpFiles.reverse(), ...pdfs]);
      tmpFiles = [];
    }
  };

  const saveFile = async (file, filesToUpload) => {
    let form = new FormData();
    form.append("file", file);

    let json = await post({ file, filesToUpload });
    tmpFiles = tmpFiles.map((ele, ind) => ({
      ...ele,
      id: json[ind].id,
      path: json[ind].path,
    }));

    actionsOfModifyFiles("save", typeFileAccept.type);
    fileRef.current.value = null;
    setLoading(false);
  };

  const deleteFile = async (id) => {
    let json = await delet({ id, typeFile: typeFileAccept.type });
    actionsOfModifyFiles("delete", typeFileAccept.type, id);
    setLoading(false);
    return Promise.resolve(json);
  };

  const getFiles = async () => {
    let json = await get({ typeFile: typeFileAccept.type });
    if (!json.error) {
      json = json.map((ele) => ({
        ...ele,
        nameFileSlice: SliceText(ele.nameFile),
      }));
      if (typeFileAccept.type == "image") setImages(json);
      if (typeFileAccept.type == "zips") setZips(json);
      if (typeFileAccept.type == "docs") setPdfs(json);
    }
  };

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname == "/admin/uploads/pdf")
      handleTypeFile("application/pdf", "docs");
    if (pathname == "/admin/uploads/comprimidos")
      handleTypeFile("application/, .zip, .rar", "zips");
    if (pathname == "/admin/uploads/imagenes")
      handleTypeFile("image/, .jpeg, .jpg, .png, .gif", "image");
    if (errorUpload.length > 0) handleOpenModal();
  }, [pathname, errorUpload]);

  if (pathname == "/admin/uploads")
    return <Navigate to={"/admin/uploads/imagenes"} />;
  return (
    <div className="p-5">
      <ModalUpload
        errorUpload={errorUpload}
        handleOpenModal={handleOpenModal}
        openModal={openModal}
      />
      <div className="py-5">
        <input
          type="file"
          name=""
          id="hiddenfile"
          ref={fileRef}
          hidden
          accept={typeFileAccept.accept}
          onChange={handleChangeFile}
          multiple
        />
        <button type="button" className="btn btn__edit" onClick={handleFile}>
          Añadir Archivo
        </button>
      </div>
      <div className="section__upload__tabs">
        <NavLink
          to={"/admin/uploads/imagenes"}
          className="section__upload__tab"
          onClick={() =>
            handleTypeFile("image/, .jpeg, .jpg, .png, .gif", "image")
          }
        >
          Imagenes
        </NavLink>
        <NavLink
          to={"pdf"}
          className="section__upload__tab"
          onClick={() => handleTypeFile("application/pdf", "docs")}
        >
          PDF
        </NavLink>
        <NavLink
          to={"comprimidos"}
          className="section__upload__tab"
          onClick={() => handleTypeFile("application/, .zip, .rar", "zips")}
        >
          Archivos Comprimidos
        </NavLink>
      </div>
      {loading && <Loader css={"fixed inset-0 z-10 bg-[#00000070]"} />}
      {
        <Outlet
          context={{
            filesContentRef,
            images,
            setImages,
            pdfs,
            setPdfs,
            zips,
            setZips,
            deleteFile,
            getFiles,
            setLoading,
          }}
        />
      }
    </div>
  );
};

export default Uploads;
