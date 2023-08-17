import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { doc, updateDoc, onSnapshot, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../index';  // Adjust the path to point to your index.js file

const ThreadBox = ({ title, message, postedBy, postTime, isDeleted = false, id }) => {
  const [isHeartFilled, setHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const postRef = doc(db, 'posts', id);
    const unsubscribe = onSnapshot(postRef, snapshot => {
      const data = snapshot.data();
      if (data) {
        setLikeCount(data.likeCount || 0);
        setHeartFilled(data.likedBy && data.likedBy.includes(auth.currentUser.uid));
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [id]);

  const toggleHeartIcon = async (e) => {
    e.stopPropagation();

    const newLikeCount = isHeartFilled ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);
    setHeartFilled(!isHeartFilled);

    // Update Firebase
    const postRef = doc(db, 'posts', id);
    if (isHeartFilled) {
      await updateDoc(postRef, {
        likeCount: newLikeCount,
        likedBy: arrayRemove(auth.currentUser.uid)
      });
    } else {
      await updateDoc(postRef, {
        likeCount: newLikeCount,
        likedBy: arrayUnion(auth.currentUser.uid)
      });
    }
  };

  const postContent = isDeleted
    ? <p>This post has been deleted.</p>
    : (
      <>
        <p>{message}</p>
        <p>Posted by {postedBy}</p>
      </>
    );

  const icons = !isDeleted && (
    <>
      <FontAwesomeIcon
        icon={isHeartFilled ? solidHeart : regularHeart}
        onClick={toggleHeartIcon}
      />
      <span className="like-count">{likeCount}</span>
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
