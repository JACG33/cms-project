import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Item from "./Item";
import SectionUpload from "./SectionUpload";

const Comprimidos = () => {
  const { filesContentRef, zips, getFiles } = useOutletContext();

  useEffect(() => {
    if (zips.length == 0) getFiles();
  }, []);
  return (
    <SectionUpload filesContentRef={filesContentRef}>
      {zips?.length > 0 ? (
        zips.map((file, index) => (
          <Item
            key={index}
            id={file.id}
            src={"/img/zip.svg"}
            alt={file.nameFile}
            filename={file.nameFileSlice}
            path={file.path}
          />
        ))
      ) : (
        <h2>No hay zips cargadas</h2>
      )}
    </SectionUpload>
  );
};

export default Comprimidos;
