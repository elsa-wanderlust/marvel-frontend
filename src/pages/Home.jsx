import { useState, useEffect } from "react";
import axios from "axios";

// read the 'README' for the pagination systema and terminology

// IMPORT COMPONENTS and FUNCTION
import CharacterDisplay from "../components/CharacterDisplay";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import handleFilters from "../utils/handleFilters";

const Home = ({ whichPage }) => {
  // DECLARE STATES
  const [isLoading, setIsLoading] = useState(true); // stores the state of our axios request
  const [data, setData] = useState(""); // stores the data receive
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(100);
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  // CALL FUNCTION TO HANDLE ALL FILTERS
  const filtersQueries = handleFilters(
    whichPage,
    limit,
    currentPageNum,
    search
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/characters${filtersQueries}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    fetchData();
  }, [search, limit, pageNumber]);

  const numberOfPagesTotal = Math.ceil(data.count / limit);
  const pageTab = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pageTab.push(i);
  }
  setNumberOfPages(pageTab);

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
          />
          {numberOfPages.map((elem, index) => {
            return (
              <Pagination
                key={index}
                thisPageNumber={elem}
                currentPageNum={currentPageNum}
                setCurrentPage={setCurrentPage}
              />
            );
          })}
          {data.results.map((elem) => {
            return <CharacterDisplay key={elem._id} data={elem} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
