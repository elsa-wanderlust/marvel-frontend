import "./filters.css";

const Filters = ({
  search,
  setSearch,
  limit,
  setLimit,
  setCurrentPageNum,
  setCurrentPagesByTen,
}) => {
  // DECLARE FUNCTIONS TO HANDLE CHANGES
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    // because we consider that if a user starts a new search, the request will be for the whole DB (no kip value)
    // and the new results will be displayed from page 1
    setCurrentPageNum(1);
    setCurrentPagesByTen(1);
  };
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="enter the characters/marvel"
          onChange={handleSearchChange}
          value={search}
        />
        <input
          type="text"
          placeholder="number of result per page - max 100"
          onChange={handleLimitChange}
          value={limit}
        />
      </form>
    </div>
  );
};

export default Filters;
