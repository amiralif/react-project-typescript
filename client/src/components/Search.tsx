import { useState } from "react";
import classes from "../css/Navbar.module.css";


const Search = (props: { search: (value: string) => void,val:string }) => {
  const [value, setValue] = useState(props.val);

  return (
    <nav className="row d-flex justify-content-center container mt-2">
      <div className="col-lg-6">
        <div className={`card ${classes.card}`}>
          <div className={`${classes.widgets}`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                props.search(value);
              }}
              className={` ${classes.navRow} `}
            >
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search a Movie"
                  aria-label="Search a Movie"
                  aria-describedby="basic-addon2"
                  value={value}
                  onChange={(e) => {
                    e.preventDefault();
                    setValue(e.target.value);
                  }}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Search;
