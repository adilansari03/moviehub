import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { options } from "../utils/apiOptions";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        options
      );

      const data = await response.json();
      setMovies(data?.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full">
      <div className="w-full">
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination
        >
          {movies?.slice(0, 3).map((movie) => (
            <SwiperSlide key={movie.id}>
              <BannerCard
                data={movie}
                backgroundImage={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                title={movie.title}
                desc={movie.overview}
                rating={movie.vote_average}
                posterUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              ></BannerCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeBanner;

const BannerCard = ({
  data,
  backgroundImage,
  title,
  desc,
  rating,
  posterUrl,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-screen w-full md:px-24 px-5 py-24 banner flex items-center "
    >
      <div className="flex items-center justify-between  relative z-[2]">
        <div className="banner-content md:w-[50%]">
          <span className="bg-[red] text-white px-3 py-1 md:text-sm text-[12px] rounded-full">
            Rating / {rating}
          </span>
          <h1 className="md:text-[52px] text-[32px] text-white md:my-3 my-5 line-clamp-3 md:leading-[49px] leading-[30px]">
            {title}
          </h1>
          <p className="text-white mb-5 md:text-[16px] text-[15px]">{desc}</p>
          <Link
            to={`movie-details/${data?.id}`}
            className="bg-[red] px-8 py-3 text-white rounded-full w-[140px] flex items-center gap-2"
          >
            <FaPlay /> Watch
          </Link>
        </div>
        <div className="poster w-10% md:block hidden">
          <img
            className="w-full aspect-[3/3] object-cover rounded-[30px]"
            src={posterUrl}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
