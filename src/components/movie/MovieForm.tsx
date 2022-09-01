import { useState } from "react";
import classes from "../../css/MovieList.module.css";
// import DatePicker from "react-date-picker";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { toast } from "react-toastify";

const MovieForm = (props:any) => {
  const [movieName, setMovieName] = useState(props.name);
  const [movieDescription, setDescription] = useState(props.description);
  const [movieGenre, setMovieGenre] = useState(
    props.genre ? props.genre : "none"
  );

  const [releaseDate, setReleaseDate] = useState(
    props.releaseDate ? props.releaseDate : new Date()
  );

  const formSubmit = (e:any) => {
    e.preventDefault();
    if (movieGenre === "none") {
      toast.error("Select Movie Genre", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: true,
        progress: undefined,
      });
    } else {
      props.onFormSubmit(movieName, movieDescription, movieGenre, releaseDate);
    }
  };

  return (
    <div className={`row d-flex justify-content-center container mt-3`}>
      <div className="col-lg-6">
        <div className={`card ${classes.card}`}>
          <div className={`${classes.movie_widgets}`}>
            <div className={`d-flex flex-row ${classes.movies_row} m-t-0`}>
              <div className={`${classes.p_2}`}></div>
              <div className={`${classes.movies_text} ${classes.w_100} `}>
                <form onSubmit={formSubmit}>
                  <div className="form-control mb-3">
                    <label className="form-label" htmlFor="name">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="form-control form-control-lg"
                      placeholder="Enter Movie/Serial Name"
                      value={movieName}
                      onChange={(e) => setMovieName(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-3 d-flex justify-content-around">
                    <div className="radio d-inline">
                      <label>
                        <input
                          type="radio"
                          value="Action"
                          name="genre"
                          checked={movieGenre === "Action"}
                          onChange={(e) => {
                            setMovieGenre(e.target.value);
                          }}
                        />
                        Action
                      </label>
                    </div>
                    <div className="radio d-inline">
                      <label>
                        <input
                          type="radio"
                          value="Drama"
                          name="genre"
                          checked={movieGenre === "Drama"}
                          onChange={(e) => {
                            setMovieGenre(e.target.value);
                          }}
                        />
                        Drama
                      </label>
                    </div>
                    <div className="radio d-inline">
                      <label>
                        <input
                          type="radio"
                          value="Documentary"
                          name="genre"
                          checked={movieGenre === "Documentary"}
                          onChange={(e) => {
                            setMovieGenre(e.target.value);
                          }}
                        />
                        Documentary
                      </label>
                    </div>
                    <div className="radio d-inline">
                      <label>
                        <input
                          type="radio"
                          value="Science Fiction"
                          name="genre"
                          checked={movieGenre === "Science Fiction"}
                          onChange={(e) => {
                            setMovieGenre(e.target.value);
                          }}
                        />
                        Science Fiction
                      </label>
                    </div>
                  </div>
                  <div className="form-control mb-3">
                    <label className="form-label" htmlFor="description">
                      Movie/Serial Description:
                    </label>
                    <textarea
                      id="description"
                      required
                      className="form-control form-control-lg"
                      rows={10}
                      placeholder="Enter Movie/Serial Description"
                      value={movieDescription}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-3">
                    <label className="form-label" htmlFor="releaseDate">
                      Release Date:{" "}
                    </label>
                    <Flatpickr
                      required
                      id="releaseDate"
                      className="form-control form-control-lg"
                      data-enable-time
                      value={releaseDate}
                      onChange={setReleaseDate}
                    />
                  </div>

                  <div className="form-control mb-3 ">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg w-100"
                    >
                      {props.name ? " Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
