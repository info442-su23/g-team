import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const ThreadBox = ({ title, message, postedBy }) => {
  const [isHeartFilled, setHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleHeartIcon = (e) => {
    e.stopPropagation(); // prevent event from propagating up to div click handler
    setHeartFilled(!isHeartFilled);
    setLikeCount(isHeartFilled ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="thread-box" onClick={() => setIsOpen(!isOpen)}>
      <Link to="/message-detail">
        <h2>{title}</h2>
      </Link>
      <div id={title} className={`thread ${isOpen ? '' : 'hidden'}`}>
        <div className="message">
          <p>{message}</p>
          <p>Posted by {postedBy}</p>
          <div className="message-icons">
            <FontAwesomeIcon
              icon={isHeartFilled ? solidHeart : regularHeart}
              onClick={toggleHeartIcon}
            />
            <span className="like-count">{likeCount}</span>
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadBox;





