import React, { useEffect, useRef, useState } from "react";

const ItemCategorie = ({ categoriName, handleClickItem, categoriSelected=undefined }) => {
	const status = useRef(false);
	const [active,setActive]=useState(false)
	const handleClick = (target) => {
		status.current = !status.current;
		if (status.current)
			return handleClickItem({ target: target.target, type: "add" });
		else return handleClickItem({ target: target.target, type: "remove" });
	};
	useEffect(() => {
		if (categoriSelected === undefined) {status.current = false;setActive(false)}
		else {status.current = true;setActive(true)}
	}, [categoriSelected]);

	return (
		<>
			<button
				type="button"
				onClick={handleClick}
				className={active===true ? "categorie__items--selected" : ""}
			>
				{categoriName}
			</button>
		</>
	);
};

export default ItemCategorie;
