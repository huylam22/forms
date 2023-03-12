import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutside from "../../hooks/useClickOutside";

const DropDownHook = ({
  control,
  setValue,
  name,
  data,
  dropDownLabel = "Select your job",
  ...props
}) => {
  const { show, setShow, nodeRef } = useClickOutside();
  const dropDownValues = useWatch({
    control,
    name: "job",
    defaultValue: "",
  });
  //   console.log(jobValue);

  const handleClickDropDownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.innerText);
  };

  useEffect(() => {
    if (dropDownValues === "") setLabel(dropDownLabel);
  }, [dropDownValues]);

  const [label, setLabel] = useState(dropDownLabel);
  return (
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
        {data.map((item, idx) => (
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
  );
};

export default DropDownHook;
