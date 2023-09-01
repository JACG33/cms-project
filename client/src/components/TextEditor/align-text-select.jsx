import { useRef } from "react";
import { ArrowDown } from "../Svg/Svg";

const AlignTextSelect = () => {
  const wrapperSelect=useRef()
  const toggleSelect=()=>{
    wrapperSelect.current.classList.toggle("tools__wrapper__select__items--show")
  }
	return (
		<div className="tools__wrapper__select">
			<button
				className="tool__btn flex w-full relative z-[1]"
				type="button"
				onClick={toggleSelect}
			>
				TEXT ALIGN
				<ArrowDown />
			</button>
			<div className="tools__wrapper__select__items grid-cols-2 gap-1" ref={wrapperSelect}>
      <button
					type="button"
					className="tool__btn"
					id="left"
					data-btn="align"
					data-align="left"
				>
					left
				</button>
				<button
					type="button"
					className="tool__btn"
					id="center"
					data-btn="align"
					data-align="center"
				>
					center
				</button>
				<button
					type="button"
					className="tool__btn"
					id="right"
					data-btn="align"
					data-align="right"
				>
					right
				</button>
				<button
					type="button"
					className="tool__btn"
					data-btn="align"
					data-align="justify"
				>
					justify
				</button>
			</div>
		</div>
	);
};

export default AlignTextSelect;
