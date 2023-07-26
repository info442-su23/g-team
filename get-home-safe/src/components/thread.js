import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

// Component for the message icons (heart, like count, and ellipsis)
const MessageIcons = ({ isHeartFilled, toggleHeartIcon, likeCount }) => (
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

// Component to display a message that has been deleted
const DeletedMessage = () => <p>This post has been deleted.</p>;

// Component to display a normal message
const NormalMessage = ({ message, postedBy }) => (
  <>
    {/* Display the message content */}
    <p>{message}</p>
    {/* Display the username of the user who posted the message */}
    <p>Posted by {postedBy}</p>
  </>
);

// Main component to display a thread box (title, message, and message icons)
const ThreadBox = ({ title, message, postedBy, isDeleted = false }) => {
  // State variables to handle the heart icon and like count
  const [isHeartFilled, setHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  // State variable to handle the visibility of the thread content (message and message icons)
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle toggling the heart icon (liking/unliking the post)
  const toggleHeartIcon = (e) => {
    e.stopPropagation(); // prevent event from propagating up to div click handler
    setHeartFilled(!isHeartFilled);
    setLikeCount(isHeartFilled ? likeCount - 1 : likeCount + 1);
  };

  // Determine which content to display based on whether the post is deleted or not
  const postContent = isDeleted
    ? <DeletedMessage /> // Display the "DeletedMessage" component if the post is deleted
    : <NormalMessage message={message} postedBy={postedBy} />; // Display the "NormalMessage" component for a normal post

  // Determine which message icons to display based on whether the post is deleted or not
  const icons = !isDeleted
    && <MessageIcons isHeartFilled={isHeartFilled} toggleHeartIcon={toggleHeartIcon} likeCount={likeCount} />;

  // Determine the link and title to navigate when the thread box is clicked
  const postLink = isDeleted ? "/deleted-post" : "/message-detail";
  const postTitle = isDeleted ? "Deleted Post" : title;

  return (
    <div className="thread-box" onClick={() => setIsOpen(!isOpen)}>
      <Link to={postLink}>
        <h2>{postTitle}</h2>
      </Link>
      <div id={title} className={`thread ${isOpen ? '' : 'hidden'}`}>
        <div className="message">
          {postContent}
          <div className="message-icons">
            {icons}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadBox;

