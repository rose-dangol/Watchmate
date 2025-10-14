import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home'
import Navbar from './component/Navbar/Navbar'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import AllMovies from './pages/AllMovies/AllMovies';
import Login from './pages/Login/Login';
import BrowseMovies from './pages/BrowseMovies/BrowseMovies';
import AddNewMovie from './pages/AddNewMovie/AddNewMovie';
import AllStreamPlatforms from './pages/AllStreamPlatforms/AllStreamPlatforms';
import StreamPlatform from './pages/StreamPlatform/StreamPlatform';
import Auth from './pages/Auth/Auth';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Navbar/>
      <Home/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/movies' element={<AllMovies/>}/> */}
        <Route path='/movie/:id' element={<MovieDetail/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/navbar' element={<Navbar/>}/>
        <Route path='/browse' element={<BrowseMovies/>}/>
        <Route path='/addmovie' element={<AddNewMovie/>}/>
        <Route path='/platforms' element={<AllStreamPlatforms/>}/>
        <Route path='/platforms/:id' element={<StreamPlatform/>}/>
      </Routes>
    </>
  )
}

export default App
