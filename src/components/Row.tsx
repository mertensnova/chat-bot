/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import axios from "../pages/api/axios";

const Row = ({ title, fetchURL, isLarge = false }: any) => {
   const [movies, setMovies] = useState([]);

   useEffect(() => {
      async function fetchData() {
         const requests = await axios.get(fetchURL);
         setMovies(requests.data.results);
         return requests;
      }
      fetchData();
   }, [fetchURL]);

   return (
      <section className="relative w-full bg-black text-white overflow-x-hidden py-[30px] ">
         <h2 className="lg:text-3xl sm:text-2xl  p-[20px]">{title}</h2>
         <div className="flex overflow-x-scroll overscroll-y-none pl-[20px] scrollbar-hide object-contain">
            {movies.map((movie: any) => {
               return (
                  <>
                     <img
                        className={`${
                           isLarge ? "max-h-[270px]" : "max-h-[150px]"
                        } mr-3 cursor-pointer object-contain hover:scale-110 duration-300 `}
                        src={`https://image.tmdb.org/t/p/original/${
                           isLarge ? movie?.poster_path : movie?.backdrop_path
                        }`}
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        // src={`https://image.tmdb.org/t/p/original/${
                        //    isLarge ? movie?.poster_path : movie?.backdrop_path
                        // }`}
                        alt={movie.name}
                        key={movie.id}
                     />
                  </>
               );
            })}
         </div>
      </section>
   );
};

export default Row;
