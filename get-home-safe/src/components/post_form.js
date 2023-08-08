import React, { useState, useContext } from 'react';
import { db, storage } from '../index'; // Make sure you're importing the correct Firebase utilities
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import UserContext from './user_context';

function PostForm() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const { username } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === '' || message === '') {
      setIsFormInvalid(true);
      return;
    }

    setIsFormInvalid(false);

    let imageURL = '';

    const imageFile = document.getElementById('photo').files[0];
    console.log(imageFile); // Log the selected file

    if (imageFile) {
      const storageRef = ref(storage, `posts/images/${imageFile.name}`);

      try {
        // Upload the image to Firebase Storage
        const uploadTaskSnapshot = await uploadBytesResumable(storageRef, imageFile);

        // Get the download URL for the uploaded image
        imageURL = await getDownloadURL(uploadTaskSnapshot.ref);
        console.log('Image uploaded successfully to Firebase Storage.');
      } catch (error) {
        console.error('Error uploading image: ', error);
        alert('Error uploading image. Please try again.');
        return;
      }
    }

    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        message: message,
        postedBy: username,
        imageURL: imageURL,
        postTime: Timestamp.now()
      });

      handleClose();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleClose = () => {
    window.location.href = "/";
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





