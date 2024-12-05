import { useState, useEffect } from "react";
import axios from "axios";
import "./Select.css";

interface Genre {
  id: number;
  name: string;
}

function Select3() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: {
              api_key: "a68f0040681df95316b01398991cdd0b",
              language: "en-EN",
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div>
      <h4>Genres</h4>
      <select
        className="form-select"
        aria-label="Default select example"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="" disabled>
          Choose Genre
        </option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select3;
