import "./comicDisplay.css";
import axios from "axios";
import { useState } from "react";

const ComicDisplay = ({ data, isFav, favComicsDB, setFavComicsDB }) => {
  const { thumbnail, _id, title, description } = data;
  const token = "AhdDXrrl_gjVwdTPtEQvMPghYpyl-tgh"; // TBD to change

  // returns the file path of the comic's image if there is one in the Marvel API
  let imgComic = "";
  if (thumbnail.path.slice(-19) !== "image_not_available") {
    imgComic = `${thumbnail.path}/portrait_small.${thumbnail.extension}`;
  }

  // DECLARE FUNCTIONS
  // add to favorites locally
  const addNewFav = () => {
    const currentFavStored = localStorage.getItem("FavComics");
    let currentFav = currentFavStored ? JSON.parse(currentFavStored) : [];
    const newFav = { _id, title, description, imgComic };
    currentFav.push(newFav);
    localStorage.setItem("FavComics", JSON.stringify(currentFav));
  };
  // remove from favorites locally
  const removeFromFav = () => {
    const currentFav = JSON.parse(localStorage.getItem("FavComics"));
    console.log(currentFav);
    let newFavTab = [];
    for (let i = 0; i < currentFav.length; i++) {
      if (currentFav[i]._id !== _id) {
        newFavTab.push(currentFav[i]);
      }
    }
    localStorage.setItem("FavComics", JSON.stringify(newFavTab));
  };

  // add to favorites DB
  const addNewFavDB = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/favorite/comics`,
        { marvelId: _id, name: title, img: imgComic, description: description },
        {
          headers: { authorization: `Bearer ${token}` },
          "Content-Type": "multipart/form-data",
        }
      );
      let favComicsDBCopy = [...favComicsDB];
      favComicsDBCopy.push(response.data);
      setFavComicsDB(favComicsDBCopy);
    } catch (error) {
      console.log(error.message);
    }
  };

  // remove from favorites DB
  const removeFromFavDB = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/favorite/comics/${_id}`,
        {
          headers: { authorization: `Bearer ${token}` },
          "Content-Type": "multipart/form-data",
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
  };

  return (
    <div className="each-comic">
      <p className={isFav ? "favorite" : "notfav"}>{title}</p>
      <img src={imgComic} alt={`poster of ${title}`} />
      <p>{description}</p>
      <button onClick={addNewFav}>Add to favorites Comics Loc </button>
      <button onClick={removeFromFav}>Remove from favorites Comics Loc</button>
      <button onClick={addNewFavDB}>Add to favorites Comics DB </button>
      <button onClick={removeFromFavDB}>Remove from favorites Comics DB</button>
    </div>
  );
};

export default ComicDisplay;
