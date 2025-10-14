import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from "../../component/Navbar/Navbar";
import BrowseMovies from '../BrowseMovies/BrowseMovies';
import { Link } from 'react-router-dom';
const AllMovies = () => {
    const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/watch/list/")
      .then((res) => setData(res.data))
      .catch((err) => console.error("error lading data", err));
      console.log(data)
  }, []);
  return (
    <>
      <Navbar/>
      {/* <BrowseMovies/> */}
      <h1>Browse All Movies</h1>
      <ul>
        {data.map((movie) => {
            return(
          <li key={movie.id}>
            <h3><Link to={`/movie/${movie.id}`}>{movie.title}</Link></h3>
            <small>
              Added on: {new Date(movie.created_at).toLocaleDateString()}
            </small>
          </li>);
        })}
      </ul>
      </>
  )
}

export default AllMovies
