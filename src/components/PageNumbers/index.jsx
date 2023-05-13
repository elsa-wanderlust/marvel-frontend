const PagesNumber = ({ thatPageNumber, currentPageNum, setCurrentPageNum }) => {
  return (
    <button
      className={thatPageNumber === currentPageNum ? "page-selected" : ""}
      onClick={() => {
        setCurrentPageNum(thatPageNumber);
      }}
    >
      {thatPageNumber}
    </button>
  );
};

export default PagesNumber;
