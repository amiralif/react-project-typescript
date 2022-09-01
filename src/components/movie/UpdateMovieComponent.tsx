import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieList, updateMovie } from "../../store";
import MovieFrom from "./MovieForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const UpdateMovieComponent = () => {
  const dispatch :any= useDispatch();
  const { movieId }:any = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const editMovie = useSelector((state:any) => state.movies[movieId]);

  // useEffect(() => {
  //   dispatch(movieList(movieId));
  // }, [dispatch, movieId]);

  const onSuccess = () => {
    setLoading(false);
    toast.success("Your Movie Updated!", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: true,
      progress: undefined,
    });
    navigate("/movies");
  };

  const onError = (e:any) => {
    setLoading(false);
    if (e.message === "Network Error") {
      toast.error(e.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(e.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const formSubmit = (name:any, descriptions:any, movieGenre:any, releaseDate:any) => {
    setLoading(true);
    dispatch(
      updateMovie(
        movieId,
        name,
        descriptions,
        movieGenre,
        releaseDate,
        onSuccess,
        onError
      )
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <MovieFrom
      name={editMovie && editMovie.name}
      description={editMovie && editMovie.description}
      genre={editMovie && editMovie.movieGenre}
      releaseDate={editMovie && editMovie.releaseDate}
      onFormSubmit={formSubmit}
    />
  );
};

export default UpdateMovieComponent;
