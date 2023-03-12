import { useEffect, useRef, useState } from "react";

export default function useClickOutside(dom = "button") {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  // CACH 1: DUNG USEREF
  useEffect(() => {
    function handleClickOutSide(e) {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !e.target.matches(dom)
      ) {
        // console.log(nodeRef.current);
        // console.log(e.target);
        setShow(false);
      }
      //   else {
      //     console.log("clcik inside");
      //     console.log(dropDownRef.current);
      //     console.log(e.target);
      //   }
    }
    document.addEventListener("click", handleClickOutSide);

    return () => document.removeEventListener("click", handleClickOutSide);
  }, [dom]);

  // CACH 2: e.StopPagination() --> khong can set ref

  return { nodeRef, show, setShow };
}
