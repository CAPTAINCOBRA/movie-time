import React from "react";
import { useDispatch } from "react-redux";
import {
  // addFavourite,
  // removeFromFavourite,
  changeFavouriteInDB,
} from "../redux/actions";

const Moviecard = ({ movie, isFavourite }) => {
  const dispatch = useDispatch();

  const handleFavouriteClick = () => {
    // dispatch(addFavourite(movie));
    dispatch(changeFavouriteInDB(movie, true));
  };

  const handleUnFavouriteClick = () => {
    // dispatch(removeFromFavourite(movie));
    dispatch(changeFavouriteInDB(movie, false));
  };

  return (
    <div className="movie-card">
      <div className="left">
        <img alt="movie-poster" src={movie.Poster}></img>
      </div>
      <div className="right">
        <div className="title"> {movie.Title} </div>
        <div className="plot"> {movie.Plot} </div>
        <div className="footer">
          <div className="rating"> Imdb {movie.imdbRating} </div>
          <div className="rating"> Year: {movie.Year} </div>
          <div className="rating"> Genre: {movie.Genre} </div>
          {isFavourite ? (
            <button
              onClick={handleUnFavouriteClick}
              className="unfavourite-btn"
            >
              UnFavourite
            </button>
          ) : (
            <button onClick={handleFavouriteClick} className="favourite-btn">
              Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Moviecard;
