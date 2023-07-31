import { useEffect } from "react";
import Item from "./Item";
import SectionUpload from "./SectionUpload";
import { useOutletContext } from "react-router-dom";

const Imagenes = () => {
  const { filesContentRef, images, getFiles } =
    useOutletContext();

  useEffect(() => {
    if (images.length == 0) getFiles();
    console.log(images);
  }, []);
  return (
    <SectionUpload filesContentRef={filesContentRef}>
      {images.length > 0 ? (
        images.map((file, index) => (
          <Item
            key={index}
            id={file.id}
            src={JSON.parse(file.sizeFile).small}
            alt={file.nameFile}
            filename={file.nameFileSlice}
            path={file.path}
          />
        ))
      ) : (
        <h2>No hay images cargadas</h2>
      )}
    </SectionUpload>
  );
};

export default Imagenes;
