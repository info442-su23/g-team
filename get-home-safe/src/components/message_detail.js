import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Navbar from './navbar';
import FriendsList from './friends_list';
import { Footer } from './footer';
import '../../src/style.css';

const MessageDetail = () => {
  // State to store the comments
  // presetting the states will be helpful when we create the user dataset later.
  const [comments, setComments] = useState([
    { id: 1, text: "Comment written by user 1", author: "@User 1" },
    { id: 2, text: "Comment written by user 2", author: "@User 2" },
    { id: 3, text: "Comment written by user 3", author: "@User 3" }
  ]);

  // State necessary for keeping the user text/comment input
  const [commentInput, setCommentInput] = useState('');
  // State for whether the comment box will be displayed or not
  const [commentBoxDisplay, setCommentBoxDisplay] = useState(false);
  // State to track if the heart icon will be filled or not
  const [isHeartFilled, setHeartFilled] = useState(false);
  // State for keeping track of the likeCounts
  const [likeCount, setLikeCount] = useState(0);

  // Event handler for posting comment
  // When the submit button is pushed, the new comment with user's text input
  // will get added to the commnets array. Then clear the comment input and hide
  // the display of the comment box.
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, { id: Date.now(), text: commentInput, author: "@Your Username" }]);
    setCommentInput('');
    setCommentBoxDisplay(false);
  };

  //If the heart icon is clicked, the state of the icon will change to filled.
  // The count of the like will change depending on the status of the click / fill or not filled.
  const toggleHeartIcon = () => {
    setHeartFilled(!isHeartFilled);
    setLikeCount(isHeartFilled ? likeCount - 1 : likeCount + 1);
  };

return (
  <>
    <header>
      <Navbar />
    </header>

    <body>
      <div className="container">
        <FriendsList />

        <div className="message-detail-container">
          <div className="message-container">
            <h1>Post Title</h1>
            <div className="message-content">
              <p>This is the main content of the thread. It could be quite long and include multiple paragraphs.</p>
              <p>@user who posted the message</p>
              <div className="message-icons">
                <FontAwesomeIcon icon={isHeartFilled ? solidHeart : regularHeart} onClick={toggleHeartIcon} />
                <span className="like-count">{likeCount}</span>
                <FontAwesomeIcon icon={faEllipsisH} onClick={() => setCommentBoxDisplay(!commentBoxDisplay)} />
              </div>
            </div>
          </div>

          <div className="comments-container">
            <h2>Comments</h2>
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <p><strong>{comment.author}:</strong> {comment.text}</p>
              </div>
            ))}
          </div>

          {commentBoxDisplay && (
            <div>
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  className="comment-box"
                  placeholder="Add a comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <button type="submit" className='postCommentBtn'>Post</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </body>

    <footer>
      <Footer />
    </footer>
  </>
);
};

export default MessageDetail;




