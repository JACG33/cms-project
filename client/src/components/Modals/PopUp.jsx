import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";

const PopUp = ({ children, redirectPath, open }) => {
  console.log("pop");
  const modalRef = useRef("modal");

  /* useEffect(() => {
    if (open) {
      modalRef.current.showModal();
    } else modalRef.current.close();
  }, [open]); */

  const handleRedirect = () => <Navigate to={redirectPath} />;
  return (
    <dialog className="floatModal" ref={modalRef} open>
      <div className="card">
        <div className="card__step">
          <span>Atención</span>
        </div>
        <div className="card__data">{children}</div>
        <div className="card__btn flex-jus-btw">
          <button
            className="btn btn__send"
            type="button"
            data-close="cerrar"
            onClick={handleRedirect}
          >
            Logearse
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default PopUp;
