import { useEffect, useRef, useState } from "react";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "../../../components/Loader/Loader";
import { IMG_PlACEHOLDER, acceptedFiles } from "../../../config/constans";
import { SliceTextExtensionFile } from "../../../helpers/strings";
import { delet, get, post } from "../../../services";
import ModalUpload from "./ModalUpload";

let filesToUpload;
let tmpFiles = [];
const FILE_STORAGE = {
	image: [],
	docs: [],
	zips: [],
};

const Uploads = () => {
	const fileRef = useRef();
	const filesContentRef = useRef();
	const { pathname } = useLocation();
	const [fileStorage, setFileStorage] = useState(FILE_STORAGE);
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
		const file = e.target.files;
		const tmpErros = [];
		filesToUpload = Array.from(file);
		if (file.length >= 1) {
			setLoading(true);
			filesToUpload.map((file) => {
				if (file.size > 1572864) {
					tmpErros.push(
						`El archivo ${file.name} supera los 1.5 MB y no podra ser subido`,
					);
				}
				tmpFiles.push({
					id: 0,
					path: IMG_PlACEHOLDER,
					nameFile: file.name,
					typeFile: "image",
					sizeFile: `{"small":"${URL.createObjectURL(file)}"}`,
					nameFileSlice: SliceTextExtensionFile(file.name),
				});
			});
			if (tmpErros.length === 0) return saveFile(file, filesToUpload);
			handleError(tmpErros);
			setLoading(false);
			fileRef.current.value = null;
			tmpFiles = [];
		}
	};

	const handleError = (name) => setErrorUpload(name);

	const actionsOfModifyFiles = (action, type, id = null) => {
		if (action === "delete") {
			const deleteFile = fileStorage[type].filter((ele) => ele.id !== id);
			setFileStorage({
				...fileStorage,
				[type]: deleteFile,
			});
		}
		if (action === "save") {
			setFileStorage({
				...fileStorage,
				[type]: [...tmpFiles.reverse(), ...fileStorage[type]],
			});
			tmpFiles = [];
		}
	};

	const saveFile = async (file, filesToUpload) => {
		const form = new FormData();
		form.append("file", file);

		const json = await post({ file, filesToUpload });
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
		const json = await delet({ id, typeFile: typeFileAccept.type });
		actionsOfModifyFiles("delete", typeFileAccept.type, id);
		setLoading(false);
		return Promise.resolve(json);
	};

	const getFiles = async () => {
		let json = await get({ typeFile: typeFileAccept.type });
		if (!json.error) {
			json = json.map((ele) => ({
				...ele,
				nameFileSlice: SliceTextExtensionFile(ele.nameFile),
			}));
			setFileStorage({ ...fileStorage, [typeFileAccept.type]: json });
		}
	};

	useEffect(() => {
		if (pathname === "/admin/uploads/pdf")
			setTypeFileAccept({ accept: "application/pdf", type: "docs" });
		if (pathname === "/admin/uploads/comprimidos")
			setTypeFileAccept({ accept: "application/, .zip, .rar", type: "zips" });
		if (pathname === "/admin/uploads/imagenes")
			setTypeFileAccept({
				accept: "image/, .jpeg, .jpg, .png, .gif",
				type: "image",
			});
		if (errorUpload.length > 0) handleOpenModal();
	}, [pathname, errorUpload]);

	if (pathname === "/admin/uploads")
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
						setTypeFileAccept({
							accept: "image/, .jpeg, .jpg, .png, .gif",
							type: "image",
						})
					}
				>
					Imagenes
				</NavLink>
				<NavLink
					to={"pdf"}
					className="section__upload__tab"
					onClick={() =>
						setTypeFileAccept({ accept: "application/pdf", type: "docs" })
					}
				>
					PDF
				</NavLink>
				<NavLink
					to={"comprimidos"}
					className="section__upload__tab"
					onClick={() =>
						setTypeFileAccept({
							accept: "application/, .zip, .rar",
							type: "zips",
						})
					}
				>
					Archivos Comprimidos
				</NavLink>
			</div>
			{loading && <Loader css={"fixed inset-0 z-10 bg-[#00000070]"} />}
			{
				<Outlet
					context={{
						filesContentRef,
						deleteFile,
						getFiles,
						setLoading,
						typeFileAccept,
						fileStorage,
					}}
				/>
			}
		</div>
	);
};

export default Uploads;
