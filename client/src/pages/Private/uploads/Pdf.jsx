import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Item from "./Item";
import SectionUpload from "./SectionUpload";

const Pdf = () => {
	const { filesContentRef, getFiles, typeFileAccept, fileStorage } =
		useOutletContext();

	useEffect(() => {
		if (fileStorage[typeFileAccept.type]?.length === 0) getFiles();
	}, []);
	return (
		<SectionUpload filesContentRef={filesContentRef}>
			{fileStorage[typeFileAccept.type]?.length > 0 ? (
				fileStorage[typeFileAccept.type]?.map((file) => (
					<Item
						key={file.id}
						id={file.id}
						src={"/img/filetext.svg"}
						alt={file.nameFile}
						filename={file.nameFileSlice}
						path={file.path}
					/>
				))
			) : (
				<h2>No hay pdfs cargadas</h2>
			)}
		</SectionUpload>
	);
};

export default Pdf;
