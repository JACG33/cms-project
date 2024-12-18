export const ToolsEditor = () => {
	let imgAlign;
	let basnd;
	let extnd;
	let textSelec;
	let childrenOfSelection = [];
	const cssSelectedImg = ["outline-offset-3", "outline", "outline-green-500"];
	const classAlign = ["text-right", "text-left", "text-center", "text-justify"];
	const FONT_STYLES = {
		strong: "strong",
		b: "b",
		i: "i",
	};

	const findItems = () => {
		if (basnd.className !== extnd.className) {
			const items = [];
			let startPos;
			let endPos;
			childrenOfSelection.forEach((ele, inx) => {
				if (ele.className === basnd.className) startPos = inx;
				if (ele.className === extnd.className) endPos = inx;
			});
			childrenOfSelection.forEach((ele, ind) => {
				if (ele.className === basnd.className) {
					items.push(ele);
				}
				if (
					(ind > startPos && ind < endPos) ||
					(ind > endPos && ind < startPos)
				) {
					items.push(ele);
				}
				if (ele.className === extnd.className) {
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

	const goToParent = ({ element }) => {
		if (element.localName?.match(/p|li/)) return element;
		return goToParent({ element: element.parentElement });
	};

	const cleanEmptyTag = ({ elementToClean }) => {
		document.querySelectorAll(elementToClean).forEach((ele) => {
			if (ele.innerText === "") {
				ele.remove();
			}
			if (ele.innerText === " ") {
				const text = document.createTextNode(" ");
				ele.replaceWith(text);
			}
		});
	};

	const fontStyle = ({ style }) => {
		const find = findItems();
		find.forEach((ele, index) => {
			const pTag = goToParent({ element: ele });
			const pTagChildNodes = pTag.childNodes;
			if (
				style === "b" &&
				pTag.innerHTML.match(`<strong>${textSelec[index]}</strong>`)
			) {
				pTag.innerHTML = pTag.innerHTML.replace(
					`<strong>${textSelec[index]}</strong>`,
					`<b>${textSelec[index]}</b>`,
				);
				return;
			}
			if (
				style === "strong" &&
				pTag.innerHTML.match(`<b>${textSelec[index]}</b>`)
			) {
				pTag.innerHTML = pTag.innerHTML.replace(
					`<b>${textSelec[index]}</b>`,
					`<strong>${textSelec[index]}</strong>`,
				);
				return;
			}

			if (
				pTag.innerHTML.match(
					`<${FONT_STYLES[style]}>${textSelec[index]}</${FONT_STYLES[style]}>`,
				) ||
				ele.localName?.match(FONT_STYLES[style])
			) {
				if (ele.localName.match(FONT_STYLES[style])) {
					pTag.innerHTML = pTag.innerHTML.replace(
						textSelec[index],
						`</${FONT_STYLES[style]}>${textSelec[index]}<${FONT_STYLES[style]}>`,
					);
				} else {
					pTag.innerHTML = pTag.innerHTML.replace(
						`<${FONT_STYLES[style]}>${textSelec[index]}</${FONT_STYLES[style]}>`,
						textSelec[index],
					);
				}
			} else {
				pTagChildNodes.forEach((ele) => {
					if (ele?.nextSibling?.localName === FONT_STYLES[style]) {
						ele.nextSibling.outerHTML = ele.nextSibling.outerHTML.replace(
							`<${FONT_STYLES[style]}>`,
							"",
						);
					}
					if (ele?.previousSibling?.localName === FONT_STYLES[style]) {
						ele.previousSibling.outerHTML =
							ele.previousSibling.outerHTML.replace(
								`</${FONT_STYLES[style]}>`,
								"",
							);
					}
				});
				pTag.innerHTML = pTag.innerHTML.replace(
					textSelec[index],
					`<${FONT_STYLES[style]}>${textSelec[index]}</${FONT_STYLES[style]}>`,
				);
			}
		});
		Object.values(FONT_STYLES).map((ele) =>
			cleanEmptyTag({ elementToClean: FONT_STYLES[ele] }),
		);
	};

	const handleHeadingText = ({ htmlNode }) => {
		if (htmlNode.parentElement?.localName.match(/p|h2|h3|h4|h5|h6/))
			heading.value = htmlNode.parentElement?.localName;
		else heading.value = "p";

		document
			.querySelectorAll(".tool__btn")
			.forEach((ele) => ele.classList.remove("tool__btn--active"));

		if (htmlNode.parentElement?.localName.match(/strong|i|b/)) {
			document
				.querySelector(`button[data-style=${htmlNode.parentElement.localName}]`)
				?.classList.add("tool__btn--active");
		}

		if (htmlNode.parentElement.parentElement.localName === "li") {
			const listNode = htmlNode.parentElement.parentElement.parentElement;
			document
				.querySelector(`button[data-list=${listNode.localName}]`)
				.classList.add("tool__btn--active");
		}
		if (htmlNode.parentElement.localName === "li") {
			const listNode = htmlNode.parentElement.parentElement;
			document
				.querySelector(`button[data-list=${listNode.localName}]`)
				.classList.add("tool__btn--active");
		}
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
		const { anchorNode, anchorOffset, focusNode, focusOffset } =
			window.getSelection();
		textSelec = window.getSelection().toString();
		textSelec = textSelec.split("\n").filter((ele) => ele !== "");
		basnd = null;
		extnd = null;

		if (document.querySelector(".form__editor__descrip")) {
			if (
				anchorNode?.parentElement?.localName.match(
					/p|h2|h3|h4|h5|h6|li|strong|i|b/,
				)
			) {
				basnd = anchorNode;
				extnd = focusNode;
				basnd.className = "star";
				extnd.className = "end";

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
				handleHeadingText({
					htmlNode: anchorNode,
				});
			}
		}
	});

	document.addEventListener("keypress", (e) => {
		const { target, key } = e;
		if (key === "Enter") {
			setTimeout(() => {
				if (target.innerHTML.includes("<div>")) {
					const replaceElement = target.querySelector("div");
					const p = document.createElement("p");
					p.innerHTML = "</br>";
					replaceElement.replaceWith(p);
				}
			}, 100);
		}
	});

	document.removeEventListener("click", (e) => {});
	document.removeEventListener("change", (e) => {});
	document.removeEventListener("selectionchange", (e) => {});
	document.removeEventListener("keypress", (e) => {});
};
