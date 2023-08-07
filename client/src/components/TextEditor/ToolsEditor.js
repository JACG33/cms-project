export const ToolsEditor = () => {
	let imgAlign;
	let parent;
	let textSelect;
	const TAGS = {
		h1: () => {
			const h1 = document.createElement("h1");
			h1.textContent = textSelect;
			return h1;
		},
		h2: () => {
			const h2 = document.createElement("h2");
			h2.textContent = textSelect;
			return h2;
		},
		h3: () => {
			const h3 = document.createElement("h3");
			h3.textContent = textSelect;
			return h3;
		},
		h4: () => {
			const h4 = document.createElement("h4");
			h4.textContent = textSelect;
			return h4;
		},
		h5: () => {
			const h5 = document.createElement("h5");
			h5.textContent = textSelect;
			return h5;
		},
		h6: () => {
			const h6 = document.createElement("h6");
			h6.textContent = textSelect;
			return h6;
		},
		p: () => {
			const p = document.createElement("p");
			p.textContent = textSelect;
			return p;
		},
	};
	document.addEventListener("click", (e) => {
		const target = e.target;
		if (target.dataset.edit === "img") {
			if (imgAlign === target) {
				imgAlign = null;
				target.classList.toggle("outline-offset-3");
				target.classList.toggle("outline");
				target.classList.toggle("outline-green-500");
			} else {
				imgAlign = target;
				imgAlign.classList.toggle("outline-offset-3");
				imgAlign.classList.toggle("outline");
				imgAlign.classList.toggle("outline-green-500");
			}
		}
		if (target.matches("#left")) {
			if (imgAlign)
				return imgAlign.setAttribute("style", "float:left;margin-right:15px;");
			parent.className = "";
			parent.classList.add("text-left");
		}
		if (target.matches("#right")) {
			if (imgAlign)
				return imgAlign.setAttribute("style", "float:right;margin-left:15px;");
			parent.className = "";
			parent.classList.add("text-right");
		}
		if (target.matches("#center")) {
			if (imgAlign)
				return imgAlign.setAttribute(
					"style",
					"display: block;margin-left: auto; margin-right: auto;",
				);
			parent.className = "";
			parent.classList.add("text-center");
		}
		if (target.matches("#justify")) {
			parent.className = "";
			parent.classList.add("text-justify");
		}
		if (target.matches("#bold")) {
			parent.classList.toggle("font-bold");
		}
		if (target.matches("#italic")) {
			parent.classList.toggle("italic");
		}
	});
	
	document.addEventListener("change",e=>{
		const target=e.target
		if (target.matches("#typeTag")) parent.replaceWith(TAGS[target.value]());
	})

	document.addEventListener("selectionchange", (e) => {
		textSelect = window.getSelection().toString();
		parent = window.getSelection().anchorNode.parentElement;
	});

	document.removeEventListener("click", (e) => {});
	document.removeEventListener("change", (e) => {});
	document.removeEventListener("selectionchange", (e) => {});
};
