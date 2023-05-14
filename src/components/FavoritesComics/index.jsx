import "./favoritesComics.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

// IMPORT COMPONENT
import EachFavoriteComics from "../EachFavoriteComics";

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
          {token && favComicsDB.length > 0 ? (
            <div className="fav-category container">
              <p>My favorite comics</p>
              <div className="all-fav">
                {favComicsDB.map((elem) => {
                  return (
                    <EachFavoriteComics
                      key={elem._id}
                      _id={elem.marvelId}
                      name={elem.title}
                      description={elem.description}
                      img={elem.img}
                      favComicsDB={favComicsDB}
                      setFavComicsDB={setFavComicsDB}
                    />
                  );
                })}
              </div>
            </div>
          ) : !token && favComicsLocal.length > 0 ? (
            <div className="fav-category container">
              <p>My favorite comics</p>
              <div className="all-fav">
                {favComicsLocal.map((elem) => {
                  return (
                    <EachFavoriteComics
                      key={elem._id}
                      _id={elem._id}
                      name={elem.title}
                      description={elem.description}
                      img={elem.imgComic}
                      favComicsDB={favComicsDB}
                      setFavComicsDB={setFavComicsDB}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="container">
              it seems you don't have any favorite comics saved yet
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesComics;
