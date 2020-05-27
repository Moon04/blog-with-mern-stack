import React from "react";

const InputLabel = props => {
  
  const { name, label, type, required, value, error, onChange } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
      </label>
      <input
        autoFocus
        id={name}
        name={name}
        type={type}
        required={required}
        className="form-control"
        value={value}
        onChange={onChange}
      />
      {error && 
        <div className="alert alert-warning">
          {error}
        </div>
      }
    </div>
  );
};

export default InputLabel;
