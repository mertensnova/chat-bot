/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { BellIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/solid";

const Nav = () => {
   const [showList, setShowList] = useState(false);
   const [show, setShow] = useState(false);

   const transitionNavBar = () => {
      if (window.scrollY > 100) {
         setShow(true);
      } else {
         setShow(false);
      }
   };

   useEffect(() => {
      window.addEventListener("scroll", transitionNavBar);
      return () => window.removeEventListener("scroll", transitionNavBar);
   }, []);

   return (
      <section
         className={`fixed top-0 z-20 flex h-[60px] w-full items-center justify-between p-[10px] font-Raleway ${
            show && "bg-black"
         } `}
      >
         <nav className="relative flex w-1/2 items-center justify-start">
            <img
               src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
               alt=""
               width={95}
               height={10}
               className="sm:w-[95px] "
            />
            <button
               className=" ml-[20px] cursor-pointer text-sm text-white sm:flex lg:hidden"
               onClick={() => setShowList(!showList)}
            >
               Browse
            </button>

            {showList && <ShowNav />}
            <ul className="font-meduim w-2/3 items-center justify-evenly text-sm text-Gray sm:hidden lg:flex">
               <li className="cursor-pointer text-white hover:opacity-70 ">
                  Home
               </li>
               <li className="cursor-pointer hover:opacity-70 ">Movies</li>
               <li className="cursor-pointer hover:opacity-70">TV Shows</li>
               <li className="cursor-pointer hover:opacity-70">
                  New & Popular
               </li>
               <li className="cursor-pointer hover:opacity-70">My Lists</li>
            </ul>
         </nav>
         <div className="flex w-1/2 items-center justify-end">
            <SearchIcon className="mr-5 h-[20px] w-[20px] cursor-pointer text-white sm:hidden lg:flex" />
            <h4 className="mr-5 cursor-pointer text-lg text-white sm:hidden lg:flex">
               Kids
            </h4>
            <BellIcon className="mr-5 h-[20px] w-[20px] cursor-pointer text-white " />
            <img
               src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"
               alt="#"
               width={30}
               height={10}
               className="mr-5 w-[30px] cursor-pointer"
            />
         </div>
      </section>
   );
};

const ShowNav = () => {
   return (
      <div className="absolute left-8 top-20 h-[252px] w-[262px] border-t-2 border-t-white bg-black bg-opacity-90 text-center ">
         <ul className="flex w-full flex-col items-center justify-around p-3 text-sm font-semibold text-Gray">
            <li className="mt-4  cursor-pointer text-white hover:opacity-70">
               Home
            </li>
            <li className="mt-6 cursor-pointer hover:opacity-70">Movies</li>
            <li className="mt-6 cursor-pointer hover:opacity-70">TV Shows</li>
            <li className="mt-6 cursor-pointer hover:opacity-70">
               New & Popular
            </li>
            <li className="mt-6 cursor-pointer hover:opacity-70">My Lists</li>
         </ul>
      </div>
   );
};

export default Nav;
