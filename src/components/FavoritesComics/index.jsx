import "./favoritesComics.css";

const FavoritesComics = () => {
  const favStored = localStorage.getItem("FavComics");
  let favArray = favStored ? JSON.parse(favStored) : "";

  return (
    <div>
      {favArray ? (
        <div>
          {favArray.map((elem) => {
            return (
              <div key={elem._id}>
                <p>{elem.title}</p>
                <p>{elem.description}</p>
                <img src={elem.imgComic} alt="" />
              </div>
            );
          })}
        </div>
      ) : (
        <p>no favorites</p>
      )}
    </div>
  );
};

export default FavoritesComics;
