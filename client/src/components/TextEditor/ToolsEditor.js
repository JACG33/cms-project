export const ToolsEditor = () => {
	let imgAlign;
	let parent;
	let textSelect;
	let basnd;
	let extnd;
	let childrenOfSelection = [];
	const cssSelectedImg = ["outline-offset-3", "outline", "outline-green-500"];

	const findItems = () => {
		if (basnd !== extnd) {
			const items = [];
			let startPos;
			let endPos;
			childrenOfSelection.forEach((ele, inx) => {
				if (ele.textContent === basnd.textContent) startPos = inx;
				if (ele.textContent === extnd.textContent) endPos = inx;
			});
			childrenOfSelection.forEach((ele, ind) => {
				if (ele.textContent === basnd.textContent) items.push(ele);

				if (ind > startPos && ind < endPos) items.push(ele);

				if (ele.textContent === extnd.textContent) items.push(ele);
			});
			return items;
		} else return childrenOfSelection;
	};

	const generateTag = ({ type }) => {
		findItems().forEach((ele) => {
			const tag = document.createElement(type);
			tag.textContent = ele.textContent;
			ele.replaceWith(tag);
		});
	};
	document.addEventListener("click", (e) => {
		const { target } = e;
		if (target.dataset.edit === "img") {
			if (imgAlign === target) {
				imgAlign = null;
				target.classList.remove(...cssSelectedImg);
			} else {
				imgAlign = target;
				imgAlign.classList.add(...cssSelectedImg);
			}
		}
		if (target.matches("#left")) {
			if (imgAlign)
				return imgAlign.setAttribute("style", "float:left;margin-right:15px;");
			if (parent) {
				parent.className = "";
				parent.classList.add("text-left");
			}
		}
		if (target.matches("#right")) {
			if (imgAlign)
				return imgAlign.setAttribute("style", "float:right;margin-left:15px;");
			if (parent) {
				parent.className = "";
				parent.classList.add("text-right");
			}
		}
		if (target.matches("#center")) {
			if (imgAlign)
				return imgAlign.setAttribute(
					"style",
					"display: block;margin-left: auto; margin-right: auto;",
				);
			if (parent) {
				parent.className = "";
				parent.classList.add("text-center");
			}
		}
		if (target.matches("#justify")) {
			if (parent) {
				parent.className = "";
				parent.classList.add("text-justify");
			}
		}
		if (target.matches("#bold")) {
			if (parent) {
				parent.classList.toggle("font-bold");
			}
		}
		if (target.matches("#italic")) {
			if (parent) {
				parent.classList.toggle("italic");
			}
		}
		if (
			target.localName.match(/p|h2|h3|h4|h5|h6/) &&
			target.innerText !== "\n"
		) {
			parent = target;
			textSelect = target.innerText;
		}
	});

	document.addEventListener("change", (e) => {
		const target = e.target;
		if (target.matches("#typeTag") && parent != null && textSelect !== "") {
			generateTag({ type: target.value });
		}
	});

	document.addEventListener("selectionchange", (e) => {
		const { anchorNode, baseNode, extentNode } = window.getSelection();
		basnd = baseNode;
		extnd = extentNode;
		if (
			window.getSelection().getRangeAt(0).commonAncestorContainer.childNodes
				.length !== 0
		)
			childrenOfSelection = window.getSelection().getRangeAt(0)
				.commonAncestorContainer.childNodes;
		else
			childrenOfSelection = [
				window.getSelection().getRangeAt(0).commonAncestorContainer
					.parentElement,
			];
		if (
			anchorNode.localName?.match(/div/) &&
			anchorNode.outerHTML === "<div><br></div>"
		) {
			const p = document.createElement("p");
			p.innerHTML = "</br>";
			anchorNode.replaceWith(p);
		}
		if (anchorNode.parentElement?.localName.match(/p|h2|h3|h4|h5|h6/)) {
			textSelect = window.getSelection().toString();
			textSelect = textSelect.split("\n").filter((ele) => ele !== "");
			parent = anchorNode.parentElement;
		}
	});

	document.removeEventListener("click", (e) => {});
	document.removeEventListener("change", (e) => {});
	document.removeEventListener("selectionchange", (e) => {});
};
