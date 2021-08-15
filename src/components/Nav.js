import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ setLibraryStatus, libraryStatus }) => {
  return (
    <nav>
      <div className="nav-container">
        <button onClick={() => setLibraryStatus(!libraryStatus)}>
          Today's playlist
          <FontAwesomeIcon icon={faMusic} />
        </button>
        <h1>Shuffle</h1>
        <h1>Volume</h1>
      </div>
    </nav>
  );
};

export default Nav;
