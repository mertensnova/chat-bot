// import "@styles/globals.css";
import Head from "next/head";
import Nav from "../components/Nav";
import Row from "../components/Row";
import Banner from "../components/Banner";
import requests from "./api/Requests";
import Footer from "../components/Footer";

export default function Home() {
   return (
      <>
         <Head>
            <title>Netflix Clone</title>
         </Head>
         <Nav />
         <Banner />

         <Row
            title="NETFLIX ORIGINALS"
            fetchURL={requests.fetchNetflix}
            isLarge
         />
         <Row title="Now Playing" fetchURL={requests.fetchNowPlaying} />
         <Row title="Trending Now" fetchURL={requests.fetchMovies} />
         <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
         <Row title="TV Shows" fetchURL={requests.fetchTVShows} />
         <Row
            title="Action & Adventure"
            fetchURL={requests.fetchActionMovies}
         />
         <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
         <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />

         <Footer />
      </>
   );
}
