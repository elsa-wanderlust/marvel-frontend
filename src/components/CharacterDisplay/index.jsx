import "./characterDisplay.css";
import { Link } from "react-router-dom";

const CharacterDisplay = ({ data }) => {
  const { thumbnail, _id, name, description } = data;

  // returns the file path of the character's image if there is one in the Marvel API
  let imgCharacter = "";
  if (thumbnail.path.slice(-19) !== "image_not_available") {
    imgCharacter = `${thumbnail.path}/portrait_small.${thumbnail.extension}`;
  }

  // DECLARE FUNCTIONS
  // add to favorites
  const addNewFav = () => {
    const currentFavStored = localStorage.getItem("FavCharacters");
    let currentFav = currentFavStored ? JSON.parse(currentFavStored) : [];
    const newFav = { _id, name, description, imgCharacter };
    currentFav.push(newFav);
    localStorage.setItem("FavCharacters", JSON.stringify(currentFav));
  };
  // remove from favorites
  const removeFromFav = () => {
    const currentFav = JSON.parse(localStorage.getItem("FavCharacters"));
    console.log(currentFav);
    let newFavTab = [];
    for (let i = 0; i < currentFav.length; i++) {
      if (currentFav[i]._id !== _id) {
        newFavTab.push(currentFav[i]);
      }
    }
    localStorage.setItem("FavCharacters", JSON.stringify(newFavTab));
  };

  return (
    <div className="one-character">
      <Link to={`/comics/${_id}`} state={{ name: name }}>
        <p>{name}</p>
        {description && <p>{description}</p>}
        {imgCharacter ? (
          <img src={imgCharacter} alt={`image of ${name}`} />
        ) : (
          <p>no picture available</p>
        )}
      </Link>
      <button onClick={addNewFav}>Add to favorites Characters</button>
      <button onClick={removeFromFav}>Remove from favorites Characters</button>
    </div>
  );
};

export default CharacterDisplay;
