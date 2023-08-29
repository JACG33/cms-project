import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, Reg_Exp, nullForm } from "../../config/constans";
import { SlugText } from "../../helpers/strings";
import { ModalForm } from "../Modals/Modal";
import Toast from "../Notifications/Toast";
import ToolsTextEditor from "../TextEditor/ToolsTextEditor";
import FormCategori from "./form-button-cargories";
import "./form-post.css";

let mark = { __html: "<p></br></p>" };
const FormPost = ({ typeForm }) => {
	const bodyContentRef = useRef();
	const selectRef = useRef();
	const statusFormRef = useRef({ body: [] });
	const { id } = useParams();
	const navigation = useNavigate();
	const [formPost, setFormPost] = useState(nullForm);
	const [status, setStatus] = useState({ type: "empty" });

	const validateField = () => {
		const body = [];
		let errorCount = 0;
		if (!Reg_Exp.title.test(formPost.title)) {
			errorCount++;
			body.push({
				message:
					"El titulo no puede estar vacio y debe tener más de 10 caracteres y menos de 60",
			});
		}
		if (!Reg_Exp.descrip.test(formPost.descrip)) {
			errorCount++;
			body.push({
				message:
					"La descripción no puede estar vacia y debe tener más de 20 caracteres.",
			});
		}
		if (errorCount > 0) {
			statusFormRef.current = { body };
			setStatus({ type: "error" });
		} else {
			statusFormRef.current = {
				body: [],
			};
		}
	};

	const handleChange = (e) => {
		const { id, value, innerHTML, innerText } = e.target;
		if (bodyContentRef.current.innerHTML === "")
			bodyContentRef.current.innerHTML = "<p></br></p>";
		setStatus({ type: "empty" });
		setFormPost({
			...formPost,
			[id]: value || innerHTML,
			excerpt: id === "descrip" ? innerText.slice(0, 150) : formPost.excerpt,
			slug: id === "title" ? SlugText({ text: value }) : formPost.slug,
		});
	};

	const editPost = async () => {
		try {
			const solic = await fetch(`${API_URL}posts/${formPost.id}`, {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(formPost),
			});
			if (!solic.ok) throw await solic.json();
			const json = await solic.json();
			statusFormRef.current = { body: json };
			setStatus({ type: "success" });
			resetForm();
			setTimeout(() => navigation("/admin/addcontenido"), 2000);
		} catch (error) {
			statusFormRef.current = { body: error.message };
			setStatus({ type: "error" });
		}
	};

	const savePost = async () => {
		try {
			const solic = await fetch(`${API_URL}posts`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(formPost),
			});

			if (!solic.ok) throw await solic.json();
			const json = await solic.json();
			statusFormRef.current = { body: json };
			setStatus({ type: "success" });
			resetForm();
		} catch (error) {
			statusFormRef.current = { body: error.message };
			setStatus({ type: "error" });
		}
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
		validateField();
		if (statusFormRef.current.body.length === 0)
			typeForm === "add" ? savePost() : editPost();
	};

	useEffect(() => {
		if (typeForm === "edit") getPost();
	}, []);
	setTimeout(() => {
		if (selectRef.current) {
			const options = Array.from(selectRef.current.options);
			options.find((ele) =>
				ele.value === formPost.statuspost
					? ele.setAttribute("selected", true)
					: "",
			);
		}
	}, 500);
	if (typeForm === "add") mark = { __html: "<p></br></p>" };

	return (
		<>
			<form onSubmit={handleSubmit} className="form__editor">
				{status.type === "error" && (
					<Toast data={statusFormRef.current.body} messageType={"Error"} />
				)}
				{status.type === "success" && (
					<Toast data={statusFormRef.current.body} messageType={"Success"} />
				)}
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
					<div>
						<FormCategori
							handleChange={handleChange}
							categoriesData={
								formPost.categories ? JSON.parse(formPost.categories) : ""
							}
						/>
					</div>
				</div>
			</form>
		</>
	);
};

export default FormPost;
