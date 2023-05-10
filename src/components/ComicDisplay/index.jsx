import "./comicDisplay.css";

const ComicDisplay = ({ data }) => {
  const { description, thumbnail, title } = data;
  const imgComic = `${thumbnail.path}/portrait_small.${thumbnail.extension}`;

  return (
    <div className="each-comic">
      <p>{title}</p>
      <img src={imgComic} alt={`poster of ${title}`} />
      <p>{description}</p>
    </div>
  );
};

export default ComicDisplay;
