import React, { useRef } from "react";

const ItemCategorie = ({
	categoriName,
	handleClickItem,
	categoriSelected = undefined,
}) => {
	const status = useRef(false);
	const handleClick = (target) => {
		status.current = !status.current;
		if (status.current)
			return handleClickItem({ target: target.target, type: "add" });
		else return handleClickItem({ target: target.target, type: "remove" });
	};
	if (!categoriSelected || categoriSelected === undefined)
		status.current = false;
	else status.current = true;

	return (
		<>
			<button
				type="button"
				onClick={handleClick}
				className={status.current === true ? "categorie__items--selected" : ""}
			>
				{categoriName}
			</button>
		</>
	);
};

export default ItemCategorie;
