import React, { useEffect, useRef, useState } from "react";
import { API_URL } from "../../config/constans";
import { ArrowDown } from "../Svg/Svg";
import "./form-button-cargories.css";
import ItemCategorie from "./form-item-button-cargorie";

const FormCategori = ({ handleChange, categoriesData }) => {
	const wrapperRef = useRef();
	const catRef = useRef({});
	const [categories, setCategories] = useState([]);

	const handleClick = () => {
		wrapperRef.current.classList.toggle("categories__wrapper--show");
	};

	const handleClickItem = ({ target, type }) => {
		if (type === "add") {
			catRef.current = {
				...categoriesData,
				[target.innerText]: target.innerText,
			};
		}

		if (type === "remove") {
			const tmp = { ...catRef.current };
			delete tmp[target.innerText];
			catRef.current = tmp;
		}

		const e = {
			target: {
				id: "categories",
				value: JSON.stringify(catRef.current),
			},
		};
		handleChange(e);
	};

	useEffect(() => {
		if (categories?.length === 0) {
			fetch(`${API_URL}categories`)
				.then((res) => res.json())
				.then((res) => {
					console.log(res.data);
					setCategories(res.data||[]);
				});
		}
	}, []);
	
	setTimeout(() => {
		catRef.current = categoriesData;
	}, 500);

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
							categoriSelected={categoriesData?.[ele.name]}
						/>
					))
				) : (
					<span className="text-center">Sin Categorias</span>
				)}
			</div>
		</div>
	);
};
export default FormCategori;
