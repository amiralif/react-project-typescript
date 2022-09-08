import { useState } from "react";
import { useParams } from "react-router-dom";
import MovieFrom from "./MovieForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import {
  useUpdateMovieMutation,
  useMovieQuery,
} from "../../services/moviesApi";

const UpdateMovieComponent = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const editMovie = useMovieQuery(movieId);

  const [updateMovie] = useUpdateMovieMutation();

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
    editMovie.refetch();
    navigate("/movies");
  };

  const onError = (e: any) => {
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

  const formSubmit = async (
    name: string,
    description: string,
    movieGenre: string,
    releaseDate: Date | string
  ) => {
    setLoading(true);
    const movie = {
      movieId,
      name,
      description,
      movieGenre,
      releaseDate,
    };
    try {
      await updateMovie(movie);
      onSuccess();
    } catch (e) {
      onError(e);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    editMovie.data && editMovie.isSuccess && (
      <MovieFrom
        name={editMovie.data && editMovie.data.name}
        description={editMovie.data && editMovie.data.description}
        genre={editMovie.data && editMovie.data.movieGenre}
        releaseDate={editMovie.data && editMovie.data.releaseDate}
        onFormSubmit={formSubmit}
      />
    )
  );
};

export default UpdateMovieComponent;
