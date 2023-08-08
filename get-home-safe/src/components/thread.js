import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

// Main component to display a thread box (title, message, and message icons)
const ThreadBox = ({ title, message, postedBy, postTime, isDeleted = false, id }) => {
  const [isHeartFilled, setHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleHeartIcon = (e) => {
    e.stopPropagation();
    setHeartFilled(!isHeartFilled);
    setLikeCount(isHeartFilled ? likeCount - 1 : likeCount + 1);
  };

  const postContent = isDeleted
    ? <p>This post has been deleted.</p>
    : (
      <>
        {/* Display the message content */}
        <p>{message}</p>
        {/* Display the username of the user who posted the message */}
        <p>Posted by {postedBy}</p>
      </>
    );

  const icons = !isDeleted && (
    <>
      {/* Heart icon - changes based on whether it's filled or not */}
      <FontAwesomeIcon
        icon={isHeartFilled ? solidHeart : regularHeart}
        onClick={toggleHeartIcon}
      />
      {/* Display the number of likes */}
      <span className="like-count">{likeCount}</span>
      {/* Ellipsis icon (to be implemented) */}
      <FontAwesomeIcon icon={faEllipsisH} />
    </>
  );

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "Unknown Date";
    const date = new Date(timestamp.seconds * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};



  const postLink = isDeleted ? "/deleted-post" : `/message-detail/${id}`;
  const postTitle = isDeleted ? "Deleted Post" : title;

  return (
    <div className="thread-box">
      <Link to={postLink}>
        <h2 onClick={() => setIsOpen(!isOpen)}>{postTitle}</h2>
      </Link>
      <div id={title} className={`thread ${isOpen ? '' : 'hidden'}`}>
        <div className="message">
          {postContent}
          <p>Posted on {formatDate(postTime)}</p>
          <div className="message-icons">
            {icons}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadBox;



