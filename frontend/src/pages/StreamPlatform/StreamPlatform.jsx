import React, { useEffect, useState } from "react";
import "./StreamPlatform.css";
import Navbar from "../../component/Navbar/Navbar";
import { getMoviePlatforms } from "../../services/platforms";
import { useParams } from "react-router-dom";


const StreamPlatform = () => {
  const {id} = useParams()
  const [platformData, setPlatformData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No movie ID provided");
      return;
    }
    const fetchPlatforms = async () => {
      try {
        const platforms = await getMoviePlatforms(id);
        setPlatformData([platforms]);
        setError(null);
      } catch (err) {
        console.error("Platforms failed", err);
        setError("Failed to load platforms");
        setPlatformData([]);
      }
    };
    fetchPlatforms();
  }, [id]);
  if (error) return <div><Navbar /><p>{error}</p></div>;
  return (
    <div>
      <Navbar />
      <div className="platform-container">
        {platformData.length === 0 ? (
          <p>No platforms available for this movie</p>
        ) : (
          platformData?.map((platform, index) => (
            <div key={index}>
              <p>{platform.name}</p>
              <p>{platform.about}</p>
              <p>{platform.website}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StreamPlatform;