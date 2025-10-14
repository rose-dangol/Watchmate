import { React, useEffect, useState } from "react";
import { listPlatforms } from '../../services/platforms';
import Navbar from '../../component/Navbar/Navbar';
import StreamPlatformCards from '../../component/StreamPlatformCards/StreamPlatformCards';

const AllStreamPlatforms = () => {
    const [platforms, setPlatforms] = useState([]);
      useEffect(() => {
        const datas = listPlatforms();
        datas
          .then((platform) => {
            setPlatforms(platform);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
  return (
    <div>
      <Navbar/>
    <StreamPlatformCards platforms={platforms}/>
    </div>
  )
}

export default AllStreamPlatforms
