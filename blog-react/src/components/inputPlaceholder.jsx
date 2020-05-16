import React from "react";

const InputPlaceholder = props => {
  const { name, placeholder, type, value, error, onChange } = props;
  return (
    <div className="form-group">
      <input
        autoFocus
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="form-control"
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default InputPlaceholder;
