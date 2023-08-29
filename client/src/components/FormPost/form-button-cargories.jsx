import React, { useEffect, useRef, useState } from "react";
import { API_URL } from "../../config/constans";
import { ArrowDown } from "../Svg/Svg";
import "./form-button-cargories.css";
import ItemCategorie from "./form-item-button-cargorie";

const FormCategori = ({ handleChange, categoriesData }) => {
	const wrapperRef = useRef();
	const setCat = useRef(false);
	const selectCategories = useRef(categoriesData);
	const [categories, setCategories] = useState([]);
	const [selectCategoriesj, setSelectCategories] = useState(false);

	const handleClick = () => {
		wrapperRef.current.classList.toggle("categories__wrapper--show");
	};

	const handleClickItem = ({ target, type }) => {
		setSelectCategories(!selectCategoriesj);
		setCat.current = true;
		if (type === "add") {
			console.log(selectCategories, "ad+++++");
			selectCategories.current = {
				...selectCategories.current,
				[target.innerText]: target.innerText,
			};
		}
		if (type === "remove") {
			console.log(selectCategories, "remo+++++");
			const tmp = { ...selectCategories.current };
			delete tmp[target.innerText];
			selectCategories.current = tmp;
		}
	};
	useEffect(() => {
		if (categories?.length === 0) {
			fetch(`${API_URL}categories`)
				.then((res) => res.json())
				.then((res) => {
					setCategories(res.data);
				});
		}

		if (setCat.current) {
			const e = {
				target: {
					id: "categories",
					value: JSON.stringify(selectCategories.current),
				},
			};
			handleChange(e);
		}

		if (selectCategories.current===""||!selectCategories.current) {
			const time = setTimeout(() => {
				selectCategories.current = categoriesData;
				setSelectCategories(!selectCategoriesj);
			}, 500);
			return () => clearTimeout(time);
		}
	}, [selectCategoriesj]);
	return (
		<div
			ref={wrapperRef}
			className="categories__wrapper categories__wrapper--show"
		>
			<button
				type="button"
				className="btn flex justify-between w-full"
				onClick={handleClick}
			>
				Catrgoria <ArrowDown />
			</button>
			<div className="categories__items">
				{categories.length > 0 ? (
					categories.map((ele) => (
						<ItemCategorie
							key={ele.id}
							handleClickItem={handleClickItem}
							categoriName={ele.name}
							categoriSelected={selectCategories.current?.[ele.name]}
						/>
					))
				) : (
					<span>Sin Categorias</span>
				)}
			</div>
		</div>
	);
};

export default FormCategori;
