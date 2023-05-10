import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // to be able to get the props sent via the link

// IMPORT COMPONENT
import ComicDisplay from "../components/ComicDisplay";

const ComicsOfCharacter = () => {
  // DECLARE STATE(S)
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  // HANDLE PARAMS
  const { id } = useParams();
  // GET PROPS SENT VIA THE LINK
  const location = useLocation();
  const { name } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/comics/${id}`);
        setData(response.data);
        setIsLoading(false);
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
        <div className="characters-comics">
          <p>{`${name} is featured in ${data.comics.length} comic${
            data.comics.length > 1 ? "s" : ""
          }`}</p>
          {data.comics.map((elem) => {
            return <ComicDisplay key={elem._id} data={elem} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ComicsOfCharacter;
