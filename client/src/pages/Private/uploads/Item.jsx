import { useRef } from "react";
import { useOutletContext } from "react-router-dom";

const Item = ({ id, src, alt, filename, path }) => {
  const imgRef = useRef();
  const { deleteFile ,setLoading} = useOutletContext();

  const removeItem = () => imgRef.current.remove();

  return (
    <div ref={imgRef} className="cont__img">
      <button
        className="btn__img__interact btn btn__delete"
        type="button"
        onClick={(e) => {
          setLoading(true)
          deleteFile(id).then((res) => (res == 1 ? removeItem : ""));
        }}
      >
        X
      </button>
      <img
        loading="lazy"
        className="h-40 m-auto object-cover"
        src={src}
        alt={alt}
      />
      <span>{filename}</span>
    </div>
  );
};

export default Item;
