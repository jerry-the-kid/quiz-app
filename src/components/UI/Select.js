import React from 'react';

const Select = React.forwardRef((props, ref) => {
  return (
    <>
      <label htmlFor={props.id}>{props.name}</label>
      <select id={props.id} name={props.id} ref={ref}>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </>
  );
});

export default Select;
