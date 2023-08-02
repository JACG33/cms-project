import React, { useEffect, useRef } from "react";

const ModalUpload = ({ handleOpenModal, errorUpload, openModal }) => {
  const refModal = useRef("modalDialog");
  useEffect(() => {
    console.log("Modal++++++++++++", errorUpload);
    if (openModal) refModal.current.showModal();
    else refModal.current.close();
  }, [openModal]);
  return (
    <dialog ref={refModal} className="floatModal p-2">
      <div className="p-3 grid gap-4">
        {errorUpload.length > 0 &&
          errorUpload.map((ele, ind) => <span key={ind}>{ele}</span>)}
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="btn btn__delete"
          onClick={handleOpenModal}
        >
          Cerrar
        </button>
      </div>
    </dialog>
  );
};

export default ModalUpload;
