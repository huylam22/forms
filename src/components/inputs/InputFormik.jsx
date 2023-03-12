import { useField } from "formik";
import React from "react";

const InputFormik = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-2 mb-5">
      <label htmlFor={props.id || props.name} className="cursor-pointer">
        {label}
      </label>
      <input
        type="text"
        className="outline-none border border-gray-100 bg-white focus:border-blue-500 transition-all p-4 rounded-lg focus:shadow-lg"
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className="text-sm text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default InputFormik;
