import "./pagesByTen.css";
import { useState } from "react";

import PagesNumber from "../PageNumbers";

const PagesByTen = ({
  thisPagesbyTen,
  currentPageNum,
  setCurrentPageNum,
  thisPagesbyTenContent,
  currentPagesByTen,
  setCurrentPagesByTen,
}) => {
  // const [currentPagesByTen, setCurrentPagesByTen] = useState(1);
  // const handleOnClick = () => {
  //   setCurrentPagesByTen(thisPagesbyTen);
  // };
  console.log(thisPagesbyTen);
  return (
    <div
      className={
        currentPagesByTen === thisPagesbyTen
          ? "button-selected"
          : "button-not-selected"
      }
    >
      <button
        onClick={() => {
          setCurrentPagesByTen(thisPagesbyTen);
        }}
      >
        pages Number {thisPagesbyTen}
      </button>
      {thisPagesbyTenContent.map((elem, index) => {
        return (
          <div onClick>
            <PagesNumber
              key={elem}
              thisPageNumber={elem}
              currentPageNum={currentPageNum}
              setCurrentPageNum={setCurrentPageNum}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PagesByTen;
