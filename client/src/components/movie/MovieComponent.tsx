import React from "react";
import { useParams } from "react-router-dom";
import { useMovieQuery } from "../../services/moviesApi";
import classes from "../../css/MovieList.module.css";

const MovieComponent = () => {
  const { movieId } = useParams();
  const { data, isSuccess } = useMovieQuery(movieId);

  const movieContainer = () => {
    if (data && isSuccess) {
      const releaseDate = data.releaseDate
        .toString()
        .split("T")[0]
        .replace(/-/gi, "/");
      return (
        <div
          key={data.id}
          className={`d-flex flex-row ${classes.movies_row} m-t-0`}
        >
          <div className={`${classes.p_2}`}></div>
          <div className={`${classes.movies_text} ${classes.w_100} `}>
            <h6 className={`${classes.movieName}`}> {data.name} </h6>
            <span className={`${classes.m_b_15} d-block`}>
              Creator: {data.creator.split("@")[0]}
            </span>
            <span className={`${classes.m_b_15}  `}>Movie Description: </span>
            <br />
            <p className={`${classes.m_b_15} ${classes.description} `}>
              {data.description}
            </p>
            <br></br>
            <br></br>
            <span className={`${classes.m_b_15} `}>
              Movie Released at: {releaseDate}
            </span>
            <br></br> <br></br>
            <span className={`${classes.m_b_15} `}>
              Movie Genre: <strong>{data.movieGenre}</strong>
            </span>
            <span className={`${classes.m_b_15} float-end mt-5`}>
              Posted at: {data.createDate}
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`row d-flex justify-content-center container mt-3`}>
      <div className="col-lg-6">
        <div className={`card ${classes.card}`}>
          <div className={`${classes.movie_widgets}`}>{movieContainer()}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
