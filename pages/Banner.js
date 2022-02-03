import React, { useEffect, useState } from "react";
import axios from "./axios";

import requests from "./Requests";

const Banner = () => {
  const width = () => {
    if (typeof window !== "undefined") {
      let wi = window.innerWidth;
      return wi;
    }
  };

  const [movie, setMovie] = useState([]);
  const [size, setSize] = useState(width);
  console.log(size);
  const checkSize = () => {
    setSize(width());
  };

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    return window.removeEventListener("resize", checkSize);
  });

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflix);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <section
      className={`relative h-[460px] object-contain `}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${
          size < 375 ? movie?.poster_path : movie?.backdrop_path
        }")`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <article className="ml-[30px] pt-36 h-48 text-white ">
        <h1 className="mb-3 pb-2 font-extrabold  sm:text-4xl lg:text-5xl">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="flex w-full items-center justify-start">
          <button className="mr-4 rounded-sm bg-Button px-8 py-2 font-Raleway font-bold   text-white  hover:bg-NetWhite hover:text-black">
            {" "}
            Play{" "}
          </button>
          <button className=" rounded-sm bg-Button  px-8 py-2 font-Raleway font-bold text-white duration-300 hover:bg-NetWhite hover:text-black">
            More Info
          </button>
        </div>
        <p className=" w-[45rem] max-w-[360px] pt-4 text-2xl  sm:hidden lg:flex h-20 leading-snug">
          {truncate(movie?.overview, 150)}
        </p>
      </article>
      <div className="banner-fade" />
    </section>
  );
};

export default Banner;
