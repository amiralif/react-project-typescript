import { useNavigate } from "react-router-dom";

import { useAddMovieMutation } from "../../services/moviesApi";

import MovieForm from "./MovieForm";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "../Loading";

const CreateMovieComponent = () => {
  const navigate = useNavigate();
  const [addMovie] = useAddMovieMutation();

  const [loading, setLoading] = useState(false);

  const onSuccess = (): void => {
    setLoading(false);
    toast.success("Your Movie Added!", {
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

  const onSubmit = async (
    name: string,
    description: string,
    movieGenre: string,
    releaseDate: string
  ) => {
    setLoading(true);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date();

    const month = months[date.getMonth()];
    const movie = {
      name: name,
      description: description,
      movieGenre: movieGenre,
      creator: localStorage.getItem("email"),
      releaseDate: releaseDate,
      createDate: month + " " + date.getDate() + " , " + date.getFullYear(),
    };
    try {
      await addMovie(movie);
      onSuccess();
    } catch (e) {
      onError(e);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <MovieForm name={""} description={""} onFormSubmit={onSubmit} />
  );
};

export default CreateMovieComponent;
