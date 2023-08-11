import { ToolsEditor } from "./ToolsEditor";

ToolsEditor();
const ToolsTextEditor = ({ handleChange, bodyContentRef, mark }) => {
	return (
		<>
			<div className="bg-slate-500 p-2 flex justify-evenly gap-2">
				<select name="" id="heading">
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

				<button type="button" data-btn="list"  data-list="ul">
					P
				</button>
				<button type="button" data-btn="list"  data-list="ol">
					N
				</button>

				<button type="button" id="left" data-btn="align"  data-align="left">
					left
				</button>
				<button type="button" id="center" data-btn="align"  data-align="center">
					center
				</button>
				<button type="button" id="right" data-btn="align"  data-align="right">
					right
				</button>
				<button type="button" data-btn="align"  data-align="justify">
					justify
				</button>
			</div>
			<div
				contentEditable
				className="form__editor__descrip"
				id="descrip"
				onKeyUp={handleChange}
				ref={bodyContentRef}
				dangerouslySetInnerHTML={mark}
			/>
		</>
	);
};

export default ToolsTextEditor;
