import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleMovieSearch,
  addMovieToDB,
  removeMovieSearchResult,
} from "../redux/actions";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const stateData = useSelector((state) => state);
  const { result: movie, showSearchResults } = stateData.search;

  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      dispatch(removeMovieSearchResult());
    }
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    dispatch(handleMovieSearch(searchTerm));
  };

  const handleAddToMovies = () => {
    dispatch(addMovieToDB(JSON.stringify(movie)));
    setSearchTerm("");
  };

  return (
    <div className="nav">
      <div className="search-container">
        <input type="text" onChange={handleChange} value={searchTerm} />
        <button onClick={handleSearch} id="search-btn">
          Search
        </button>

        {showSearchResults && (
          <div className="search-results">
            <div className="search-result">
              <img src={movie.Poster} alt="search-pic" />
              <div className="movie-info">
                <span>{movie.Title}</span>
                <button onClick={() => handleAddToMovies(movie)}>
                  Add To Movies
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
