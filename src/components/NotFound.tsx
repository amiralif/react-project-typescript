import React from "react";
import classes from "../css/notFound.module.css";

function NotFound() {
  return (
    <div className={`${classes.body}`}>
      <p className={`${classes.pTag}`}>
        HTTP: <span>404</span>
      </p>
      <p className={`${classes.code}`}>
        <span className={`${classes.codeSpan}`}>this_page</span>.
        <em>not_found</em> = true;
      </p>
      <p className={`${classes.code}`}>
        <span className={`${classes.codeSpan}`}>if</span>&#40;
        <b>you_spelt_it_wrong</b>&#41;&nbsp;&#123;
        <span> try_again()</span>; &#125;
      </p>
      <p className={`${classes.code}`}>
        <span className={`${classes.codeSpan}`}>
          else if &#40;<b>we_screwed_up</b>&#41;
        </span>
        &nbsp;&#123;<em> alert </em>&#40;
        <i> "we're really sorry about that." </i>
        &#41;; <span>window</span>.<em>location</em> = home; &#125;
      </p>
    </div>
  );
}

export default NotFound;
