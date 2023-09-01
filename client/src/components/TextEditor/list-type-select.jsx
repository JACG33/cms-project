import { useRef } from "react";
import { ArrowDown } from "../Svg/Svg";

const ListTypeSelect = () => {
  const wrapperSelect=useRef()
  const toggleSelect=()=>{
    wrapperSelect.current.classList.toggle("tools__wrapper__select__items--show")
  }
	return (
		<div className="tools__wrapper__select">
			<button className="tool__btn flex w-full relative z-[1]"type="button" onClick={toggleSelect}>
				LIST STYLE
				<ArrowDown />
			</button>
			<div className="tools__wrapper__select__items" ref={wrapperSelect}>
      <button
					type="button"
					className="tool__btn"
					data-btn="list"
					data-list="ul"
				>
					POINT
				</button>
				<button
					type="button"
					className="tool__btn"
					data-btn="list"
					data-list="ol"
				>
					NUMBER
				</button>
			</div>
		</div>
	);
};

export default ListTypeSelect