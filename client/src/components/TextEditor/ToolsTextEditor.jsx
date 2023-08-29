import { ToolsEditor } from "./ToolsEditor";
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
				<button type="button" className="tool__btn" data-btn="stylefont" data-style="strong">
					B
				</button>
				<button type="button" className="tool__btn" data-btn="stylefont" data-style="i">
					I
				</button>

				<button type="button" className="tool__btn" data-btn="list" data-list="ul">
					P
				</button>
				<button type="button" className="tool__btn" data-btn="list" data-list="ol">
					N
				</button>

				<button type="button" className="tool__btn" id="left" data-btn="align" data-align="left">
					left
				</button>
				<button type="button" className="tool__btn" id="center" data-btn="align" data-align="center">
					center
				</button>
				<button type="button" className="tool__btn" id="right" data-btn="align" data-align="right">
					right
				</button>
				<button type="button" className="tool__btn" data-btn="align" data-align="justify">
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
