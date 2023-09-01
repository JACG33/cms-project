import { ToolsEditor } from "./ToolsEditor";
import AlignTextSelect from "./align-text-select";
import FontBoldSlect from "./font-bold-select";
import ListTypeSelect from "./list-type-select";
import "./tool-text-editor.css";

ToolsEditor();
const ToolsTextEditor = ({ handleChange, bodyContentRef, mark }) => {
	return (
		<>
			<div className="tools__editor">
				<select className="tool__btn" name="" id="heading">
					<option value="p">Parrafo</option>
					<option value="h2">Titulo1</option>
					<option value="h3">Titulo2</option>
					<option value="h4">Titulo3</option>
					<option value="h5">Titulo4</option>
					<option value="h6">Titulo5</option>
				</select>
				<FontBoldSlect />
				<button
					type="button"
					className="tool__btn"
					data-btn="stylefont"
					data-style="i"
				>
					I
				</button>
				<ListTypeSelect />
				<AlignTextSelect />
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
