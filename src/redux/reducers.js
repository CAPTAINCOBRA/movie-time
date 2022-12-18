import { actionTypes } from "./actionTypes";
import { combineReducers } from "redux";

const {
  ADD_MOVIES,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  SET_SHOW_FAVOURITES,
  ADD_SEARCH_RESULT,
  ADD_MOVIE_TO_LIST,
  REMOVE_SEARCH_RESULT,
  ADD_FAVOURITES_ON_LOAD,
} = actionTypes;

const initialMovieState = {
  list: [],
  favourites: [],
  showFavourites: false,
};

export const movies = (state = initialMovieState, action) => {
  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        list: action.payload,
      };
    case ADD_TO_FAVOURITES:
      return {
        ...state,
        favourites: [action.payload, ...state.favourites],
      };
    case REMOVE_FROM_FAVOURITES:
      const filteredArray = state.favourites.filter(
        (movie) => movie.Title !== action.payload.Title
      );
      return {
        ...state,
        favourites: filteredArray,
      };
    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.payload,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case ADD_FAVOURITES_ON_LOAD:
      return {
        ...state,
        favourites: [action.payload],
      };
    default:
      return state;
  }
};

const initialSearchState = {
  result: {},
  showSearchResults: false,
};

export const search = (state = initialSearchState, action) => {
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        result: action.payload,
        showSearchResults: true,
      };
    case REMOVE_SEARCH_RESULT:
      return {
        ...state,
        result: action.payload,
        showSearchResults: false,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        showSearchResults: false,
      };
    default:
      return state;
  }
};

export default combineReducers({
  movies,
  search,
});
