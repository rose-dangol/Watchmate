import { React, use, useEffect, useState } from "react";
import "./BrowseMovies.css";
import { listMovies } from "../../services/movie";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import FormModals from "../../component/FormModals/FormModals";
import { API_BASE_URL } from "../../commons/api";

function BrowseMovies(props) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();
  const [editForm, setEditForm] = useState(false);
  useEffect(() => {
    const datas = listMovies();
    datas
      .then((movie) => {
        setMovies(movie);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleEdit = () => {
    console.log("hihi");
    setEditForm(true);
  };
  return (
    <>
      <Navbar />
      <div className="browse-movies">
        <div className="browse-header">
          <h1>Browse Movies</h1>
          <p>Discover your next favorite movie</p>
        </div>

        <div className="movies-grid">
          {movies.map((movie, index) => {
            return (
              <div className="movie-card">
                <div className="movie-poster">
                  <img src={`${movie.image}`} alt={movie.title} />
                </div>
                <div className="movie-info">
                  <div className="movie-header">
                    <h3 className="movie-title">{movie.title}</h3>
                    {/* <span className="movie-rating">⭐ 9.3</span> */}
                  </div>
                  <div className="movie-meta">
                    <span className="movie-year">{movie.created_at}</span>
                    {/* <span className="movie-genre">Drama</span> */}
                  </div>
                  <p className="movie-description">{movie.storyline}</p>
                  <div className="movie-footer">
                    <span className="movie-platform">
                      <Link to={`/platforms/${movie.id}`}>Stream</Link>
                    </span>
                    <button className="btn-details">
                      <Link to={`/movie/${movie.id}`}>View Details</Link>
                    </button>
                    <button className="btn-details" onClick={handleEdit}>
                      Edit
                    </button>

                    <FormModals />
                    
                    {editForm && (
                    <div className="edit-form" style={{ color: "white" }}>
                      <h4>Edit Movie</h4>
                      <input type="text" placeholder="New Title" />
                      <button onClick={() => setEditForm(false)}>Cancel</button>
                    </div>
                  )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default BrowseMovies;
