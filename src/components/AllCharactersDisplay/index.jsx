import "./allCharactersDisplay.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// IMPORT COMPONENTS
import CharacterDisplay from "../CharacterDisplay";

const AllCharactersDisplay = ({
  data,
  offeredLogin,
  setOfferedLogin,
  setModalVisible,
  setWhichModal,
}) => {
  // DECLARE STATES and VARIABLE
  const [isLoading, setIsLoading] = useState(true);
  const [favCharactersDB, setFavCharactersDB] = useState([]);
  const token = Cookies.get("tokenMarvel");

  // FUNCTIONS TO GET ALL THE FAVORITE CHARACTERS
  // in the DB if there is a token = returns MarvelID only
  useEffect(() => {
    if (token) {
      const fetchFavoriteCharacters = async () => {
        try {
          const response = await axios.get(
            `https://site--marvel-back--7lpgx9xk8rh5.code.run/favorite/characters`,
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
  // if no token, it checks the local storage = returns MarvelID only
  let favCharactersLocal = [];
  if (!token) {
    const favStored = localStorage.getItem("FavCharacters");
    const favArray = favStored ? JSON.parse(favStored) : "";
    for (let i = 0; i < favArray.length; i++) {
      favCharactersLocal.push(favArray[i]._id);
    }
  }

  return (
    <div>
      {isLoading && token ? (
        <p>page is loading...</p>
      ) : (
        <div>
          {data.results.map((elem) => {
            let isFav = false;
            // if token: isFav === true, if the charactersId is in 'favCharactersDB'
            if (token) {
              if (favCharactersDB.indexOf(elem._id) !== -1) {
                isFav = true;
              }
              // if no token: isFav === true, if the charactersId is in 'favCharactersLocal'
            } else {
              if (favCharactersLocal.indexOf(elem._id) !== -1) {
                isFav = true;
              }
            }
            return (
              <CharacterDisplay
                key={elem._id}
                data={elem}
                isFav={isFav}
                favCharactersDB={favCharactersDB}
                setFavCharactersDB={setFavCharactersDB}
                setModalVisible={setModalVisible}
                setWhichModal={setWhichModal}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllCharactersDisplay;
