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
  const { name, description } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--7lpgx9xk8rh5.code.run/comics/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="whole-page">
      {isLoading ? (
        <p>page is loading...</p>
      ) : (
        <div className="container characters-comics">
          <p className="name">{name}</p>
          <p>{description}</p>
          {data.comics.length > 0 ? (
            <div className="comics">
              <p>
                {`${name} is featured in ${data.comics.length} comic${
                  data.comics.length > 1 ? "s" : ""
                }`}{" "}
              </p>
              <div className="each-comic">
                {data.comics.map((elem) => {
                  return <ComicDisplay key={elem._id} data={elem} />;
                })}
              </div>
            </div>
          ) : (
            `${name} has not yet been featured in an comics`
          )}
        </div>
      )}
    </div>
  );
};

export default ComicsOfCharacter;
