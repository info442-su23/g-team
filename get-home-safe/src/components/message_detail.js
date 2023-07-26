import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Navbar from './navbar';
import FriendsList from './friends_list';
import '../../src/style.css';

const MessageDetail = () => {
  const [comments, setComments] = useState([
    { id: 1, text: "Comment written by user 1", author: "@User 1" },
    { id: 2, text: "Comment written by user 2", author: "@User 2" },
    { id: 3, text: "Comment written by user 3", author: "@User 3" }
  ]);

  const [commentInput, setCommentInput] = useState('');
  const [commentBoxDisplay, setCommentBoxDisplay] = useState(false);
  const [isHeartFilled, setHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, { id: Date.now(), text: commentInput, author: "@Your Username" }]);
    setCommentInput('');
    setCommentBoxDisplay(false);
  };

  const toggleHeartIcon = () => {
    setHeartFilled(!isHeartFilled);
    setLikeCount(isHeartFilled ? likeCount - 1 : likeCount + 1);
  };

  return (
    <>
      <Navbar />
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
    </>
  );
};

export default MessageDetail;




