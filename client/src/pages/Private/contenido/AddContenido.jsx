import { useState } from "react";
import { nullForm } from "../../../config/constans";
import Form from "./Form";

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
