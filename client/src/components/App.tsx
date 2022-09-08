import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { checkAuthenticateStatus } from "../features/loginSlice";

import Authenticate from "./auth/Authenticate";
import MovieListComponent from "./movie/MovieListComponent";
import MovieComponent from "./movie/MovieComponent";
import CreateMovieComponent from "./movie/CreateMovieComponent";
import UpdateMovieComponent from "./movie/UpdateMovieComponent";
import DeleteMovieComponent from "./movie/DeleteMovieComponent";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import Search from "./Search";
import Loading from "./Loading";

function App() {
  const { status: loginData } = useSelector((store:any) => store.login);
  const dispatch:any = useDispatch();
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(checkAuthenticateStatus());
  }, [dispatch]);

  const search = (value:any) => {
    setIsLoading(true);
    if (!value || value === "") {
      setIsSearch(false);
      setSearchValue("");
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    } else {
      setIsSearch(true);
      setSearchValue(value);

      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  const contentToShow = () => {
    if (loginData === "success") {
      return (
        <BrowserRouter>
          <Navbar />
          <Search search={search} />
          <Routes>
            <Route path="/" element={<Authenticate />}/>
            {isLoading ? (
              <Route path="/movies" element={<Loading />}></Route>
            ) : (
              <Route
                path="/movies"
                element={
                  <MovieListComponent
                    search={searchValue}
                    isSearch={isSearch}
                  />
                }
              ></Route>
            )}
            <Route
              path="/movies"
              element={<MovieListComponent search={searchValue}
              isSearch={isSearch}/>}
              
            ></Route>
            <Route path="/movie/:movieId" element={<MovieComponent />}></Route>
            <Route
              path="/movie/create"
              element={<CreateMovieComponent />}
            ></Route>
            <Route
              path="/movie/update/:movieId"
              element={<UpdateMovieComponent />}
            ></Route>
            <Route
              path="/movie/delete/:movieId"
              element={<DeleteMovieComponent />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authenticate />}></Route>

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      );
    }
  };

  return (
    <div>
      {contentToShow()}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
