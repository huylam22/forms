import { useField } from "formik";
import React from "react";

const RadioFormik = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex items-center gap-x-3">
      <label className="cursor-pointer custom-radio">
        <input
          type="radio"
          {...field}
          {...props}
          className="hidden"
          // checked={props.checked}
        />
        <div className="bg-white w-full rounded-full h-full cursor-pointer  transition-all"></div>
      </label>
      <label htmlFor={props.id || props.name}>{label}</label>
    </div>
  );
};

export default RadioFormik;
