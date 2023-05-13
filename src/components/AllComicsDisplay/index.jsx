import "./allComicsDisplay.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// IMPORT COMPONENTS
import ComicDisplay from "../ComicDisplay";

const AllComicsDisplay = ({ data }) => {
  // DECLARE STATES
  const [isLoading, setIsLoading] = useState(false);
  const [favComicsDB, setFavComicsDB] = useState([]);
  const token = Cookies.get("tokenMarvel");

  // FUNCTIONS TO GET ALL THE FAVORITE COMICS
  // in the DB if there is a token
  useEffect(() => {
    if (token) {
      const fetchFavoriteComics = async () => {
        try {
          const response = await axios.get(
            `https://site--marvel-back--7lpgx9xk8rh5.code.run/favorite/comics`,
            {
              headers: { authorization: `Bearer ${token}` },
            }
          );
          setFavComicsDB(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchFavoriteComics();
    }
  }, []);
  // if no token, it checks the local storage
  let favComicsLocal = [];
  if (!token) {
    const favStored = localStorage.getItem("FavComics");
    const favArray = favStored ? JSON.parse(favStored) : "";
    for (let i = 0; i < favArray.length; i++) {
      favComicsLocal.push(favArray[i]._id);
    }
  }

  return (
    <div>
      {isLoading ? (
        <p>page is loading...</p>
      ) : (
        <div>
          {data.results.map((elem) => {
            let isFav = false;
            // if token: isFav === true, if the comicsId is in 'favComicsDB'
            if (token) {
              if (favComicsDB.indexOf(elem._id) !== -1) {
                isFav = true;
              }
              // if no token: isFav === true, if the comicsId is in 'favComicsLocal'
            } else {
              if (favComicsLocal.indexOf(elem._id) !== -1) {
                isFav = true;
              }
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
