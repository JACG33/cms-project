import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, nullForm } from "../../config/constans";
import ToolsTextEditor from "../TextEditor/ToolsTextEditor";
import { ModalForm } from "../modals/Modal";

let mark = { __html: "<p></br></p>" };
const FormPost = ({ typeForm }) => {
	const bodyContentRef = useRef();
	const selectRef = useRef();
	const { id } = useParams();

	const [formPost, setFormPost] = useState(nullForm);

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

	const getPost = () => {
		fetch(`${API_URL}posts/${id}`, {
			headers: { "content-type": "application/json" },
		})
			.then((res) => res.json())
			.then((res) => {
				setFormPost(res.data);
				mark = { __html: res.data.descrip };
			});
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

	useEffect(() => {
		if (typeForm === "edit") getPost();
	}, []);
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
	if (typeForm === "add") mark = { __html: "<p></br></p>" };

	return (
		<>
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
						<ToolsTextEditor
							bodyContentRef={bodyContentRef}
							handleChange={handleChange}
							mark={mark}
						/>
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
					<button type="submit" className="btn btn__save">
						Guardar
					</button>
					<ModalForm bodyContentRef={bodyContentRef} />
				</div>
			</form>
		</>
	);
};

export default FormPost;
