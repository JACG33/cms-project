import { useRef } from "react";
import { ArrowDown } from "../Svg/Svg";

const FontBoldSlect = () => {
  const wrapperSelect=useRef()
  const toggleSelect=()=>{
    wrapperSelect.current.classList.toggle("tools__wrapper__select__items--show")
  }
	return (
		<div className="tools__wrapper__select">
			<button className="tool__btn flex w-full relative z-[1]"type="button" onClick={toggleSelect}>
				BOLD
				<ArrowDown />
			</button>
			<div className="tools__wrapper__select__items" ref={wrapperSelect}>
				<button
					type="button"
					className="tool__btn"
					data-btn="stylefont"
					data-style="strong"
				>
					STRONG
				</button>
				<button
					type="button"
					className="tool__btn"
					data-btn="stylefont"
					data-style="b"
				>
					BOLD
				</button>
			</div>
		</div>
	);
};

export default FontBoldSlect