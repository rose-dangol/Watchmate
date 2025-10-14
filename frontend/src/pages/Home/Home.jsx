import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import HomeCarousel from "../../component/HomeCarousel/HomeCarousel";
import TableComponent from "../../component/Table/TableComponent";
import { listMovies } from "../../services/movie";
import FormModals from '../../component/FormModals/FormModals'

const Home = () => {
  // const [data, setData] = useState([]);
  const [movie, setMovie] = useState([]);
  
  

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // const [show, setShow] = useState(false);

  useEffect(() => {
    // axios
    //   .get("http://127.0.0.1:8000/watch/list/")
    //   .then((res) => setData(res.data))
    //   .catch((err) => console.error("error lading data", err));
      // console.log(data)
    const movies = listMovies();
    movies.then((data)=>{
      setMovie(data)
    }).catch((error)=>{console.log(error)})
    }, []);
  return (
    <div>
      <Navbar/>
      <HomeCarousel/>
      
      <FormModals/>
      <TableComponent movies={movie}/>
      {/* <ul>
        {data.map((movie) => {
            return(
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.storyline}</p>
            <small>
              Added on: {new Date(movie.created_at).toLocaleDateString()}
            </small>
          </li>);
        })}
      </ul> */}
    </div>
  );
};

export default Home;
