import { useField } from "formik";
import React, { useEffect, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

const DropDownFormik = ({
  name,
  data,
  dropDownLabel = "Select your job",
  setValue,
  ...props
}) => {
  const { show, setShow, nodeRef } = useClickOutside();
  const [label, setLabel] = useState(dropDownLabel);
  const [field, meta] = useField({ name });
  const handleClickDropDownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.innerText);
  };

  useEffect(() => {
    if (field.value === "") setLabel(dropDownLabel);
  }, [field.value]);

  return (
    <div className="flex flex-col gap-2 mb-5">
      <label htmlFor={props.id || props.name} className="cursor-pointer">
        Are you
      </label>
      <div className="relative" ref={nodeRef}>
        <div
          className="p-5 rounded-lg border border-gray-100 items-center flex bg-white justify-between cursor-pointer"
          onClick={() => {
            setShow(!show);
          }}
        >
          <span>{label}</span>
        </div>
        <div
          className={`absolute top-full left-0 w-full rounded-lg bg-white ${
            show ? "" : "opacity-0 invisible"
          }`}
        >
          {data &&
            data.length > 0 &&
            data.map((item, idx) => (
              <div
                className="p-5 cursor-pointer hover:bg-gray-100"
                onClick={handleClickDropDownItem}
                data-value={item.value}
                key={item.id}
              >
                {item.text}
              </div>
            ))}
        </div>
      </div>
      {meta.touched && meta.error && (
        <div className="text-sm text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default DropDownFormik;
