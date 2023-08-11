export const ToolsEditor = () => {
	let imgAlign;
	let basnd;
	let extnd;
	let childrenOfSelection = [];
	const cssSelectedImg = ["outline-offset-3", "outline", "outline-green-500"];
	const classAlign = ["text-right", "text-left", "text-center", "text-justify"];

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
				if (ele.textContent === basnd.textContent) {
					items.push(ele);
				}
				if (
					(ind > startPos && ind < endPos) ||
					(ind > endPos && ind < startPos)
				) {
					items.push(ele);
				}
				if (ele.textContent === extnd.textContent) {
					items.push(ele);
				}
			});
			return items;
		} else return childrenOfSelection;
	};

	const generateTag = ({ type }) => {
		const find = findItems();
		if (type.match(/ul|ol/)) {
			const list = document.createElement(type);
			if (
				find[0]?.parentElement.localName.match(/ul|ol/) &&
				find[0]?.parentElement.localName !== type
			) {
				find[0].parentElement.replaceWith(list);
				find.forEach((ele) => list.append(ele));
				return;
			}
			if (
				find[0]?.parentElement.localName.match(/ul|ol/) &&
				find[0]?.parentElement.localName === type
			) {
				find.forEach((ele) => {
					const p = document.createElement("p");
					p.textContent = ele.textContent;
					ele.parentElement.insertAdjacentElement("beforebegin", p);
				});
				find[0].parentElement.remove();
				return;
			}
			find.forEach((ele) => {
				const li = document.createElement("li");
				li.textContent = ele.textContent;
				list.append(li);
				ele.replaceWith(list);
			});
		} else {
			find.forEach((ele) => {
				const tag = document.createElement(type);
				tag.textContent = ele.textContent;
				if (ele.parentElement?.localName.match(/ul|ol/)) {
					ele.innerHTML = null;
					ele.append(tag);
				} else {
					ele.replaceWith(tag);
				}
			});
		}
	};

	const alignText = ({ align }) => {
		const find = findItems();
		find.forEach((ele) => {
			ele.classList.remove(...classAlign);
			ele.classList.add(`text-${align}`);
		});
	};

	const fontStyle = ({ style }) => {
		const FONT_STYLES = {
			bold: "font-bold",
			italic: "italic",
		};
		const find = findItems();
		find.forEach((ele) => ele.classList.toggle(FONT_STYLES[style]));
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
		}
		if (target.matches("#right")) {
			if (imgAlign)
				return imgAlign.setAttribute("style", "float:right;margin-left:15px;");
		}
		if (target.matches("#center")) {
			if (imgAlign)
				return imgAlign.setAttribute(
					"style",
					"display: block;margin-left: auto; margin-right: auto;",
				);
		}
		if (target.dataset.btn === "align") {
			alignText({ align: target.dataset.align });
		}
		if (target.dataset.btn === "list")
			generateTag({ type: target.dataset.list });
		if (target.dataset.btn === "stylefont")
			fontStyle({ style: target.dataset.style });
	});

	document.addEventListener("change", (e) => {
		const target = e.target;
		if (target.matches("#heading")) generateTag({ type: target.value });
	});

	document.addEventListener("selectionchange", (e) => {
		const { anchorNode, focusNode } = window.getSelection();
		if (
			anchorNode?.localName?.match(/div/) &&
			anchorNode.outerHTML === "<div><br></div>"
		) {
			const p = document.createElement("p");
			p.innerHTML = "</br>";
			anchorNode.replaceWith(p);
		}
		if (anchorNode?.parentElement?.localName.match(/p|h2|h3|h4|h5|h6|li/)) {
			basnd = anchorNode;
			extnd = focusNode;

			const wrapperChilds = window
				.getSelection()
				.getRangeAt(0).commonAncestorContainer;

			if (
				wrapperChilds.localName?.match(/ul|ol/) ||
				wrapperChilds.childNodes.length !== 0
			) {
				childrenOfSelection = wrapperChilds.childNodes;
			} else {
				childrenOfSelection = [wrapperChilds.parentElement];
			}
		}
	});

	document.removeEventListener("click", (e) => {});
	document.removeEventListener("change", (e) => {});
	document.removeEventListener("selectionchange", (e) => {});
};
