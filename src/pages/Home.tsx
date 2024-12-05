import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import YouTube from "react-youtube";
import MovieCarousel from "../components/MovieCarousel";
import Select3 from "../components/Select3";
import "../App.css";
import NavBar from "../components/NavBar";

interface Movie {
  id: number;
  title: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  poster_path: string;
  videos?: {
    results: {
      name: string;
      key: string;
    }[];
  };
  [key: string]: any;
}

interface Video {
  name: string;
  key: string;
}
function Home() {
  const navigate = useNavigate();

  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "a68f0040681df95316b01398991cdd0b";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  const fetchMovies = async (searchKey: string): Promise<void> => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get<{ results: Movie[] }>(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });
    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  const fetchMovie = async (id: number): Promise<void> => {
    try {
      const { data } = await axios.get<Movie>(`${API_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
          append_to_response: "videos",
        },
      });

      if (data.videos && data.videos.results) {
        const trailer = data.videos.results.find(
          (vid) => vid.name === "Official Trailer"
        );
        setTrailer(trailer ? trailer : data.videos.results[0]);
      }
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const selectMovie = async (movie: Movie): Promise<void> => {
    fetchMovie(movie.id);
    setMovie(movie);
    window.scrollTo(0, 0);
  };


  const fetchPopularMovies = async () => {
    const {
      data: { results },
    } = await axios.get<{ results: Movie[] }>(`${API_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: 4,
        sort_by: "popularity.desc",
      },
    });
    setPopularMovies(results);
  };

  const fetchTopRatedMovies = async (): Promise<void> => {
    try {
      const {
        data: { results },
      } = await axios.get<{ results: Movie[] }>(`${API_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          include_adult: false,
          include_video: false,
          language: "en-US",
          page: 1,
          sort_by: "vote_average.desc",
          without_genres: "99,10755",
          "vote_count.gte": 200,
        },
      });
      setTopRatedMovies(results);
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
    }
  };

  const fetchFilteredMovies = async (minDate: string, maxDate: string) => {
    const {
      data: { results },
    } = await axios.get<{ results: Movie[] }>(`${API_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: 1,
        sort_by: "popularity.desc",
        with_release_type: "2|3",
        "release_date.gte": minDate,
        "release_date.lte": maxDate,
      },
    });
    setFilteredMovies(results);
  };

  const searchMovies = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies("");
    fetchPopularMovies();
    const minDate = "2025-05-01";
    const maxDate = "2025-12-31";
    fetchFilteredMovies(minDate, maxDate);
    fetchTopRatedMovies();

    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div className="home">
      <NavBar />


      <div>
        <main>
          {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}
            >
              <img src="${IMAGE_PATH}${movie.backdrop_path}" alt="" />
              {playing ? (
                <>
                  {trailer && (
                    <YouTube
                      videoId={trailer.key}
                      className="reproductor container"
                      containerClassName={"youtube-container amru"}
                      opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                          autoplay: 1,
                          controls: 0,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 0,
                          modestbranding: 0,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                  )}
                  <button onClick={() => setPlaying(false)} className="boton2">
                    Cerrar
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="descript">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Official Trailer <i className="fas fa-play"></i>
                      </button>
                    ) : (
                      "No hay trailer disponible"
                    )}
                    <h1 className="text-white efecto">{movie.title}</h1>
                    <p className="text-white efecto">{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>

      <div className="d-flex container-body">
        <div className="sidebar">
          <ul>
            <li>
              <div className="search-bar">
                <div className="input-group">
                  <h4>Search</h4>
                  <form className="barra mb-4" onSubmit={searchMovies}>
                    <input
                      type="text"
                      placeholder="Keywords"
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                    <button className="btn">
                      <i className="fas fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>
            </li>
            <li>
              <Select3 />
            </li>
          </ul>
        </div>

        <div className="container-body">
          <h3>Now Paying</h3>
          <MovieCarousel
            movies={movies}
            URL_IMAGE={URL_IMAGE}
            selectMovie={selectMovie}
          />
          <h3>Popular</h3>
          <MovieCarousel
            movies={popularMovies}
            URL_IMAGE={URL_IMAGE}
            selectMovie={selectMovie}
          />
          <h3>Upcoming</h3>
          <MovieCarousel
            movies={filteredMovies}
            URL_IMAGE={URL_IMAGE}
            selectMovie={selectMovie}
          />
          <h3>Top Rated</h3>
          <MovieCarousel
            movies={topRatedMovies}
            URL_IMAGE={URL_IMAGE}
            selectMovie={selectMovie}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
