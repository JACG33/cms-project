import { useState } from "react";
import Form from "./Form";
import { nullForm } from "../../../config/constans";

const AddContenido = () => {
  const [formPost, setFormPost] = useState(nullForm);
  let ele={ __html:"<p></br></p>"}
  return (
    <div>
      <Form formPost={formPost} setFormPost={setFormPost} typeForm={"add"} mark={ele}/>
    </div>
  );
};

export default AddContenido;
