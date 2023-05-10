import "./pagination.css";

const Pagination = ({ thisPageNumber, currentPageNum, setcurrentPageNum }) => {
  return (
    <button onClick={setCurrentPageNum(thisPageNumber)}>
      {thisPageNumber}
    </button>
  );
};

export default Pagination;
