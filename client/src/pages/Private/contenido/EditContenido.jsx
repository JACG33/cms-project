import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./Form";
import { API_URL, nullForm } from "../../../config/constans";

let mark;

const EditContenido = () => {
  const { id } = useParams();

  const [formPost, setFormPost] = useState(nullForm);

  const getPost = () => {
    /* let form = new FormData();
    form.append("_method", "get");
    form.append("data", `{"id":${id}}`);
    fetch(`${API_URL}posts`, {
      method: "POST",
      body: form,
    }) */
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
      <Form
        formPost={formPost}
        setFormPost={setFormPost}
        mark={mark}
        typeForm={"edit"}
      />
    </div>
  );
};

export default EditContenido;
