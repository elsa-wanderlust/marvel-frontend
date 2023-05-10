import "./characterDisplay.css";
import { Link } from "react-router-dom";

const CharacterDisplay = ({ data }) => {
  const { thumbnail, _id, name, description, comics } = data;

  // returns the file path of the character image if there is one in the Marvel API
  let imgCharacter = "";
  if (thumbnail.path.slice(-19) !== "image_not_available") {
    imgCharacter = `${thumbnail.path}/portrait_small.${thumbnail.extension}`;
  }
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
    </div>
  );
};

export default CharacterDisplay;
