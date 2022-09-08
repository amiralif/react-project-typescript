import React, { useEffect, useState } from "react";
import { Id, toast, ToastItem } from "react-toastify";
import classes from "./Authenticate.module.css";
import { useDispatch, useSelector } from "react-redux";
// import { register, login } from "../../store";
import { login, automaticLogout } from "../../features/loginSlice";
import { register } from "../../features/registerSlice";

import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { AppDispatch } from "../../store";

function Authenticate() {
  // VARIABLES
  const [isLeft, setLeft] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [isLoading, setLoading] = useState(false);

  const toastIdRegister= React.useRef<Id|null>(null);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const buttonHandle = () => {
    const container = document.getElementsByClassName(
      `${classes.container}`
    )[0];
    setPassword("");
    setPasswordConf("");

    if (isLeft) {
      container.classList.add(`${classes.right_panel_active}`);

      setLeft(false);
    } else {
      container.classList.remove(`${classes.right_panel_active}`);

      setLeft(true);
    }
  };

  // REGISTER
  const {
    status: registerStatus,

    data: registerData,
  } = useSelector(
    (store: { register: { status: string; data: string } }) => store.register
  );

  const registerForm = (e: any) => {
    e.preventDefault();

    if (!password || !passwordConf) {
      toast.error("PLS Enter Password and Password Confirm !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { width: "380px", right: "100px" },
      });
    } else if (password !== passwordConf) {
      setPassword("");
      setPasswordConf("");
      toast.error("passwords don't match!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toastIdRegister.current = toast.loading("REGISTERING, WAIT...", {
        position: "top-right",
      });
      console.log("Authen: ", email, password);
      dispatch(register({ email, password }));
    }
  };

  useEffect(() => {
    if (registerStatus === "success") {
      toast.update(toastIdRegister.current||"", {
        render: "REGISTERED SUCCESSFULLY!",
        type: "success",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        isLoading: false,
        delay: 500,
      });
      buttonHandle();
    }
    if (registerStatus === "failed") {
      toast.update(toastIdRegister.current||"", {
        render: registerData,
        type: "error",
        delay: 1000,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        isLoading: false,
      });
    }
  }, [registerData, registerStatus]);

  // LOGIN

  const {
    status: loginStatus,

    data: loginData,
  } = useSelector(
    (store: { login: { status: string; data: string } }) => store.login
  );

  const loginForm = (e: any) => {
    e.preventDefault();
    if (!password) {
      toast.error("PLS Enter Password !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { width: "380px", right: "100px" },
      });
    } else {
      setLoading(true);
      dispatch(login({ email, password }));
    }
  };

  useEffect(() => {
    if (loginStatus === "success") {
      toast.success("LOGIN SUCCESSFULLY!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: true,
        progress: undefined,
      });
      setLoading(false);
      dispatch(automaticLogout(parseInt(localStorage.getItem("exp") || "")));
      navigate("/movies");
    }
    if (loginStatus === "failed") {
      setLoading(false);
      toast.error(loginData, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [loginData, loginStatus]);

  return (
    <div className={`${classes.wrapper}`}>
      <div className={`${classes.container} ${classes.right_panel_active}`}>
        <div className={`${classes.sign_up_container}`}>
          <form className={`${classes.form}`} onSubmit={registerForm}>
            <h1 className={`${classes.authH1}`}>Create Account</h1>
            <div className={`${classes.social_links}`}>
              <div className={`${classes.social_Links_div}`}>
                <a
                  href="https://www.instagram.com/amirali._fa/"
                  target="_blank"
                  rel="noreferrer"
                  className={`${classes.social_Links_a}`}
                >
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </div>
              <div className={`${classes.social_Links_div}`}>
                <a
                  href="https://www.linkedin.com/in/amirali-farzandy-2ba5a6240"
                  target="_blank"
                  rel="noreferrer"
                  className={`${classes.social_Links_a}`}
                >
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </div>
              <div className={`${classes.social_Links_div}`}>
                <a
                  href="https://t.me/amirali_far"
                  target="_blank"
                  rel="noreferrer"
                  className={`${classes.social_Links_a}`}
                >
                  <i className="fa fa-telegram" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <span className={`${classes.authSpan}`}>
              {" "}
              use your email for registration
            </span>
            <input
              className={`${classes.authInput}`}
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              className={`${classes.authInput}`}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              className={`${classes.authInput}`}
              type="password"
              placeholder="Confirm Password"
              value={passwordConf}
              onChange={(event) => {
                setPasswordConf(event.target.value);
              }}
            />
            <button className={`${classes.form_btn} ${classes.authButton}`}>
              sign Up
            </button>
          </form>
        </div>
        <div className={`${classes.sign_in_container}`}>
          <form className={`${classes.form}`} onSubmit={loginForm}>
            <h1 className={`${classes.authH1}`}>Sign In</h1>
            <div className={`${classes.social_links}`}>
              <div className={`${classes.social_Links_div}`}>
                <a
                  href="https://www.instagram.com/amirali._fa/"
                  target="_blank"
                  rel="noreferrer"
                  className={`${classes.social_Links_a}`}
                >
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </div>
              <div className={`${classes.social_Links_div}`}>
                <a
                  href="https://www.linkedin.com/in/amirali-farzandy-2ba5a6240"
                  target="_blank"
                  rel="noreferrer"
                  className={`${classes.social_Links_a}`}
                >
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </div>
              <div className={`${classes.social_Links_div}`}>
                <a
                  href="https://t.me/amirali_far"
                  target="_blank"
                  rel="noreferrer"
                  className={`${classes.social_Links_a}`}
                >
                  <i className="fa fa-telegram" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <span className={`${classes.authSpan}`}> use your account</span>
            <input
              type="email"
              required
              className={`${classes.authInput}`}
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              className={`${classes.authInput}`}
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button className={`${classes.form_btn} ${classes.authButton}`}>
              Sign In
            </button>
            {isLoading ? <Loading /> : null}
          </form>
        </div>
        <div className={`${classes.overlay_container}`}>
          <div className={`${classes.overlay_right}`}>
            <h1 className={`${classes.authH1}`}>Welcome Back</h1>
            <p className={`${classes.authP}`}>
              To keep connected with us please login with your personal info
            </p>
            <button
              id="signIn"
              className={`${classes.overlay_btn} ${classes.authButton}`}
              onClick={buttonHandle}
            >
              sign In
            </button>
          </div>
          <div className={`${classes.overlay_left}`}>
            <h1 className={`${classes.authH1}`}>
              Hello,Welcome to our WebSite{" "}
            </h1>
            <p className={`${classes.authP}`}>
              Enter Your personal details and start suggesting movies
            </p>
            <button
              id="signUn"
              className={`${classes.overlay_btn} ${classes.authButton}`}
              onClick={buttonHandle}
            >
              sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authenticate;
