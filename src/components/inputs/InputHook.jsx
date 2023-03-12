import React from "react";
import { useController } from "react-hook-form";

const InputHook = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <input
      type="text"
      className="outline-none border border-gray-100 bg-white focus:border-blue-500 transition-all p-4 rounded-lg focus:shadow-lg"
      {...field}
      {...props}
    />
  );
};

export default InputHook;
