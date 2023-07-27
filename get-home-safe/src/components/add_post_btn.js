import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

/* Code for the Add Post button displayed in the home page. */

const AddPostBtn = () => {
  return (
    <div className="add-post-container">
      <div className="add-post">
        <Link to="/AddPost">
          <div className="add-post-box">
            <span><FontAwesomeIcon icon={faPlus} /> Add Post</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AddPostBtn;


