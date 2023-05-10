import { useState, useEffect } from "react";
import axios from "axios";

// read the 'README' for the pagination system and terminology

// IMPORT COMPONENTS and FUNCTION
import ComicDisplay from "../components/ComicDisplay";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import handleFilters from "../utils/handleFilters";

const Comics = () => {
  // DECLARE STATES
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [search, setSearch] = useState(""); // stores what's in the search field
  const [limit, setLimit] = useState(100); // results per page (max 100)
  const [numberOfPages, setNumberOfPages] = useState([]); // depending of data and limit, number of pages available
  const [currentPageNum, setCurrentPageNum] = useState(1); // current page number on display
  // CALL FUNCTION TO HANDLE ALL FILTERS
  const filtersQueries = handleFilters(limit, currentPageNum, search);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/comics${filtersQueries}`
        );
        setData(response.data);
        setIsLoading(false);
        const numberOfPagesTotal = Math.ceil(response.data.count / limit);
        const pageTab = [];
        for (let i = 1; i <= numberOfPagesTotal; i++) {
          pageTab.push(i);
        }
        setNumberOfPages(pageTab);
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    fetchData();
  }, [search, limit, currentPageNum]);

  return (
    <div>
      {isLoading ? (
        <p>page is loading...</p>
      ) : (
        <div>
          <Filters
            search={search}
            setSearch={setSearch}
            limit={limit}
            setLimit={setLimit}
          />
          {numberOfPages.map((elem, index) => {
            return (
              <Pagination
                key={index}
                thisPageNumber={elem}
                currentPageNum={currentPageNum}
                setCurrentPageNum={setCurrentPageNum}
              />
            );
          })}
          {data.results.length > 0 ? (
            <div>
              {data.results.map((elem) => {
                return <ComicDisplay key={elem._id} data={elem} />;
              })}
            </div>
          ) : (
            <p>There are no results matching your request</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Comics;
