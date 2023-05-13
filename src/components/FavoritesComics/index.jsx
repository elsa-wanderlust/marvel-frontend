import "./favoritesComics.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

// IMPORT COMPONENT
import EachFavorite from "../eachFavorite";

const FavoritesComics = () => {
  // DECLARE STATES and VARIABLE
  const [isLoading, setIsLoading] = useState(true);
  const [favComicsDB, setFavComicsDB] = useState([]);
  const token = Cookies.get("tokenMarvel");

  // FUNCTIONS TO GET ALL THE FAVORITE COMICS (all details)
  // if token : check DB
  useEffect(() => {
    if (token) {
      const fetchFavoriteComics = async () => {
        try {
          const response = await axios.get(
            `https://site--marvel-back--7lpgx9xk8rh5.code.run/favorite/comics/allDetails`,
            {
              headers: { authorization: `Bearer ${token}` },
            }
          );
          setFavComicsDB(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchFavoriteComics();
    }
  }, []);
  // if no token, checK local storage
  let favComicsLocal = [];
  if (!token) {
    const favStored = localStorage.getItem("FavComics");
    favComicsLocal = favStored ? JSON.parse(favStored) : "";
  }

  return (
    <div>
      {isLoading && token ? (
        <p>page is loading...</p>
      ) : (
        <div>
          {token && favComicsDB ? (
            favComicsDB.map((elem) => {
              return (
                <EachFavorite
                  key={elem._id}
                  _id={elem._id}
                  name={elem.title}
                  description={elem.description}
                  img={elem.imgComic}
                  favComicsDB={favComicsDB}
                  setFavComicsDB={setFavComicsDB}
                />
              );
            })
          ) : !token && favComicsLocal ? (
            favComicsLocal.map((elem) => {
              return (
                <EachFavorite
                  key={elem._id}
                  _id={elem._id}
                  name={elem.title}
                  description={elem.description}
                  img={elem.imgComic}
                  favComicsDB={favComicsDB}
                  setFavComicsDB={setFavComicsDB}
                />
              );
            })
          ) : (
            <p>it seems you don't have any favorite Comics saved yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesComics;
