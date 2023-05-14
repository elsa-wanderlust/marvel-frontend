import Cookies from "js-cookie";
import axios from "axios";

const EachFavoriteCharacters = ({
  _id,
  name,
  description,
  img,
  setFavCharactersDB,
  favCharactersDB,
}) => {
  //   DECLARE VARIABLE
  const token = Cookies.get("tokenMarvel");
  // UPDATE FAV FUNCTION - what happens when clicking on awesome protection shield
  const removeFav = async () => {
    // if token => remove from DB
    if (token) {
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
          if (favCharactersDB[i].marvelId !== _id) {
            favCharactersDBCopy.push(favCharactersDB[i]);
          }
        }
        setFavCharactersDB(favCharactersDBCopy);
      } catch (error) {
        console.log(error.message);
      }
    }
    // if no token => remove from local storage
    if (!token) {
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
    <div className="a-character comic a-fav">
      <div className="a-character-details">
        <p className="name">{name}</p>
        <div className="display-img">
          {img ? (
            <img src={img} alt={`image of ${name}`} />
          ) : (
            <p className="no-pic">no picture available</p>
          )}
        </div>
      </div>
      <p className="description">{description}</p>{" "}
      <button onClick={removeFav}>remove from favorites</button>
    </div>
    // </div>
  );
};

export default EachFavoriteCharacters;
