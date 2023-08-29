import { useEffect, useState } from "react";
import PostCardPrivate from "../../../components/Post/PostCardPrivate";
import { API_URL } from "../../../config/constans";
import { SliceText } from "../../../helpers/strings";

const Contenido = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}posts`)
      .then((res) => res.json())
      .then((res) => setPosts(res.data));
  }, []);
  return (
    <div className="posts__wrapper">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCardPrivate
            key={post.id}
            title={SliceText({text:post.title,length:15})}
            descrip={post.descrip}
            excerpt={post.excerpt}
            imgsrc={post.img}
            id={post.id}
            statuspost={post.statuspost}
          />
        ))
      ) : (
        <PostCardPrivate
          title={"Sin Post aun, o ne se pudieron cargar"}
          excerpt={"😢 😢 😢"}
        />
      )}
    </div>
  );
};

export default Contenido;
