import { useState, useEffect } from "react";
import axios from "axios";

// IMPORT COMPONENT
import ComicDisplay from "../components/ComicDisplay";

const Comics = () => {
  // DECLARE STATES
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/comics");
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>page is loading...</p>
      ) : (
        <div>
          {data.results.map((elem) => {
            return <ComicDisplay key={elem._id} data={elem} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Comics;
