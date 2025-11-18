const Button = ({ children, type, version, isDisabled }) => {
  return (
    <button className={`btn btn-${version}`} type={type} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
