import "./filters.css";

const Filters = ({
  search,
  setSearch,
  limit,
  setLimit,
  setCurrentPageNum,
  setCurrentPagesByTen,
  whichPage,
}) => {
  // DECLARE FUNCTIONS TO HANDLE CHANGES
  // SEARCH CHANGE: because we consider that if a user starts a new search, the request will be for the whole DB (no skip value)
  // and the new results will be displayed from page 1
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPageNum(1);
    setCurrentPagesByTen(0);
  };
  // NUMBER OF RESULTS PER PAGE CHANGE: similarly, it'll change the display of all the results,
  // and the new results will be displayed from page 1
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setCurrentPageNum(1);
    setCurrentPagesByTen(0);
  };

  return (
    <form className="filter container">
      <input
        type="text"
        placeholder={`search for ${whichPage}`}
        onChange={handleSearchChange}
        value={search}
      />
      {/* <input
        type="text"
        placeholder="number of result per page - max 100"
        onChange={handleLimitChange}
        value={limit}
      /> */}
    </form>
  );
};

export default Filters;
