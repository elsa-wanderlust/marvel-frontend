// concanate the filters (search field + number of results per page + page number)
// into a String, that will be send as query to our backend server

const handleFilters = (limit, currentPageNum, search) => {
  let filter = `?limit=${limit}&page=${currentPageNum}`;
  if (search) {
    filter = filter.concat(`&search=${search}`);
  }
  return filter;
};

export default handleFilters;
