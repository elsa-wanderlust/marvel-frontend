const PagesNumber = ({ thisPageNumber, currentPageNum, setCurrentPageNum }) => {
  return (
    <div>
      <button
        onClick={() => {
          setCurrentPageNum(thisPageNumber);
        }}
      >
        {thisPageNumber}
      </button>
    </div>
  );
};

export default PagesNumber;
