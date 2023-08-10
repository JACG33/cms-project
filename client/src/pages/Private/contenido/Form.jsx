import { useRef, useState } from "react";
import ToolsTextEditor from "../../../components/TextEditor/ToolsTextEditor";
import { ModalForm } from "../../../components/modals/Modal";
import { API_URL, nullForm } from "../../../config/constans";

const Form = ({ formPost, setFormPost, typeForm, mark }) => {
	const bodyContentRef = useRef();
	const selectRef = useRef();

	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => {
		if (!openModal) {
			setOpenModal(true);
		} else setOpenModal(false);
	};

	const handleChange = (e) => {
		const { name, id, value, innerHTML, innerText } = e.target;
		if (bodyContentRef.current.innerHTML === "")
			bodyContentRef.current.innerHTML = "<p></br></p>";
		setFormPost({
			...formPost,
			[name || id]: value || innerHTML,
			excerpt: id === "descrip" ? innerText.slice(0, 150) : formPost.excerpt,
			slug: id === "title" ? value.trim().split(" ").join("-") : formPost.slug,
		});
	};

	const editPost = () => {
		fetch(`${API_URL}posts/${formPost.id}`, {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(formPost),
		})
			.then((res) => res.json())
			.then((res) => console.log(res));
	};

	const savePost = () => {
		fetch(`${API_URL}posts`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(formPost),
		})
			.then((res) => res.json())
			.then((res) => console.log(res));
	};

	const resetForm = () => {
		setFormPost(nullForm);
		bodyContentRef.current.innerHTML = null;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		typeForm === "add" ? savePost() : editPost();
		resetForm();
	};

	setTimeout(() => {
		if (selectRef.current) {
			const options = Array.from(selectRef.current.options);
			options.find((ele) =>
				ele.value == formPost.statuspost
					? ele.setAttribute("selected", true)
					: "",
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
				<div className="w-full flex flex-col gap-4">
					<input
						type="text"
						name="title"
						id="title"
						className="form__editor__title"
						value={formPost.title}
						onChange={handleChange}
						placeholder="Titulo Contenido"
					/>
					<div className="rounded-lg overflow-hidden">
						<ToolsTextEditor bodyContentRef={bodyContentRef} handleChange={handleChange} mark={mark} />
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<div>
						<label htmlFor="statuspost">Estatus del Post</label>
						<select
							ref={selectRef}
							name="statuspost"
							id="statuspost"
							onChange={handleChange}
							className="w-full"
						>
							<option value="Borrador">Borrador</option>
							<option value="Publica">Publica</option>
						</select>
					</div>
					<button
						type="button"
						className="btn btn__edit"
						onClick={handleOpenModal}
					>
						Añadir Imagen
					</button>
					<button type="submit" className="btn btn__save">
						Guardar
					</button>
				</div>
			</form>
		</>
	);
};

export default Form;
