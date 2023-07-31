const Button = ({ children, classButton }) => {
  return (
    <button type="button" className={`btn ${classButton}`}>
      {children}
    </button>
  );
};

export default Button;
