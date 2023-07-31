import { Link } from "react-router-dom";

const PostCard = ({ title,imgsrc, id, excerpt}) => {
  return (
    <div className="post__card">
      {imgsrc && <img src={imgsrc} alt={title} className="post__card__img" />}
      <h3>{title}</h3>
      <p>{excerpt}</p>
      {id && (
        <div className="flex gap-2 items-center justify-evenly">
          <Link className="btn btn__edit" to={`/${id}`}>
            Leer mas
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostCard;
