import { Heart, HeartFill } from "react-bootstrap-icons";
import Constants from "../constants/Constants";
import "./MovieCard.css";
import FavService from "../services/FavService";
import { useState } from "react";

export default function MovieCard(props) {
  const movie = props.movie;
  const fullpath = movie.poster_path
    ? Constants.IMG_BASE_URL + movie.poster_path
    : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

  const movieReleaseDate = movie.release_date;

  const [isFav, setFav] = useState(isFavMovie(movie.id));

  const months = [
    "none",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function handleFavClick() {
    FavService.changeFav(movie.id);
    setFav(isFavMovie(movie.id));
  }

  function isFavMovie(id) {
    return FavService.isFav(id);
  }

  function loadPropsOnClick(event) {
    console.log(event.target);
    console.log(event.target.tagName.toLowerCase());
    if (
      event.target.tagName.toLowerCase() !== "svg" &&
      event.target.tagName.toLowerCase() !== "path"
    ) {
      props.onClick();
    }
  }

  return (
    <>
      <div className="card" onClick={loadPropsOnClick}>
        <div className="card-header">
          <button type="button" onClick={handleFavClick}>
            {!isFav && <Heart size="20px" />}

            {isFav && <HeartFill size="20px" />}
          </button>
          <img src={fullpath} width="185px" height="275px" />
        </div>{" "}
        <div className="card-body">
          <div className="movie-title">{movie.title}</div>
          <div className="movie-release-date">{movie["release_date"]}</div>
          <div className="movie-genres">
            <p>
              {movie.genre_ids.map((id) => (
                <p className="genre">{Constants.GENRES_MOVIES_LIST[id].name}</p>
              ))}
            </p>
          </div>
        </div>
        {movieReleaseDate && (
          <div className="card-footer">
            {movieReleaseDate.substring(8, 10)}
            {" " + months[parseInt(movieReleaseDate.substring(5, 7))]}
            {" " + movieReleaseDate.substring(0, 4)}
          </div>
        )}
      </div>
    </>
  );
}
