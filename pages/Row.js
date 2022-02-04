import { useEffect, useState } from "react";
import requests from "../lib/Requests.js";
import axios from "../lib/axios";

const Row = ({ title, fetchURL, isLarge = false }) => {
  const [movies, setMovies] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const requests = await axios.get(fetchURL);
      setMovies(requests.data.results);
      return requests;
    }
    fetchData();
  }, [fetchURL]);

  const moreInfo = (e) => {
    let more = e.target.alt;
    console.log(more);
  };

  return (
    <section className="relative w-full bg-black text-white overflow-x-hidden py-[30px] ">
      <h2 className="lg:text-3xl sm:text-2xl  p-[20px]">{title}</h2>
      <div className="flex overflow-x-scroll overscroll-y-none pl-[20px] scrollbar-hide object-contain">
        {movies.map((movie) => {
          return (
            <>
              <img
                className={`${
                  isLarge ? "max-h-[270px]" : "max-h-[150px]"
                } mr-3 cursor-pointer object-contain hover:scale-110 duration-300 `}
                src={`https://image.tmdb.org/t/p/original/${
                  isLarge ? movie?.poster_path : movie?.backdrop_path
                }`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLarge ? movie?.poster_path : movie?.backdrop_path
                }`}
                alt={movie.name}
                key={movie.id}
                onClick={moreInfo}
              />
            </>
          );
        })}
      </div>
    </section>
  );
};

export default Row;
