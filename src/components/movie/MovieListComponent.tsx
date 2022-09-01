import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { movieList } from "../../store";
import classes from "../../css/MovieList.module.css";

const MovieListComponent = (props:any) => {
  const dispatch:any = useDispatch();

  const isSearch = props.isSearch;
  const searchValue = props.search;

  let movies = useSelector((state:any) => state.movies);
  movies = Object.values(movies);
  console.log(movies)
  let email = useSelector((state:any) => state.login.data.email);

  useEffect(() => {
    dispatch(movieList());
  }, [dispatch]);

  const buttonHandler = (movie:any) => {
    if (movie.creator === email) {
      return (
        <div className={`float-end ${classes.btn_parent}`}>
          <Link
            className={`${classes.btn_sm} btn btn-info`}
            to={`/movie/Update/${movie.id}`}
            style={{ marginRight: "2px" }}
          >
            Update
          </Link>
          <Link
            className={`${classes.btn_sm} btn btn-danger`}
            to={`/movie/delete/${movie.id}`}
            style={{ marginRight: "2px" }}
          >
            Delete
          </Link>
          <Link
            className={`${classes.btn_sm} btn btn-primary`}
            to={`/movie/${movie.id}`}
            style={{ marginRight: "2px" }}
          >
            View
          </Link>
        </div>
      );
    } else {
      return (
        <div className={`float-end ${classes.btn_parent}`}>
          <Link
            className={`${classes.btn_sm} btn btn-primary`}
            to={`/movie/${movie.id}`}
            style={{ marginRight: "2px" }}
          >
            View
          </Link>
        </div>
      );
    }
  };
  const MoviesList = () => {
    if (isSearch) {
      return movies.map((movie:any) => (
        <div>
          
          {searchValue === movie.name ? (
            <div
              key={movie.id}
              className={`d-flex flex-row ${classes.movies_row} m-t-0`}
            >
              
              <div className={`${classes.movies_text} ${classes.w_100} `}>
                <h6 className="font-medium"> {movie.name} </h6>
                <span className={`${classes.m_b_15} d-block`}>
                  Creator: {movie.creator.split("@")[0]}
                </span>
                <div className={`${classes.movies_footer}`}>
                  <span className="text-muted float-right">
                    Posted at: {movie.createDate}
                  </span>
                  {buttonHandler(movie)}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ));
    } else {
      return movies.map((movie:any) => (
        <div
          key={movie.id}
          className={`d-flex flex-row ${classes.movies_row} m-t-0`}
        >
          <div className={`${classes.movies_text} ${classes.w_100} `}>
            <h6 className="font-medium"> {movie.name} </h6>
            <span className={`${classes.m_b_15} d-block`}>
              Creator: {movie.creator.split("@")[0]}
            </span>
            <div className={`${classes.movies_footer}`}>
              <span className="text-muted float-right">
                Posted at: {movie.createDate}
              </span>
              {buttonHandler(movie)}
            </div>
          </div>
        </div>
      ));
    }
  };
  return (
    <div className={`row d-flex justify-content-center container mt-3`}>
      <div className="col-lg-6">
        <div className={`card ${classes.card}`}>
          <div className={`${classes.movie_widgets}`}>{MoviesList()}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieListComponent;
