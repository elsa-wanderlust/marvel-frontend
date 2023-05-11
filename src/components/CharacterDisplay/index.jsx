import "./characterDisplay.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CharacterDisplay = ({ data }) => {
  const { thumbnail, _id, name, description, comics } = data;
  // DECLARE STATE
  const [favCharacter, setFavCharacter] = useState({});

  // returns the file path of the character image if there is one in the Marvel API
  let imgCharacter = "";
  if (thumbnail.path.slice(-19) !== "image_not_available") {
    imgCharacter = `${thumbnail.path}/portrait_small.${thumbnail.extension}`;
  }
  // DECLARE FUNCTION - add to favorites
  const handleAddFav = () => {
    let copyfavCharacter = { ...favCharacter };
    const newFav = { _id, name, description, imgCharacter };
    copyfavCharacter.push(newFav);
  };

  // console.log(localStorage.getItem("favCharacters"));

  useEffect(() => {
    if (localStorage.getItem("favCharacters") === null) {
      localStorage.setItem("favCharacters", JSON.stringify([]));
    }
    // else {
    //   const currentFavCharactersStr = localStorage.getItem("favCharacters");
    //   const currentFavCharactersArr = JSON.parse(currentFavCharactersStr);
    //   const newFavCharactersArr = currentFavCharactersArr.push(favCharacter);
    //   const newFavCharactersStr = JSON.stringify(newFavCharactersArr);
    //   localStorage.setItem(
    //     "favCharacters",
    //     JSON.stringify(newFavCharactersStr)
    //   );
    // }
  }, [favCharacter]);

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
      <button onClick={handleAddFav}>Add to favorites Characters</button>
    </div>
  );
};

export default CharacterDisplay;
