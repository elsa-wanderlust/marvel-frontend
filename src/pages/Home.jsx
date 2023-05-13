import { useState, useEffect } from "react";
import axios from "axios";

// read the 'README' for the pagination system and terminology

// IMPORT COMPONENTS and FUNCTION
import AllCharactersDisplay from "../components/AllCharactersDisplay";
import Filters from "../components/Filters";
import PagesByTen from "../components/PagesByTen";
import handleFilters from "../utils/handleFilters";
import handleNumberOfPages from "../utils/handleNumberOfPages";

const Home = ({ setModalVisible, setWhichModal, whichPage }) => {
  // DECLARE STATES
  const [isLoading, setIsLoading] = useState(true); // stores the state of our axios request
  const [data, setData] = useState(""); // stores the data receive
  const [search, setSearch] = useState(""); // stores what's in the search field
  const [limit, setLimit] = useState(100); // results per page (max 100)
  const [numberOfPages, setNumberOfPages] = useState([]); // see info in "../utils/handleNumberOfPages"
  const [currentPagesByTen, setCurrentPagesByTen] = useState(0); // pagesByTen is based on index of numberOfPages
  const [currentPageNum, setCurrentPageNum] = useState(1); // pagesNumver is based on index+1 of pagesByTen (pages num dont start at 0)
  // CALL FUNCTION TO HANDLE ALL FILTERS
  const filtersQueries = handleFilters(limit, currentPageNum, search);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--7lpgx9xk8rh5.code.run/characters${filtersQueries}`
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

  // NUMBER OF RESULTS PER PAGE CHANGE: similarly, it'll change the display of all the results,
  // and the new results will be displayed from page 1
  const handleLimitChange = (num) => {
    setLimit(num);
    setCurrentPageNum(1);
    setCurrentPagesByTen(0);
  };

  return (
    <div className="whole-page">
      {isLoading ? (
        <p>page is loading ...</p>
      ) : (
        <div className="container">
          <div className="intro">
            <span>
              EXPLORE THE WORLD OF MARVEL and SELECT YOUR FAVORITE CHARACTERS
              AND COMICS !
            </span>
          </div>
          <Filters
            search={search}
            setSearch={setSearch}
            limit={limit}
            setLimit={setLimit}
            setCurrentPageNum={setCurrentPageNum}
            setCurrentPagesByTen={setCurrentPagesByTen}
            whichPage={whichPage}
          />
          <div>
            {/* <input
              type="text"
              placeholder="number of result per page - max 100"
              onChange={handleLimitChange}
              value={limit}
            /> */}
            {numberOfPages.map((elem, index) => {
              return (
                <div className="page-system">
                  <div className="page-limit">
                    {index === currentPagesByTen && (
                      <div>
                        <p
                          className={limit === 25 && "selected"}
                          onClick={() => {
                            handleLimitChange(25);
                          }}
                        >
                          25
                        </p>
                        <p
                          className={limit === 50 && "selected"}
                          onClick={() => {
                            handleLimitChange(50);
                          }}
                        >
                          50
                        </p>
                        <p
                          className={limit === 75 && "selected"}
                          onClick={() => {
                            handleLimitChange(75);
                          }}
                        >
                          75
                        </p>
                        <p
                          className={limit === 100 && "selected"}
                          onClick={() => {
                            handleLimitChange(100);
                          }}
                        >
                          100
                        </p>
                        <span>results per page</span>
                      </div>
                    )}
                  </div>
                  <PagesByTen
                    key={index}
                    thatPagesbyTen={index}
                    thatPagesbyTenContent={elem}
                    totalNumPagesByTen={numberOfPages.length}
                    currentPagesByTen={currentPagesByTen}
                    setCurrentPagesByTen={setCurrentPagesByTen}
                    currentPageNum={currentPageNum}
                    setCurrentPageNum={setCurrentPageNum}
                    numberOfPages={numberOfPages}
                    limit={limit}
                    setLimit={setLimit}
                  />
                </div>
              );
            })}
          </div>

          {data.results.length > 0 ? (
            <div>
              <AllCharactersDisplay
                data={data}
                setModalVisible={setModalVisible}
                setWhichModal={setWhichModal}
              />
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
