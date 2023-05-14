import Cookies from "js-cookie";
import axios from "axios";

const EachFavoriteComics = ({
  _id,
  name,
  description,
  img,
  setFavComicsDB,
  favComicsDB,
}) => {
  //   DECLARE VARIABLE
  const token = Cookies.get("tokenMarvel");

  // UPDATE FAV FUNCTION - what happens when clicking on awesome protection shield
  const removeFav = async () => {
    // if token => remove from DB
    if (token) {
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
    // if no token => remove from local storage
    if (!token) {
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

export default EachFavoriteComics;
