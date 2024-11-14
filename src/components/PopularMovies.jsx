import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { options } from "../utils/apiOptions";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      );

      const data = await response.json();
      setPopularMovies(data?.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full md:py-[70px]">
      <div className="container px-20 mx-auto mb-8">
        <h2 className="section-title text-white text-[28px] font-medium flex items-center gap-2">
          <FaArrowTrendUp /> Trends Now
        </h2>
      </div>
      <div className="w-full">
        <Swiper modules={[Pagination]} spaceBetween={20} slidesPerView={7.5}>
          {popularMovies?.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Card
                data={movie}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                desc={movie.overview}
                rating={movie.vote_average}
                date={movie.release_date}
              ></Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularMovies;

const Card = ({ data, imageUrl, title, rating, date }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <Link to={`movie-details/${data?.id}`} className="w-full">
      <img
        src={imageUrl}
        alt=""
        className="aspect-[9/12] rounded-[10px] object-cover mb-3"
      />
      <h3 className="text-white text-[16px] mb-2">{truncateText(title, 22)}</h3>
      <div className="flex items-center justify-between">
        <div className="date text-[#6f6f6f] text-[12px]">{date}</div>
        <div className="rating flex items-center gap-2 text-[yellow] text-[12px]">
          <FaStar className="text-[#ffc400]" /> {rating}
        </div>
      </div>
    </Link>
  );
};
