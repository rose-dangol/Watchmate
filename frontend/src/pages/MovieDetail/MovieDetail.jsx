// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import Navbar from "../../component/Navbar/Navbar";
// import { useParams } from 'react-router-dom';
// const MovieDetail = () => {
//     const [data,setData]= useState([]);
//     const { id } = useParams();
//     useEffect(()=>{
//         axios.get(`http://127.0.0.1:8000/watch/${id}/`)
//         .then((res) => setData(res.data))
//       .catch((err) => console.error("error lading data", err));
//       console.log(data)
//     })
//   return (
//     <div>
//        <Navbar/>
//        <div className="moviedetail-container">
//           <h2>Movie Details</h2>
//           <h3>{data.title}</h3>
//           <p>{data.storyline}</p>
//           <p>{data.stream_platform}</p>
//           <small>
//             Added on: {new Date(data.created_at).toLocaleDateString()}
//           </small>
//         </div>
//     </div>
//   )
// }

// export default MovieDetail

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();

  // Static movie data - replace with API call later
  const movie = {
    id: 1,
    title: "The Shawshank Redemption",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    storyline: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    active: true,
    created: "2024-01-15",
    rating: 9.3,
    duration: "142 min",
    release_year: 1994,
    genre: "Drama",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    platforms: [
      { name: "Netflix", logo: "🎬" },
      { name: "Amazon Prime", logo: "📺" },
      { name: "HBO Max", logo: "🎥" }
    ]
  };

  return (
    <div className="movie-detail">
      <Link to="/browse" className="back-button">
        ← Back to Movies
      </Link>

      <div className="detail-container">
        <div className="detail-poster">
          <img src={movie.poster} alt={movie.title} />
          <div className="status-badge">
            <span className={movie.active ? "status-active" : "status-inactive"}>
              {movie.active ? "● Active" : "● Inactive"}
            </span>
          </div>
        </div>

        <div className="detail-content">
          <h1 className="detail-title">{movie.title}</h1>
          
          <div className="detail-meta">
            <span className="meta-item">
              <strong>Rating:</strong> ⭐ {movie.rating}/10
            </span>
            <span className="meta-item">
              <strong>Year:</strong> {movie.release_year}
            </span>
            <span className="meta-item">
              <strong>Duration:</strong> {movie.duration}
            </span>
            <span className="meta-item genre-tag">{movie.genre}</span>
          </div>

          <div className="detail-section">
            <h3>Storyline</h3>
            <p className="storyline">{movie.storyline}</p>
          </div>

          <div className="detail-section">
            <h3>Additional Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Director:</span>
                <span className="info-value">{movie.director}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Created At:</span>
                <span className="info-value">{new Date(movie.created).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status:</span>
                <span className={`info-value ${movie.active ? 'text-success' : 'text-inactive'}`}>
                  {movie.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Cast</h3>
            <div className="cast-list">
              {movie.cast.map((actor, index) => (
                <span key={index} className="cast-member">{actor}</span>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h3>Available on Streaming Platforms</h3>
            <div className="platforms-list">
              {movie.platforms.map((platform, index) => (
                <div key={index} className="platform-card">
                  <span className="platform-logo">{platform.logo}</span>
                  <span className="platform-name">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-primary">
              ▶ Watch Now
            </button>
            <button className="btn-secondary">
              + Add to Watchlist
            </button>
            <button className="btn-secondary">
              ⭐ Rate Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;