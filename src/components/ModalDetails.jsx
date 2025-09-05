import axios from "axios";
import { useEffect, useState } from "react";
import "./ModalDetails.css";
import Constants from "../constants/Constants";

export default function ModalDetails(props) {
  const id = props.id;
  const showModal = props.showModal;
  const [stateShowModal, setStateShowModal] = useState(showModal);
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fullpath = movie
    ? movie.poster_path
      ? Constants.IMG_BASE_URL + movie.poster_path
      : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
    : "";

  const API = `https://api.themoviedb.org/3/movie/${id}`;
  const ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTI3OTYyMDU0OWYzMjJlZWVjNGRhMWRkNGI0NmYxYiIsIm5iZiI6MTc1NzAwMDk2OS41MTYsInN1YiI6IjY4YjliNTA5NTVmZjU1YjVlNThjZGUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._kCay39U8QZxq5Dd0ocsHU17ZRCq0XSjDSDhPYzYtcs";

  useEffect(() => {
    if (showModal) {
      setIsLoading(true);
      axios
        .get(API, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        })
        .then((data) => {
          setIsLoading(false);
          setMovie(data.data);
        });
    }
  }, [showModal]);

  function backgroundClick(event) {
    if (event.target === event.currentTarget) {
      props.onDisappear();
    }
  }

  return (
    showModal &&
    movie && (
      <>
        <div
          className={"modal-background " + (showModal ? "show-modal" : "")}
          onClick={backgroundClick}
        >
          <div className={"loader " + (isLoading ? "" : "hidden")}>
            <div className="loaderBar"></div>
          </div>
          <div className="modal">
            <div className="modal-header">
              <div className="img">
                <img
                  src={!isLoading ? fullpath : ""}
                  width="185px"
                  height="275px"
                />
              </div>
              <div className="modal-main-info">
                <p>Title: {!isLoading ? movie.title : ""}</p>
                <p>Original title: {!isLoading ? movie.original_title : ""}</p>
                <p>
                  {!isLoading
                    ? movie.genres.map((genre) => <span>{genre.name}</span>)
                    : ""}
                </p>
                <p>Release date: {!isLoading ? movie.release_date : ""}</p>
              </div>
            </div>

            <div className="modal-more-info">
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </>
    )
  );
}
