import "./loader.css";
export const Loader = ({ css }) => {
	return (
		<div className={`wrapper__loader wrap__loader--show ${css}`}>
			<div className="loader" />
		</div>
	);
};
