import "./allComicsDisplay.css";
import axios from "axios";
import { useState, useEffect } from "react";

// IMPORT COMPONENTS
import ComicDisplay from "../ComicDisplay";

const AllComicsDisplay = ({ data }) => {
  // DECLARE STATES
  const [isLoading, setIsLoading] = useState(false);
  const [favComicsDB, setFavComicsDB] = useState([]);
  // if connected - we'll get that from the cookies
  const userId = "645d041c64dddc72cee4c4f5"; // TBD to change
  const token = "AhdDXrrl_gjVwdTPtEQvMPghYpyl-tgh"; // TBD to change

  useEffect(() => {
    const fetchFavoriteComics = async () => {
      try {
        const response = await axios.post(
          `https://site--marvel--7lpgx9xk8rh5.code.run/favorite/comics/idMarvel`,
          {
            id: userId,
          },
          {
            headers: { authorization: `Bearer ${token}` },
            "Content-Type": "multipart/form-data",
          }
        );
        setFavComicsDB(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFavoriteComics();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>page is loading...</p>
      ) : (
        <div>
          {data.results.map((elem) => {
            let isFav = false;
            if (favComicsDB.indexOf(elem._id) !== -1) {
              isFav = true;
            }
            return (
              <ComicDisplay
                key={elem._id}
                data={elem}
                isFav={isFav}
                favComicsDB={favComicsDB}
                setFavComicsDB={setFavComicsDB}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllComicsDisplay;
