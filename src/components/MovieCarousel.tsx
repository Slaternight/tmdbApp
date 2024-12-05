import React, { useRef } from "react";
import "../App.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average?: number;
  release_date?: string;
}

interface MovieCarouselProps {
  movies: Movie[];
  URL_IMAGE: string;
  selectMovie: (movie: Movie) => void;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  movies,
  URL_IMAGE,
  selectMovie,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.style.cursor = "grab";
    container.style.userSelect = "none";

    const startX = e.pageX - container.offsetLeft;
    const scrollLeft = container.scrollLeft;

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.pageX - container.offsetLeft;
      const walk = x - startX;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      container.style.cursor = "grab";
      container.style.removeProperty("user-select");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="container-fluid py-2">
      <div
        className="d-flex flex-row flex-nowrap overflow-hidden"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        style={{ cursor: "grab" }}
      >
        {movies.map((movie) => (
          <div
            className="card mx-2"
            key={movie.id}
            style={{ minWidth: "300px" }}
            onClick={() => selectMovie(movie)}
          >
            <img
              src={`${URL_IMAGE + movie.poster_path}`}
              alt={movie.title}
              className="card-img-top"
              style={{
                height: "400px",
                objectFit: "cover",
                userSelect: "none",
                pointerEvents: "none",
              }}
              draggable="false"
            />
            <div className="card2">
              <h4 className="mt-2 text-left">{movie.title}</h4>
              <h5 className="text-left card-subtitle mb-2 text-muted">
                {movie?.release_date
                  ? new Date(movie.release_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Release date not available"}
              </h5>
              <h6 className="card-text text-center">
                Rating: {movie.vote_average}
              </h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
