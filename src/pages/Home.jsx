import { useState, useEffect } from "react";
import axios from "axios";

// read the 'README' for the pagination system and terminology

// IMPORT COMPONENTS and FUNCTION
import CharacterDisplay from "../components/CharacterDisplay";
import Filters from "../components/Filters";
import PagesByTen from "../components/PagesByTen";
import handleFilters from "../utils/handleFilters";
import handleNumberOfPages from "../utils/handleNumberOfPages";

const Home = () => {
  // DECLARE STATES
  const [isLoading, setIsLoading] = useState(true); // stores the state of our axios request
  const [data, setData] = useState(""); // stores the data receive
  const [search, setSearch] = useState(""); // stores what's in the search field
  const [limit, setLimit] = useState(100); // results per page (max 100)
  const [numberOfPages, setNumberOfPages] = useState([]); // see info in "../utils/handleNumberOfPages"
  const [currentPagesByTen, setCurrentPagesByTen] = useState(1);
  const [currentPageNum, setCurrentPageNum] = useState(1); // current page number on display
  // CALL FUNCTION TO HANDLE ALL FILTERS
  const filtersQueries = handleFilters(limit, currentPageNum, search);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel--7lpgx9xk8rh5.code.run/characters${filtersQueries}`
          // `http://localhost:3001/characters${filtersQueries}`
        );
        setData(response.data);
        setIsLoading(false);
        setNumberOfPages(handleNumberOfPages(response.data.count, limit));
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    fetchData();
  }, [search, limit, currentPageNum, currentPagesByTen]);

  return (
    <div>
      {isLoading ? (
        <p>page is loading ...</p>
      ) : (
        <div>
          <Filters
            search={search}
            setSearch={setSearch}
            limit={limit}
            setLimit={setLimit}
            setCurrentPageNum={setCurrentPageNum}
            setCurrentPagesByTen={setCurrentPagesByTen}
          />
          {numberOfPages.map((elem, index) => {
            return (
              <PagesByTen
                key={index}
                thatPagesbyTen={index + 1}
                currentPagesByTen={currentPagesByTen}
                setCurrentPagesByTen={setCurrentPagesByTen}
                thatPagesbyTenContent={elem}
                currentPageNum={currentPageNum}
                setCurrentPageNum={setCurrentPageNum}
              />
            );
          })}
          {data.results.length > 0 ? (
            <div>
              {data.results.map((elem) => {
                return <CharacterDisplay key={elem._id} data={elem} />;
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

export default Home;
