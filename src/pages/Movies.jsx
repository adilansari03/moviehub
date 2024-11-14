import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { options } from "../utils/apiOptions";
import { Link } from "react-router-dom";

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [movieList, setMovieList] = useState([]); // State for movie results
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMovies(); // Fetch movies on component mount
  }, [currentPage, searchTerm]); // Re-fetch when page or search term changes

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const url = searchTerm
        ? `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${currentPage}&language=en-US`
        : `https://api.themoviedb.org/3/movie/popular?page=${currentPage}&language=en-US`;
      const response = await fetch(url, options);
      const data = await response.json();
      setMovieList(data.results || []);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <>
      <section
        className="w-full h-[500px] banner1 flex items-center justify-center -z-10 sticky top-0"
        style={{
          backgroundImage: `url(https://miro.medium.com/v2/resize:fit:828/format:webp/1*eYtze01BE5EzuxR_1qT9SA.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto w-[50%] text-white relative z-2 text-center text-5xl font-bold">
          Movies
        </div>
      </section>

      <section className="w-full bg-[#f0f0f0] mt-[-100px] rounded-t-[50px] px-24 py-24">
        <div className="search relative mb-16">
          <CiSearch className="absolute top-2 left-3 text-2xl" />
          <input
            className="border px-3 py-2 ps-12 w-full rounded-[20px]"
            type="search"
            placeholder="Search movie..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {isLoading && (
          <div className="text-4xl font-bold min-h-screen justify-center flex items-center">
            Loading........
          </div>
        )}

        {!isLoading && (
          <MovieList movieList={movieList} truncateText={truncateText} />
        )}

        <div className="pagination flex justify-between mt-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[red] text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            className="px-4 py-2 bg-[red] text-white rounded"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

const MovieList = ({ movieList, truncateText }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {movieList?.map((movie) => (
        <Link to={`/movie-details/${movie?.id}`} key={movie.id}>
          <img
            className="aspect-[3/3.8] object-cover rounded-[20px]"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
          />
          <h3 className="text-[18px] font-medium my-2">
            {truncateText(movie.title, 22)}
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default Movies;
