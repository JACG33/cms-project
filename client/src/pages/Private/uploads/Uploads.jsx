import { useEffect, useRef, useState } from "react";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { IMG_PlACEHOLDER, acceptedFiles } from "../../../config/constans";
import { SliceText } from "../../../helpers/strings";
import { delet, get, post } from "../../../services";

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

  const handleFile = () => fileRef.current.click();
  const handleChangeFile = (e) => {
    let file = e.target.files;
    filesToUpload = Array.from(file);
    if (file.length >= 1) {
      setLoading(true);
      filesToUpload.map((ele) =>
        tmpFiles.push({
          id: 0,
          path: IMG_PlACEHOLDER,
          nameFile: ele.name,
          typeFile: "image",
          sizeFile: `{"small":"${URL.createObjectURL(ele)}"}`,
          nameFileSlice: SliceText(ele.name),
        })
      );
      saveFile(file, filesToUpload);
    }
  };

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
    if (file.length > 1) {
      filesToUpload.map((ele) => form.append("file", ele));
    } else form.append("file", file[0]);

    let json = await post({ file, filesToUpload });
    tmpFiles = tmpFiles.map((ele, ind) => ({
      ...ele,
      id: json[ind].id,
      path: json[ind].path,
    }));
    setTimeout(() => {
      fileRef.current.value = null;
      setLoading(false);
      actionsOfModifyFiles("save", typeFileAccept.type);
    }, 1000);
  };

  const deleteFile = async (id) => {
    let json = await delet({ id, typeFile: typeFileAccept.type });
    actionsOfModifyFiles("delete", typeFileAccept.type, id);
    setLoading(false);
    return Promise.resolve(json);
  };

  const getFiles = async () => {
    let json = await get({ typeFile: typeFileAccept.type });
    console.log(json);
    if (!json.error) {
      if (typeFileAccept.type == "image") setImages(json);
      if (typeFileAccept.type == "zips") setZips(json);
      if (typeFileAccept.type == "docs") setPdfs(json);
    }
  };

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname == "/admin/uploads/pdf")
      setTypeFileAccept({ accept: "application/pdf", type: "docs" });
    if (pathname == "/admin/uploads/comprimidos")
      setTypeFileAccept({ accept: "application/, .zip, .rar", type: "zips" });
    if (pathname == "/admin/uploads")
      setTypeFileAccept({ accept: "application/pdf", type: "docs" });
  }, [pathname]);

  if (pathname == "/admin/uploads")
    return <Navigate to={"/admin/uploads/imagenes"} />;
  return (
    <div className="p-5">
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
