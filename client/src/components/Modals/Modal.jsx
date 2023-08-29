import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../config/constans";

const classCss = ["outline-offset-3", "outline", "outline-green-500"];
export const ModalForm = ({ bodyContentRef }) => {
	const refModal = useRef("modalDialog");
	const [files, setFiles] = useState([]);
	const [fileSelected, setFileSelected] = useState("");
	const [imgSize, setImgSize] = useState("small");
	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => {
		if (!openModal) {
			setOpenModal(true);
		} else setOpenModal(false);
	};

	const getFiles = () => {
		fetch(`${API_URL}uploads/`, {
			headers: {
				"X-type-file": "image",
			},
		})
			.then((res) => res.json())
			.then((res) => setFiles(res));
	};

	const addFile = () => {
		if (fileSelected !== "") {
			const fileSize = JSON.parse(fileSelected.sizes)[imgSize];
			bodyContentRef.current.innerHTML += `
			<p><br/></p>
			<a href="${fileSelected.src}" target="_blank" rel="noopener noreferrer">
				<img src="${fileSize}" alt="${fileSelected.alt}" class="cursor-pointer" style="display: block;margin-left: auto; margin-right: auto;" data-edit="img"/>
			</a>
			<p><br/>...</p>
			`;
			bodyContentRef.current.scrollTop = 9000 * 9;
			handleOpenModal();
		}
	};

	const selectSizeImg = (e) => setImgSize(e.target.value);

	const selectedFile = (e) => {
		e.target.classList.add(...classCss);
		setFileSelected({
			src: e.target.src,
			alt: e.target.alt,
			sizes: e.target.dataset.sizes,
		});
	};

	useEffect(() => {
		if (openModal) {
			getFiles();
			refModal.current.showModal();
		} else {
			refModal.current.close();
			setFileSelected("");
			document.querySelectorAll("img[data-type=img]").forEach((ele) => {
				ele.className = "w-40 h-40 m-auto object-cover";
			});
		}
	}, [openModal]);
	return (
		<>
			<dialog ref={refModal} className="floatModal">
				<div className="p-3 grid grid-cols-4 gap-4">
					{files.length > 0 ? (
						files.map((file) => (
							<img
								key={file.id}
								className="w-40 h-40 m-auto object-cover cursor-pointer"
								src={file.path}
								alt={file.nameFile}
								data-type={"img"}
								data-sizes={file.sizeFile}
								onClick={selectedFile}
							/>
						))
					) : (
						<h2>No hay imganes aun 😢</h2>
					)}
					<div>
						<select name="" id="" onChange={selectSizeImg}>
							<option value="small">small</option>
							<option value="medium">medium</option>
							<option value="large">large</option>
						</select>
					</div>
				</div>
				<div className="flex gap-3 justify-end">
					<button
						type="button"
						className="btn btn__delete"
						onClick={handleOpenModal}
					>
						cancelar
					</button>
					<button type="button" className="btn btn__edit" onClick={addFile}>
						añadir
					</button>
				</div>
			</dialog>
			<button type="button" className="btn btn__edit" onClick={handleOpenModal}>
				Añadir Imagen
			</button>
		</>
	);
};
