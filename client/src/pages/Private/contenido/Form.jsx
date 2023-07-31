import { useRef, useState } from "react";
import { API_URL, nullForm } from "../../../config/constans";
import { useNavigate } from "react-router-dom";
import { ModalForm } from "../../../components/modals/Modal";
import ToolsTextEditor from "../../../components/TextEditor/ToolsTextEditor";
import { ToolsEditor } from "../../../components/TextEditor/ToolsEditor";
 


const Form = ({ formPost, setFormPost, typeForm, mark }) => {
  const navigate = useNavigate();
  const bodyContentRef = useRef();
  const selectRef = useRef();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    if (!openModal) {
      setOpenModal(true);
    } else setOpenModal(false);
  };

  const handleChange = (e) => {
    let { name, id, value, innerHTML, innerText } = e.target;
    if (bodyContentRef.current.innerHTML == "")
      bodyContentRef.current.innerHTML = "<p></br></p>";
    setFormPost({
      ...formPost,
      [name || id]: value || innerHTML,
      excerpt: id == "descrip" ? innerText.slice(0, 150) : formPost.excerpt,
      slug: id == "title" ? value.trim().split(" ").join("-") : formPost.slug,
    });
  };

  const editPost = () => {
    /* let form = new FormData();
    form.append("_method", "put");
    form.append("data", JSON.stringify(formPost));
    fetch(`${API_URL}posts`, {
      method: "POST",
      body: form,
    }) */
    fetch(`${API_URL}posts/${formPost.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formPost),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const savePost = () => {
    /* let form = new FormData();
    form.append("data", JSON.stringify(formPost));
    fetch(`${API_URL}posts`, {
      method: "POST",
      body: form,
    }) */
    fetch(`${API_URL}posts`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formPost),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const resetForm = () => setFormPost(nullForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    typeForm == "add" ? savePost() : editPost();
    // resetForm();
    // navigate("/admin/contenido");
  };

  setTimeout(() => {
    if (selectRef.current) {
      let options = Array.from(selectRef.current.options);
      options.find((ele) =>
        ele.value == formPost.statuspost
          ? ele.setAttribute("selected", true)
          : ""
      );
    }
  }, 500);

  return (
    <>
      <ModalForm
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        bodyContentRef={bodyContentRef}
      />
      <form onSubmit={handleSubmit} className="form__editor">
        <div>
          <label htmlFor="statuspost">Estatus del Post</label>
          <select
            ref={selectRef}
            name="statuspost"
            id="statuspost"
            onChange={handleChange}
          >
            <option value="Borrador">Borrador</option>
            <option value="Publica">Publica</option>
          </select>
        </div>
        <div className="w-full flex flex-col gap-4">
          <button
            type="button"
            className="btn btn__edit"
            onClick={handleOpenModal}
          >
            Añadir Imagen
          </button>
          <div>
            <input
              type="text"
              name="title"
              id="title"
              className="form__editor__title"
              value={formPost.title}
              onChange={handleChange}
              placeholder="Titulo Contenido"
            />
          </div>
          <div>
            <ToolsTextEditor />
            <div
              contentEditable
              className="form__editor__descrip"
              name="descrip"
              id="descrip"
              onKeyUp={handleChange}
              ref={bodyContentRef}
              dangerouslySetInnerHTML={mark}
            />
          </div>
        </div>
        <button type="submit" className="btn btn__save">
          Guardar
        </button>
      </form>
    </>
  );
};

export default Form;
ToolsEditor()