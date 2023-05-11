import "./pagesByTen.css";
import { useState } from "react";

import PagesNumber from "../PageNumbers";

const PagesByTen = ({
  thatPagesbyTen,
  currentPagesByTen,
  setCurrentPagesByTen,
  thatPagesbyTenContent,
  currentPageNum,
  setCurrentPageNum,
}) => {
  // name for the 'pageByTen' button
  let pagesByTenName = "";
  if (thatPagesbyTenContent.length === 1) {
    pagesByTenName = `get to page ${thatPagesbyTenContent[0]}`;
  } else {
    pagesByTenName = `get to pages ${thatPagesbyTenContent[0]} to ${
      thatPagesbyTenContent[thatPagesbyTenContent.length - 1]
    }`;
  }
  // when clicking on pageByTen button:
  // - this button will be selected (for CSS use only)
  // - we want the first page number of that group to be selected
  const handlePagesByTenClick = () => {
    setCurrentPagesByTen(thatPagesbyTen);
    setCurrentPageNum(thatPagesbyTenContent[0]);
  };

  return (
    <div
      className={
        currentPagesByTen === thatPagesbyTen
          ? "button-selected"
          : "button-not-selected"
      }
    >
      <button onClick={handlePagesByTenClick}>{pagesByTenName}</button>
      {thatPagesbyTenContent.map((elem, index) => {
        return (
          <PagesNumber
            key={`${elem}-${index}`}
            thatPageNumber={elem}
            currentPageNum={currentPageNum}
            setCurrentPageNum={setCurrentPageNum}
          />
        );
      })}
    </div>
  );
};

export default PagesByTen;
