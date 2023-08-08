import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, addDoc, Timestamp} from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Navbar from './navbar';
import FriendsList from './friends_list';
import { Footer } from './footer';
import { db } from '../index';
import UserContext from './user_context';

const DeletedMessage = () => <p>This post has been deleted.</p>;

const NormalMessage = ({ message, postedBy, imageUrl }) => (
  <>
    {imageUrl && <img src={imageUrl} alt="Post Image" style={{ maxWidth: '100%', height: 'auto' }} />}
    <p>{message}</p>
    <p>@{postedBy}</p>
  </>
);

const MessageDetail = () => {
  const { threadId } = useParams();
  const [threadDetail, setThreadDetail] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [commentBoxDisplay, setCommentBoxDisplay] = useState(false);
  const [isHeartFilled, setHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { username } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const docRef = doc(db, "posts", threadId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Fetched thread document:", docSnap.data());
        setThreadDetail(docSnap.data());
      } else {
        console.log("No such document!");
      }

      const querySnapshot = await getDocs(collection(db, "posts", threadId, "comments"));
      setComments(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [threadId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      text: commentInput,
      author: username,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "posts", threadId, "comments"), newComment);
    setComments(prevComments => [...prevComments, {...newComment, id: docRef.id}]);
    setCommentInput('');
    setCommentBoxDisplay(false);
  };

  const toggleHeartIcon = () => {
    setHeartFilled(!isHeartFilled);
    setLikeCount(isHeartFilled ? likeCount - 1 : likeCount + 1);
  };

  const postContent = threadDetail.isDeleted
    ? <DeletedMessage />
    : <NormalMessage message={threadDetail.message} postedBy={threadDetail.postedBy} imageUrl={threadDetail.imageURL} />;


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
              <h1>{threadDetail.title}</h1>
              <div className="message-content">
                {postContent}
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
