import "./pagination.css";

const Pagination = ({ thisPageNumber, currentPageNum, setCurrentPageNum }) => {
  return (
    <button
      onClick={() => {
        setCurrentPageNum(thisPageNumber);
      }}
    >
      {thisPageNumber}
    </button>
  );
};

export default Pagination;
