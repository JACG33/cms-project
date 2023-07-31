import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../config/constans";

export const ModalForm = ({ openModal, bodyContentRef, handleOpenModal }) => {
  const refModal = useRef("modalDialog");
  const refImg = useRef();
  const [files, setFiles] = useState([]);
  const [fileSelected, setFileSelected] = useState("");
  const [imgSize, setImgSize] = useState("small");

  const getFiles = () => {
    fetch(`${API_URL}uploads/`)
      .then((res) => res.json())
      .then((res) => setFiles(res));
  };

  const addFile = () => {
    let fileSize = JSON.parse(fileSelected.sizes)[imgSize];
    bodyContentRef.current.innerHTML += `
    <a href="${fileSelected.src}"  style="position: relative;">
      <img src="${fileSize}" alt="${fileSelected.alt}" class="cursor-pointer"  data-edit="img"/>
    </a>`;
    handleOpenModal();
  };

  const selectSizeImg = (e) => {
    setImgSize(e.target.value);
  };

  const selectedFile = (e) => {
    document
      .querySelectorAll("img[data-type=img]")
      .forEach((ele) => (ele.className = "w-40 h-40 m-auto object-cover"));
    e.target.className += " outline-offset-3 outline outline-green-500";
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
      document
        .querySelectorAll("img[data-type=img]")
        .forEach((ele) => (ele.className = "w-40 h-40 m-auto object-cover"));
    }
  }, [openModal]);
  return (
    <dialog ref={refModal} className="floatModal">
      <div className="p-3 grid grid-cols-4 gap-4">
        {files.length > 0 ? (
          files.map((file, index) => (
            <img
              onClick={selectedFile}
              key={index}
              ref={refImg}
              className="w-40 h-40 m-auto object-cover"
              src={file.path}
              alt={file.nameFile}
              data-type={"img"}
              data-sizes={file.sizeFile}
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
  );
};
