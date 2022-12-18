import { actionTypes } from "./actionTypes";
require("dotenv").config();

export const addMovies = (movies) => {
  return {
    type: actionTypes.ADD_MOVIES,
    payload: movies,
  };
};

export const changeFavouriteInDB = (movie, value) => {
  return (dispatch, getState) => {
    // const url = `http://localhost:5000/api/favourite/${movie.id}`;
    const url = `${process.env.REACT_APP_DB_URL}/api/favourite/${movie.id}`;
    console.log(url);
    movie.isFavourite = value;
    if (value) {
      dispatch(addFavourite(movie));
    } else {
      dispatch(removeFromFavourite(movie));
    }

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((response) => response.json())
      .then((movie) => {
        console.log(movie);
        // dispatch(addFavourite(movie));
      })
      .catch((error) => console.log(error));
  };
};

export const addFavourite = (movie) => {
  return {
    type: actionTypes.ADD_TO_FAVOURITES,
    payload: movie,
  };
};

export const removeFromFavourite = (movie) => {
  return {
    type: actionTypes.REMOVE_FROM_FAVOURITES,
    payload: movie,
  };
};

export const setShowFavourites = (val) => {
  return {
    type: actionTypes.SET_SHOW_FAVOURITES,
    payload: val,
  };
};

export const addMovieToList = (movie) => {
  return {
    type: actionTypes.ADD_MOVIE_TO_LIST,
    payload: movie,
  };
};

export const handleMovieSearch = (movie) => {
  return (dispatch, getState) => {
    const url = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&t=${movie}`;

    fetch(url)
      .then((response) => response.json())
      .then((movie) => {
        dispatch(addMovieSearchResult(movie));
      })
      .catch((error) => console.log(error));
  };
};

export const addMovieSearchResult = (movie) => {
  return {
    type: actionTypes.ADD_SEARCH_RESULT,
    payload: movie,
  };
};

export const removeMovieSearchResult = () => {
  return {
    type: actionTypes.REMOVE_SEARCH_RESULT,
    payload: {},
  };
};

export const addMovieToDB = (movie) => {
  return (dispatch, getState) => {
    // const url = `http://localhost:5000/api/movie/create`;
    const url = `${process.env.REACT_APP_DB_URL}/api/movie/create`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: movie,
    })
      .then((response) => response.json())
      .then((movie) => {
        // dispatch(addMovieToList(JSON.parse(movie)));
        dispatch(addMovieToList(movie.movie));
      });
  };
};
