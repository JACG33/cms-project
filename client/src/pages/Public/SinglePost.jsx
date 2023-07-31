import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/constans";

let mark;
const SinglePost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({});

  const getPost = () => {
    /* let form = new FormData();
    form.append("_method", "get");
    form.append("data", `{"id":${id}}`);
    fetch(`${API_URL}posts`, {
      method: "POST",
      body: form,
    }) */
    fetch(`${API_URL}posts/${id}`, {
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPostData(res.data);
        mark = { __html: res.data.descrip };
      });
  };

  useEffect(() => {
    getPost();
  }, []);
  return (
    <div>
      {Object.entries(postData) && (
        <div>
          {postData.title}
          <p dangerouslySetInnerHTML={mark}></p>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
