import { useState } from "react";
import FormPost from "../../../components/FormPost/FormPost";
import { nullForm } from "../../../config/constans";

const AddContenido = () => {
  const [formPost, setFormPost] = useState(nullForm);
  const ele={ __html:"<p></br></p>"}
  return (
    <div>
      <FormPost formPost={formPost} setFormPost={setFormPost} typeForm={"add"} mark={ele}/>
    </div>
  );
};

export default AddContenido;
