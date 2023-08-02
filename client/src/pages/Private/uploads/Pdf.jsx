import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Item from "./Item";
import SectionUpload from "./SectionUpload";

const Pdf = () => {
  const { filesContentRef, pdfs, getFiles } = useOutletContext();

  useEffect(() => {
    if (pdfs.length == 0) getFiles();
  }, []);
  return (
    <SectionUpload filesContentRef={filesContentRef}>
      {pdfs.length > 0 ? (
        pdfs.map((file, index) => (
          <Item
            key={index}
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
