import React, { useState } from 'react';
import '../../src/style.css';

function PostForm() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '' || message === '') {
      setIsFormInvalid(true);
    } else {
      setIsFormInvalid(false);
    }
  };

  const handleClose = () => {
    window.location.href = "/"; // redirect to home page
  };

  return (
    <div className="form-container">
      <a onClick={handleClose} className="closeBtn">X</a>
      <h1>Create A New Post</h1>
      <form id="postForm" action="#" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="formTitle">Post Title:</label><br/>
        <input type="text" id="formTitle" name="formTitle" maxLength="50" value={title} onChange={e => setTitle(e.target.value)} /><br/><br/>
        <label htmlFor="message">Message:</label><br/>
        <textarea id="message" name="message" rows="4" cols="40" maxLength="200" value={message} onChange={e => setMessage(e.target.value)} /><br/><br/>
        <label htmlFor="photo">Upload Photo (optional):</label><br/>
        <input type="file" id="photo" name="photo"/><br/><br/>
        <input type="submit" className="postBtn" value="Add Post" />
      </form>
      {isFormInvalid && <p id="fill-in-message" className="fill-in-message">Please fill in all the required fields!</p>}
    </div>
  );
}

export default PostForm;


