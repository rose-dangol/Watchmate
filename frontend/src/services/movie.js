import { calcLength } from "framer-motion";
import { API_BASE_URL } from "../commons/api";

export const listMovies = async () => {
  try {
    const response = await fetch(API_BASE_URL + "/list");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
    // console.log(result);
  } catch (error) {
    console.error(error.message);
  }
};

export const createMovie = async (movieData) => {
  try {
    const response = await fetch(API_BASE_URL + "/list/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    }); 
    const data = await response.json();
    if (!response.ok) {
      console.log("Backend said:", data);
      throw new Error(`Response status: ${response.status}`);
    }
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateMovie = async (movieid, movieData) => {
  try {
    const response = await fetch(API_BASE_URL + `/${movieid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.log(error.message);
  }
};

export const patchMovie = async (movieData) => {
  try {
    const response = await fetch(API_BASE_URL + "/:id/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMovie = async (movieData) => {
  try {
    const response = await fetch(API_BASE_URL + "/list/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.log(error.message);
  }
};
