const API_KEY = "6e4112b6aebb269d61baeb14171b9714";

const requests = {
  fetchNetflix: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchNowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
  fetchMovies: `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchTVShows: `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  fetchActionMovies: `discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `discover/movie?api_key=${API_KEY}&with_genres=27`,
};

export default requests;
