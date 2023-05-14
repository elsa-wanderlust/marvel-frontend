import "./characterDisplay.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const CharacterDisplay = ({
  data,
  isFav,
  favCharactersDB,
  setFavCharactersDB,
  setModalVisible,
  setWhichModal,
}) => {
  const { thumbnail, _id, name, description } = data;
  const token = Cookies.get("tokenMarvel");
  const favStoredComics = localStorage.getItem("FavComics");
  const favStoredCharacters = localStorage.getItem("FavCharacters");

  // returns the file path of the character's image if there is one in the Marvel API
  let imgCharacter = "";
  if (thumbnail.path.slice(-19) !== "image_not_available") {
    imgCharacter = `${thumbnail.path}/portrait_medium.${thumbnail.extension}`;
  }

  // UPDATE FAV FUNCTION - what happens when clicking on awesome protection shield
  const updateFav = async () => {
    // if token AND it's not in the fav already => save in DB
    if (token && !isFav) {
      try {
        const response = await axios.post(
          `https://site--marvel-back--7lpgx9xk8rh5.code.run/favorite/characters`,
          {
            marvelId: _id,
            name: name,
            img: imgCharacter,
            description: description,
          },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        let favCharactersDBCopy = [...favCharactersDB];
        favCharactersDBCopy.push(response.data);
        setFavCharactersDB(favCharactersDBCopy);
      } catch (error) {
        console.log(error.message);
      }
    }
    // if token AND it's IS in the fav already => remove from DB
    if (token && isFav) {
      try {
        const response = await axios.delete(
          `https://site--marvel-back--7lpgx9xk8rh5.code.run/favorite/characters/${_id}`,
          {
            headers: { authorization: `Bearer ${token}` },
            // "Content-Type": "multipart/form-data",
          }
        );
        let favCharactersDBCopy = [];
        for (let i = 0; i < favCharactersDB.length; i++) {
          if (favCharactersDB[i] !== _id) {
            favCharactersDBCopy.push(favCharactersDB[i]);
          }
        }
        setFavCharactersDB(favCharactersDBCopy);
      } catch (error) {
        console.log(error.message);
      }
    }
    // if no token AND it's not in the fav already AND that no Comics/Charac are locally saved => opens signup Modal
    if (!token && !isFav && !favStoredComics && !favStoredCharacters) {
      setModalVisible(true);
      setWhichModal("login");
      console.log("here1");
    }
    // if no token AND it's not in the fav already => store locally
    if (!token && !isFav) {
      console.log("here2");
      const currentFavStored = localStorage.getItem("FavCharacters");
      let currentFav = currentFavStored ? JSON.parse(currentFavStored) : [];
      const newFav = { _id, name, description, imgCharacter };
      currentFav.push(newFav);
      localStorage.setItem("FavCharacters", JSON.stringify(currentFav));
      // only to provoke a re-render (and so the super awesome shield changes color)
      let favCharactersDBCopy = [...favCharactersDB];
      setFavCharactersDB(favCharactersDBCopy);
    }
    // if no token AND it's in the fav already => remove from local storage
    if (!token && isFav) {
      console.log("here3");
      const currentFav = JSON.parse(localStorage.getItem("FavCharacters"));
      let newFavTab = [];
      for (let i = 0; i < currentFav.length; i++) {
        if (currentFav[i]._id !== _id) {
          newFavTab.push(currentFav[i]);
        }
      }
      localStorage.setItem("FavCharacters", JSON.stringify(newFavTab));
      // only to provoke a re-render (and so the super duper awesome shield changes color)
      let favCharactersDBCopy = [...favCharactersDB];
      setFavCharactersDB(favCharactersDBCopy);
    }
  };

  return (
    <div className="a-character">
      <div className="a-character-details">
        <Link
          className="link"
          to={`/comics/${_id}`}
          state={{ name: name, description: description }}
        >
          <p className="name">{name}</p>
        </Link>
        <div className="display-img" onClick={updateFav}>
          {imgCharacter ? (
            <img src={imgCharacter} alt={`image of ${name}`} />
          ) : (
            <p className="no-pic">no picture available</p>
          )}
          <Icon
            className={isFav ? "favorite shield" : "notfav shield"}
            icon="mdi:shield-favorite-outline"
            width="30"
            height="30"
            onClick={updateFav}
          />
        </div>

        <Link
          className="link"
          to={`/comics/${_id}`}
          state={{ name: name, description: description }}
        >
          <Icon
            className="triple-dot"
            icon="ic:outline-more-horiz"
            width="30"
            height="30"
          />
        </Link>
      </div>
    </div>
  );
};

export default CharacterDisplay;
