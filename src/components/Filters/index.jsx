import "./filters.css";

const Filters = ({ search, setSearch, limit, setLimit }) => {
  // DECLARE FUNCTIONS TO HANDLE CHANGES
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
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
