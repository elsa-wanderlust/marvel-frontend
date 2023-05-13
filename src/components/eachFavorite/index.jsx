import Cookies from "js-cookie";
import axios from "axios";

const EachFavorite = ({
  _id,
  name,
  description,
  img,
  setFavComicsDB,
  favComicsDB,
}) => {
  //   DECLARE VARIABLE
  const token = Cookies.get("tokenMarvel");

  //   DECLARE FUNCTION TO REMOVE FROM FAV
  const removeFav = async () => {
    if (token) {
      try {
        const response = await axios.delete(
          `https://site--marvel-back--7lpgx9xk8rh5.code.run/favorite/comics/${_id}`,
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
    }
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
  console.log("here");
  return (
    <div className="each-favorite">
      <p>{name}</p>
      <img src={img} alt={`poster of ${name}`} />
      <p>{description}</p>
      <button onClick={removeFav}>remove from favorites</button>
    </div>
  );
};

export default EachFavorite;
