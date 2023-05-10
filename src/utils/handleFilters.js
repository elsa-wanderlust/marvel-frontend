// concanate the filters (search field + number of results per page + page number)
// into a String, that will be send as query to our backend server

const handleFilters = (whichPage, limit, currentPage, search) => {
  let filter = "?";
  // by default = limit is 100 (cant be higher, due to Marvel API setup)
  if (limit < 100) {
    filter = filter.concat(`limit=${limit}`);
  } else {
    filter = filter.concat(`limit=100`);
  }
  // adds how many results are to be skipped (0 if on page 1)
  filter = filter.concat(`&skip=${(currentPage - 1) * limit}`);
  // search in name if on characters page ; search in title if on comics page
  if (whichPage === "characters" && search) {
    filter = filter.concat(`&name=${search}`);
  } else if (whichPage === "comics" && search) {
    filter = filter.concat(`&title=${search}`);
  }
  return filter;
};

export default handleFilters;
