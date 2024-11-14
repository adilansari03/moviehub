import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { options } from "../utils/apiOptions";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { movie_id } = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
        options
      );

      const data = await response.json();
      setMovieDetails(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="text-4xl font-bold text-white min-h-screen justify-center flex items-center">
          Loading........
        </div>
      )}
      {!isLoading && (
        <section
          className="w-full h-screen relative banner1 flex items-center justify-center"
          style={{
            backgroundImage: movieDetails
              ? `url(https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full container px-12 mx-auto flex justify-center items-center">
            <div className="w-full flex justify-center items-center relative z-10">
              <div className="w-[40%]">
                {movieDetails && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
                    alt={movieDetails?.title}
                  />
                )}
              </div>
              <div className="w-[35%] text-white">
                {movieDetails && (
                  <>
                    <span className="flex items-center gap-2 text-[#ffc400]">
                      <FaStar /> {movieDetails?.vote_average}
                    </span>
                    <h1 className="text-[32px] my-3 font-bold">
                      {movieDetails?.title}
                    </h1>
                    <p className="mb-4">{movieDetails?.overview}</p>
                    <div className="year text-sm text-[#7b7b7b]">
                      {movieDetails?.release_date}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MovieDetails;
