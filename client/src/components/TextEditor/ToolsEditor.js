export const ToolsEditor = () => {
  document.addEventListener("DOMContentLoaded", (e) => {
    let imgAlign, parent, textSelect;
    document.addEventListener("click", (e) => {
      let target = e.target;

      if (target.dataset.edit == "img") {
        if (imgAlign == target) {
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
        if (imgAlign) return imgAlign.setAttribute("style", "float:left;");
        parent.className = "";
        parent.classList.add("text-left");
      }
      if (target.matches("#right")) {
        if (imgAlign) return imgAlign.setAttribute("style", "float:right;");
        parent.className = "";
        parent.classList.add("text-right");
      }
      if (target.matches("#center")) {
        if (imgAlign)
          return imgAlign.setAttribute(
            "style",
            "display: block;margin-left: auto; margin-right: auto;"
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
      if (target.value == "par") {
        const p = document.createElement("p");
        p.textContent = textSelect;
        parent.replaceWith(p);
      }
      if (target.value == "h1") {
        const h1 = document.createElement("h1");
        h1.textContent = textSelect;
        parent.replaceWith(h1);
      }
      if (target.value == "h2") {
        const h2 = document.createElement("h2");
        h2.textContent = textSelect;
        parent.replaceWith(h2);
      }
      if (target.value == "h3") {
        const h3 = document.createElement("h3");
        h3.textContent = textSelect;
        parent.replaceWith(h3);
      }
      if (target.value == "h4") {
        const h4 = document.createElement("h4");
        h4.textContent = textSelect;
        parent.replaceWith(h4);
      }
      if (target.value == "h5") {
        const h5 = document.createElement("h5");
        h5.textContent = textSelect;
        parent.replaceWith(h5);
      }
    });

    document.addEventListener("selectionchange", (e) => {
      textSelect = window.getSelection().toString();
      parent = window.getSelection().anchorNode.parentElement;
    });
  });
};
