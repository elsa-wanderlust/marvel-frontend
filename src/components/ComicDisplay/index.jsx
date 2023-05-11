import "./comicDisplay.css";

const ComicDisplay = ({ data }) => {
  const { thumbnail, _id, title, description } = data;
  // returns the file path of the comic's image if there is one in the Marvel API
  let imgComic = "";
  if (thumbnail.path.slice(-19) !== "image_not_available") {
    imgComic = `${thumbnail.path}/portrait_small.${thumbnail.extension}`;
  }

  // DECLARE FUNCTIONS
  // add to favorites
  const addNewFav = () => {
    const currentFavStored = localStorage.getItem("FavComics");
    let currentFav = currentFavStored ? JSON.parse(currentFavStored) : [];
    const newFav = { _id, title, description, imgComic };
    currentFav.push(newFav);
    localStorage.setItem("FavComics", JSON.stringify(currentFav));
  };
  // remove from favorites
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

  return (
    <div className="each-comic">
      <p>{title}</p>
      <img src={imgComic} alt={`poster of ${title}`} />
      <p>{description}</p>
      <button onClick={addNewFav}>Add to favorites Comics</button>
      <button onClick={removeFromFav}>Remove from favorites Comics</button>
    </div>
  );
};

export default ComicDisplay;
