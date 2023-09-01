export const CheckIcon = () => (
	<svg
		role="CheckIcon"
		xmlns="http://www.w3.org/2000/svg"
		className="icon icon-tabler icon-tabler-check text-green-500"
		width={"24"}
		height={"24"}
		viewBox={"0 0 24 24"}
		strokeWidth="2"
		stroke="currentColor"
		fill="none"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M5 12l5 5l10 -10" />
	</svg>
);

export const AlertIcon = () => (
	<svg
		role="AlertIcon"
		xmlns="http://www.w3.org/2000/svg"
		className="icon icon-tabler icon-tabler-alert-circle text-red-500"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		strokeWidth="2"
		stroke="currentColor"
		fill="none"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
		<path d="M12 8v4" />
		<path d="M12 16h.01" />
	</svg>
);

export const XIcon = () => (
	<svg
		role="XIcon"
		xmlns="http://www.w3.org/2000/svg"
		className="icon icon-tabler icon-tabler-circle-x"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		strokeWidth="2"
		stroke="currentColor"
		fill="none"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M10 10l4 4m0 -4l-4 4" />
	</svg>
);

export const ArrowDown = () => (
	<svg
		role="ArrowDown"
		xmlns="http://www.w3.org/2000/svg"
		className="icon icon-tabler icon-tabler-chevron-down"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		strokeWidth="2"
		stroke="currentColor"
		fill="none"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M6 9l6 6l6 -6" />
	</svg>
);

export const Logo = ({ css, wid = 80, hei = 80 }) => (
	<svg
		role="Logo"
		width={wid}
		height={hei}
		version="1.1"
		viewBox="0 0 21.167 21.167"
		xmlns="http://www.w3.org/2000/svg"
		className={css}
	>
		<rect
			x="-.0011849"
			width="21.17"
			height="21.17"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="5.2924"
		/>
		<path
			d="m-0.0011849 1.0718 20.694 0.015448-20.209 9.5794 20.212 0.00855-20.22 9.5262"
			fill="none"
			stroke="#fff"
			strokeLinejoin="bevel"
			strokeWidth="2.117"
		/>
	</svg>
);
