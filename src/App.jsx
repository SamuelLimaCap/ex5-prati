import { Link, Search } from "react-bootstrap-icons";
import "./App.css";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import ModalDetails from "./components/ModalDetails";

function App() {
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w185";
  const API_MOVIE_BASE_URL = "https://api.themoviedb.org/3/search/movie";
  const ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTI3OTYyMDU0OWYzMjJlZWVjNGRhMWRkNGI0NmYxYiIsIm5iZiI6MTc1NzAwMDk2OS41MTYsInN1YiI6IjY4YjliNTA5NTVmZjU1YjVlNThjZGUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._kCay39U8QZxq5Dd0ocsHU17ZRCq0XSjDSDhPYzYtcs";

  const [isLoading, setIsLoading] = useState(true);

  const [movies, setMovies] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMovieId, setModalMovieId] = useState(0);
  const [functionsModalIdsList, setFunctionsModalIdsList] = useState({});

  let page = 1;

  function getResponse(type) {
    const response = axios.get(API_MOVIE_BASE_URL, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: {
        query: searchText,
        include_adult: "false",
        page: page,
      },
    });

    setIsLoading(true);

    response
      .then((data) => {
        console.log(data.data.results);
        setIsLoading(false);
        if (type == "initial") {
          setMovies(data.data.results);
        } else {
          setMovies([...movies, ...data.data.results]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    page = 1;
    setIsLoading(true);
    getResponse("initial");
  }, [searchText]);

  useEffect(() => {
    if (!movies) return;

    const tempFunctions = {};
    movies.forEach((movie) => {
      let movieId = movie.id;
      tempFunctions[movieId] = function () {
        changeModal(movie.id);
      };
    });

    setFunctionsModalIdsList(tempFunctions);
  }, [movies]);

  const onHandleSearchBarInput = (textSearch) => {
    setSearchText(textSearch);
  };

  const changeModal = (id) => {
    if (!id) {
      setShowModal(false);
      return;
    }

    setModalMovieId(id);
    if (showModal == true) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  const showMoreHandleOnClick = () => {
    page++;

    setIsLoading(true);
    getResponse("add");
  };

  return (
    <>
      <div>
        <div className={"loader " + (isLoading ? "" : "hidden")}>
          <div className="loaderBar"></div>
        </div>
      </div>

      <SearchBar onChangeInput={onHandleSearchBarInput} />
      <div className="content">
        {movies &&
          movies.map((movie) => {
            return (
              <MovieCard
                movie={movie}
                onClick={functionsModalIdsList[movie.id]}
              />
            );
          })}
      </div>
      {movies !== null ? (
        <div className="btn-show-more">
          <button type="button" onClick={showMoreHandleOnClick}>
            Show more
          </button>
        </div>
      ) : (
        <div className="empty-message">empty list</div>
      )}
      <ModalDetails
        showModal={showModal}
        id={modalMovieId}
        onDisappear={changeModal}
      />
    </>
  );
}

export default App;
