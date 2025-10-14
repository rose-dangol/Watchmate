import { API_BASE_URL } from "../commons/api";

export const listPlatforms = async ()=>{
try {
    const response = await fetch(API_BASE_URL+"/stream");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result

  } catch (error) {
    console.error(error.message);
  }
};

export const addPlatform = async (platformData) => {
  try {
    const response = await fetch(API_BASE_URL + "/stream/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(platformData),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const platform = await response.json();
    return platform;
  } catch (error) {
    console.log(error.message);
  }
};

export const getMoviePlatforms = async (movieId) => {
  try {
    const response = await fetch(API_BASE_URL + `/stream/${movieId}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};