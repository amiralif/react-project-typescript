import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteMovie, movieList } from "../../store";
import { toast } from "react-toastify";
import Loading from "../Loading";
import Modal from "react-modal";

const DeleteMovieComponent = () => {
  const dispatch:any = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(true);

  const { movieId }:any = useParams();
  const deletedMovie = useSelector((state:any) => state.movies[movieId]);

  // useEffect(() => {
  //   dispatch(movieList(movieId));
  // }, [movieId, dispatch]);

  const onSuccess = () => {
    setLoading(false);
    toast.warning("Movie DELETED!", {
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

  const deleteBtn = () => {
    setLoading(true);
    dispatch(deleteMovie(movieId, onSuccess, onError));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate("/movies");
  };

  const customStyle:any = {
    overlay: { zIndex: 1000 },
    content: {
      width: "30%",
      height: "40%",
      position: "absolute",
      top: "25%",
      left: "35%",
      right: "auto",
      bottom: "auto",
    },
  };
  const popupView = () => {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="card py-4 px-4">
            <div className="text-center">
              <span
                className="material-symbols-outlined"
                style={{ color: "darkred" }}
              >
                error
              </span>
            </div>
            <div className="text-center mt-3">
              <span className="info-text">
                Are you Sure to delete {deletedMovie && deletedMovie.name}
              </span>
            </div>
            <div className="position-relative mt-3 form-input">
              <div className="d-flex justify-content-between">
                <button className="btn btn-danger" onClick={deleteBtn}>
                  Yes
                </button>
                <button className="btn btn-primary" onClick={handleCloseModal}>
                  No (Cancel){" "}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  Modal.setAppElement("body");
  return (
    <ReactModal
      closeTimeoutMS={500}
      isOpen={isModalOpen}
      style={customStyle}
      contentLabel="Delete Movie"
      id="deletePopup"
    >
      {popupView()}
    </ReactModal>
  );
};

export default DeleteMovieComponent;
