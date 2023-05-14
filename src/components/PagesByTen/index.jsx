import "./PagesByTen.css";
import { useState } from "react";
import { Icon } from "@iconify/react";
import PagesNumber from "../PageNumbers";

const PagesByTen = ({
  thatPagesbyTen,
  thatPagesbyTenContent,
  totalNumPagesByTen,
  currentPagesByTen,
  setCurrentPagesByTen,
  currentPageNum,
  setCurrentPageNum,
  numberOfPages,
}) => {
  return (
    <div
      className={
        currentPagesByTen === thatPagesbyTen
          ? "button-selected"
          : "button-not-selected"
      }
    >
      <button
        className={
          currentPagesByTen === 0 || currentPagesByTen === 1
            ? "hidden-visibility"
            : ""
        }
        onClick={() => {
          setCurrentPagesByTen(0);
          setCurrentPageNum(numberOfPages[0][0]);
        }}
      >
        <Icon icon="material-symbols:skip-next-rounded" rotate={2} />
      </button>
      <button
        className={currentPagesByTen === 0 ? "hidden-visibility" : ""}
        onClick={() => {
          setCurrentPagesByTen(currentPagesByTen - 1);
          setCurrentPageNum(numberOfPages[currentPagesByTen - 1][0]);
        }}
      >
        <Icon icon="ic:round-navigate-next" rotate={2} />
      </button>
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
      <button
        className={
          currentPagesByTen === totalNumPagesByTen - 1
            ? "hidden-visibility"
            : ""
        }
        onClick={() => {
          setCurrentPagesByTen(currentPagesByTen + 1);
          setCurrentPageNum(numberOfPages[currentPagesByTen + 1][0]);
        }}
      >
        <Icon icon="ic:round-navigate-next" />
      </button>
      <button
        className={
          currentPagesByTen === totalNumPagesByTen - 1 ||
          currentPagesByTen === totalNumPagesByTen - 2
            ? "hidden-visibility"
            : ""
        }
        onClick={() => {
          setCurrentPagesByTen(totalNumPagesByTen - 1);
          setCurrentPageNum(numberOfPages[totalNumPagesByTen - 1][0]);
        }}
      >
        <Icon icon="material-symbols:skip-next-rounded" />
      </button>
    </div>
  );
};

export default PagesByTen;
