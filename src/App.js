import "./App.css";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
// import { data } from "./data";
import { useCallback, useEffect } from "react";
import {
  addMovies,
  setShowFavourites,
  // addMovieToDB,
  addFavourite,
} from "./redux/actions";
import MovieCard from "./components/Moviecard";
// import Counter from "./Counter";

require("dotenv").config();

const App = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { movies } = state;
  const { list, favourites, showFavourites } = movies;
  const displayMovies = showFavourites ? favourites : list;
  // let displayMovies = showFavourites ? favourites : list;
  // if (showFavourites) {
  //   let arr = [];
  //   list.forEach((movie) => {
  //     if (movie.isFavourite) {
  //       // dispatch(addFavourite(movie));
  //       arr.push(movie);
  //     }
  //   });
  //   displayMovies = arr;
  // }

  useEffect(() => {
    // dispatch(addMovies(data));

    // fetch("http://localhost:5000/api/movies")
    fetch(`${process.env.REACT_APP_DB_URL}/api/movies`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(addMovies(data.movies));
        // Use this instead of XYZ

        data.movies.forEach((movie) => {
          if (movie.isFavourite) {
            dispatch(addFavourite(movie));
          }
        });

        // Use this instead of XYZ ends
      });
  }, []);

  //Bug XYZ starts here

  // const fetchFavoriteMovies = useCallback(() => {
  //   if (list.length > 0) {
  //     list.forEach((movie) => {
  //       if (movie.isFavourite) {
  //         dispatch(addFavourite(movie));
  //       }
  //     });
  //   }
  // }, [list]);
  //Bug XYZ ends here

  const onChangeTab = (val) => {
    dispatch(setShowFavourites(val));
  };

  // const isMovieFavourite = (movie) => {
  //   const index = movies.favourites.indexOf(movie);

  //   if (index !== -1) {
  //     console.log("Checking if the movis is favourite - " + index);
  //     return true;
  //   }
  //   return false;
  // };

  // const addAllMoviesToDB = () => {
  //   data.forEach((movie) => {
  //     let moviee = JSON.stringify(movie);
  //     dispatch(addMovieToDB(moviee));
  //   });
  // };

  return (
    <div className="App">
      {/* <Counter /> */}
      {/* <button onClick={addAllMoviesToDB}>Add</button> */}
      <Navbar />
      <div className="main">
        <div className="tabs">
          <div
            className={`tab ${showFavourites ? "" : "active-tabs"}`}
            onClick={() => onChangeTab(false)}
          >
            Movies
          </div>
          <div
            className={`tab ${showFavourites ? "active-tabs" : ""}`}
            onClick={() => onChangeTab(true)}
          >
            Favourites
          </div>
        </div>

        <div className="list">
          {displayMovies?.map((movie, index) => (
            <MovieCard
              movie={movie}
              key={`movies- ${index}`}
              // isFavourite={isMovieFavourite(movie)}
              isFavourite={movie.isFavourite}
            />
          ))}
        </div>

        {displayMovies.length === 0 ? (
          <div className="no-movies"> No movies to display! </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
