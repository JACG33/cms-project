import { ToolsEditor } from "./ToolsEditor";

ToolsEditor();
const ToolsTextEditor = () => {

	return (
		<div className="bg-slate-500 p-2 flex justify-evenly gap-2">
			<select name="" id="typeTag">
				<option value="p">Parrafo</option>
				<option value="h2">Titulo1</option>
				<option value="h3">Titulo2</option>
				<option value="h4">Titulo3</option>
				<option value="h5">Titulo4</option>
				<option value="h6">Titulo5</option>
			</select>

			<button type="button" id="bold">
				B
			</button>
			<button type="button" id="italic">
				I
			</button>
			<button type="button" id="left">
				left
			</button>
			<button type="button" id="center">
				center
			</button>
			<button type="button" id="right">
				right
			</button>
		</div>
	);
};

export default ToolsTextEditor;
