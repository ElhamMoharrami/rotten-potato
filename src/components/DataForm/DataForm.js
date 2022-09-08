import React, { useState } from "react";
import Button from "../UI/CustomButton";
import classes from "./DataForm.module.css";
import { useDispatch } from "react-redux";
import { sendMovieDataToBackend } from "../../store/api-call";
import Card from '../UI/Card/Card'

const DataForm = () => {
  const [movieName, setMovieName] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [imdbVotes, setImdbVots] = useState("");
  const [runtime, setRuntime] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [director, setDirector] = useState("");
  const [stars, setStars] = useState("");
  const [generes, setGeneres] = useState("");
  const [languages, setLanguages] = useState("");
  const [awards, setAwards] = useState("");
  const [poster, setPoster] = useState("");
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const sendData = async () => {
      dispatch(
        sendMovieDataToBackend(`http://localhost:8080/api/movies`, {
          movieName,
          imdbRating,
          imdbVotes,
          runtime,
          year,
          description,
          director,
          stars,
          generes,
          languages,
          awards,
          poster,
        })
      );
    };

    sendData();
    setMovieName("");
    setImdbRating("");
    setImdbVots("");
    setRuntime("");
    setYear("");
    setDescription("");
    setDirector("");
    setStars("");
    setGeneres("");
    setLanguages("");
    setAwards("");
    setPoster("");
  };

  return (
   
    <form onSubmit={formSubmitHandler}>
      <Card className={classes["wrapper"]}>
        <div className={classes["data-form-input"]}>
          <label>Movie name</label>
          <input
            type="text"
            value={movieName}
            required
            onChange={(e) => setMovieName(e.target.value)}
          />
        </div>
        <div className={classes["data-form-input"]}>
          <label>IMDB rating</label>
          <input
            type="text"
            value={imdbRating}
            required
            onChange={(e) => setImdbRating(e.target.value)}
          />
        </div>
        <div className={classes["data-form-input"]}>
          <label>IMDB votes</label>
          <input
            type="text"
            value={imdbVotes}
            required
            onChange={(e) => setImdbVots(e.target.value)}
          />
        </div>
        <div className={classes["data-form-input"]}>
          <label>Runtime</label>
          <input
            type="text"
            value={runtime}
            required
            onChange={(e) => setRuntime(e.target.value)}
          />
        </div>
        <div className={classes["data-form-input"]}>
          <label>Year</label>
          <input
            type="text"
            value={year}
            required
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className={classes["data-form-input"]}>
          <label>Description</label>
          <input
            type="text"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={classes["data-form-input"]}>
          <label>Director</label>
          <input
            type="text"
            value={director}
            required
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>
        <div className={classes["data-form-input"]}>
          <label>Stars</label>
          <input
            type="text"
            value={stars}
            required
            onChange={(e) => setStars(e.target.value)}
          />
        </div>
        <div className={classes["data-form-input"]}>
          <label>Generes</label>
          <input
            type="text"
            value={generes}
            required
            onChange={(e) => setGeneres(e.target.value)}
          />
        </div>
        <div className={classes["data-form-input"]}>
          <label>Languages</label>
          <input
            type="text"
            value={languages}
            required
            onChange={(e) => setLanguages(e.target.value)}
          />
        </div>
        <div className={classes["data-form-input"]}>
          <label>Awards</label>
          <input
            type="text"
            value={awards}
            required
            onChange={(e) => setAwards(e.target.value)}
          />
        </div>
        <div className={classes["data-form-input"]}>
          <label>Poster Url:</label>
          <input
            type="url"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </div>

        <Button type="submit">Submit</Button>
      </Card>
    </form>
   
  );
};

export default DataForm;
