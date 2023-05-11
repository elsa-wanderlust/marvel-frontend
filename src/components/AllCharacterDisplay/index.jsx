// import "./allCharacterDisplay.css";

import CharacterDisplay from "../components/CharacterDisplay";

const AllCharacterDisplay = ({ data }) => {
  const [favCharacter, setFavCharacter] = useState({});

  return (
    <div>
      {data.length > 0 ? (
        <div>
          {data.map((elem) => {
            return <CharacterDisplay key={elem._id} data={elem} />;
          })}
        </div>
      ) : (
        <p>There are no results matching your request</p>
      )}
    </div>
  );
};

export default AllCharacterDisplay;
