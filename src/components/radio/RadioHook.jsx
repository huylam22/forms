import React from "react";
import { useController } from "react-hook-form";

const RadioHook = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: props.value,
  });
  return (
    <label className="cursor-pointer custom-radio">
      <input
        type="radio"
        {...field}
        {...props}
        className="hidden"
        checked={props.checked}
      />
      <div className="bg-white w-full rounded-full h-full cursor-pointer  transition-all"></div>
    </label>
  );
};

export default RadioHook;
