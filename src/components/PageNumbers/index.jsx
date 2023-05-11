const PagesNumber = ({ thatPageNumber, currentPageNum, setCurrentPageNum }) => {
  return (
    <button
      onClick={() => {
        setCurrentPageNum(thatPageNumber);
      }}
    >
      {thatPageNumber}
    </button>
  );
};

export default PagesNumber;
