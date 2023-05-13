import "./comicDisplay.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react";

const ComicDisplay = ({
  data,
  isFav,
  favComicsDB,
  setFavComicsDB,
  setModalVisible,
  setWhichModal,
}) => {
  const { thumbnail, _id, title, description } = data;
  const token = Cookies.get("tokenMarvel");
  const favStoredComics = localStorage.getItem("FavComics");
  const favStoredCharacters = localStorage.getItem("Characters");

  // returns the file path of the comic's image if there is one in the Marvel API
  let imgComic = "";
  if (thumbnail.path.slice(-19) !== "image_not_available") {
    imgComic = `${thumbnail.path}/portrait_small.${thumbnail.extension}`;
  }

  // UPDATE FAV FUNCTION - what happens when clicking on awesome protection shield
  const updateFav = async () => {
    // if token AND it's not in the fav already => save in DB
    if (token && !isFav) {
      try {
        const response = await axios.post(
          `https://site--marvel-back--7lpgx9xk8rh5.code.run/favorite/comics`,
          {
            marvelId: _id,
            name: title,
            img: imgComic,
            description: description,
          },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        let favComicsDBCopy = [...favComicsDB];
        favComicsDBCopy.push(response.data);
        setFavComicsDB(favComicsDBCopy);
      } catch (error) {
        console.log(error.message);
      }
    }
    // if token AND it's IS in the fav already => remove from DB
    if (token && isFav) {
      try {
        const response = await axios.delete(
          `https://site--marvel-back--7lpgx9xk8rh5.code.run/favorite/comics/${_id}`,
          {
            headers: { authorization: `Bearer ${token}` },
            // "Content-Type": "multipart/form-data",
          }
        );
        let favComicsDBCopy = [];
        for (let i = 0; i < favComicsDB.length; i++) {
          if (favComicsDB[i] !== _id) {
            favComicsDBCopy.push(favComicsDB[i]);
          }
        }
        setFavComicsDB(favComicsDBCopy);
      } catch (error) {
        console.log(error.message);
      }
    }
    // if no token AND it's not in the fav already AND that no Comics/Charac are locally saved => opens signup Modal
    if (!token && !isFav && !favStoredComics && !favStoredCharacters) {
      setModalVisible(true);
      setWhichModal("login");
    }
    // if no token AND it's not in the fav already => store locally
    if (!token && !isFav) {
      const currentFavStored = localStorage.getItem("FavComics");
      let currentFav = currentFavStored ? JSON.parse(currentFavStored) : [];
      const newFav = { _id, title, description, imgComic };
      currentFav.push(newFav);
      localStorage.setItem("FavComics", JSON.stringify(currentFav));
      // only to provoke a re-render (and so the super awesome shield changes color)
      let favComicsDBCopy = [...favComicsDB];
      setFavComicsDB(favComicsDBCopy);
    }
    // if no token AND it's in the fav already => remove from local storage
    if (!token && isFav) {
      const currentFav = JSON.parse(localStorage.getItem("FavComics"));
      let newFavTab = [];
      for (let i = 0; i < currentFav.length; i++) {
        if (currentFav[i]._id !== _id) {
          newFavTab.push(currentFav[i]);
        }
      }
      localStorage.setItem("FavComics", JSON.stringify(newFavTab));
      // only to provoke a re-render (and so the super duper awesome shield changes color)
      let favComicsDBCopy = [...favComicsDB];
      setFavComicsDB(favComicsDBCopy);
    }
  };

  return (
    <div className="each-comic">
      <Icon
        className={isFav ? "favorite comic" : "notfav comic"}
        icon="mdi:shield-favorite-outline"
        onClick={updateFav}
      />
      <p className={isFav ? "favorite-com" : "notfav"}>{title}</p>
      {imgComic ? (
        <img src={imgComic} alt={`poster of ${title}`} />
      ) : (
        <p>no picture available</p>
      )}

      <p>{description}</p>
    </div>
  );
};

export default ComicDisplay;
