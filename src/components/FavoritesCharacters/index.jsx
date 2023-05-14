import "./favoritesCharacters.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

// IMPORT COMPONENT
import EachFavoriteCharacters from "../EachFavoriteCharacters";

const FavoritesCharacters = () => {
  // DECLARE STATES and VARIABLE
  const [isLoading, setIsLoading] = useState(true);
  const [favCharactersDB, setFavCharactersDB] = useState([]);
  const token = Cookies.get("tokenMarvel");

  // FUNCTIONS TO GET ALL THE FAVORITE COMICS (all details)
  // if token : check DB
  useEffect(() => {
    if (token) {
      const fetchFavoriteCharacters = async () => {
        try {
          const response = await axios.get(
            `https://site--marvel-back--7lpgx9xk8rh5.code.run/favorite/characters/allDetails`,
            {
              headers: { authorization: `Bearer ${token}` },
            }
          );
          setFavCharactersDB(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchFavoriteCharacters();
    }
  }, []);
  // if no token, checK local storage
  let favCharactersLocal = [];
  if (!token) {
    const favStored = localStorage.getItem("FavCharacters");
    favCharactersLocal = favStored ? JSON.parse(favStored) : "";
  }

  return (
    <div>
      {isLoading && token ? (
        <p>page is loading...</p>
      ) : (
        <div>
          {token && favCharactersDB.length > 0 ? (
            <div className="fav-category container">
              <p>My favorite characters</p>
              <div className="all-fav">
                {favCharactersDB.map((elem) => {
                  return (
                    <EachFavoriteCharacters
                      key={elem._id}
                      _id={elem.marvelId}
                      name={elem.name}
                      description={elem.description}
                      img={elem.img}
                      favCharactersDB={favCharactersDB}
                      setFavCharactersDB={setFavCharactersDB}
                    />
                  );
                })}
              </div>
            </div>
          ) : !token && favCharactersLocal.length > 0 ? (
            <div className="fav-category container">
              <p>My favorite characters</p>
              <div className="all-fav">
                {favCharactersLocal.map((elem) => {
                  return (
                    <EachFavoriteCharacters
                      key={elem._id}
                      _id={elem._id}
                      name={elem.name}
                      description={elem.description}
                      img={elem.imgCharacter}
                      favCharactersDB={favCharactersDB}
                      setFavCharactersDB={setFavCharactersDB}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="container">
              it seems you don't have any favorite characters saved yet
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesCharacters;
