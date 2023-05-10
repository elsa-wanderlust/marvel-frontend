import { useState, useEffect } from "react";
import axios from "axios";

// IMPORT COMPONENTS
import CharacterDisplay from "../components/CharacterDisplay";

const Home = () => {
  // DECLARE STATES
  const [isLoading, setIsLoading] = useState(true); // stores the state of our axios request
  const [data, setData] = useState(""); // stores the data receive

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/characters");
        setData(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>page is loading ...</p>
      ) : (
        <div>
          {data.results.map((elem, index) => {
            return <CharacterDisplay key={index} data={elem} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
