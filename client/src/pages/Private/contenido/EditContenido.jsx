import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormPost from "../../../components/FormPost/FormPost";
import { API_URL, nullForm } from "../../../config/constans";

let mark;

const EditContenido = () => {
  const { id } = useParams();

  const [formPost, setFormPost] = useState(nullForm);

  const getPost = () => {
    fetch(`${API_URL}posts/${id}`,{
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        setFormPost(res.data);
        mark = { __html: res.data.descrip };
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <FormPost
        formPost={formPost}
        setFormPost={setFormPost}
        mark={mark}
        typeForm={"edit"}
      />
    </div>
  );
};

export default EditContenido;
