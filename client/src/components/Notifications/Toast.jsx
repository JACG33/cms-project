import { useEffect, useRef, useState } from "react";
import { AlertIcon, CheckIcon, XIcon } from "../Svg/Svg";
import "./toast.css";

const Item = ({ messageType, message, time }) => {
	const timerRef = useRef(null);
	const timertRef2 = useRef(null);
	const timertRef3 = useRef(7);

	const handleClick = () => setStatus("close");

	const [status, setStatus] = useState("close");
	useEffect(() => {
		timertRef3.current += time;
		timerRef.current = setTimeout(() => setStatus("open"), `${time}50`);
		timertRef2.current = setTimeout(
			() => setStatus("close"),
			`${timertRef3.current}000`,
		);
		return () => {
			clearTimeout(timerRef.current);
			clearTimeout(timertRef2.current);
		};
	}, []);

	return (
		<>
			{status === "open" && (
				<div
					className={`toast__item toast__item--${messageType.toLowerCase()}`}
				>
					<div className="toast__item__icon">
						{messageType.toLowerCase() === "error" && <AlertIcon />}
						{messageType.toLowerCase() === "success" && <CheckIcon />}
					</div>
					<div>
						<span>{messageType}</span>
						<p>{message}</p>
					</div>
					<div>
						<button type="button" onClick={handleClick}>
							<XIcon />
						</button>
					</div>
				</div>
			)}
		</>
	);
};

const Toast = ({ messageType, data }) => {
	return (
		<div className="fixed right-0 bottom-3 grid gap-4 transition-all">
			{data.length > 0 ? (
				data.map((ele, index) => (
					<Item
						key={crypto.randomUUID()}
						message={ele.message}
						messageType={messageType}
						time={index + 1}
					/>
				))
			) : (
				<Item message={data.message} messageType={messageType} time={1} />
			)}
		</div>
	);
};

export default Toast;
