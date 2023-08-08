import React, { useState, useEffect, useContext } from 'react';
import { db } from '../index';
import { collection, query, where, getDocs } from 'firebase/firestore';
import profileImage from '../IMG/empty profile.jpeg';
import UserContext from './user_context';
import { useNavigate } from 'react-router-dom';

function BuddyRequests() {
  const [requests, setRequests] = useState([]);
  const { username, userId } = useContext(UserContext);
  const navigate = useNavigate();

  // Fetch buddy requests from Firestore on component
  useEffect(() => {
    const fetchRequests = async () => {
      // Access the 'buddyRequests' collection in Firestore
      const requestCollection = collection(db, 'buddyRequests');

      // Get all documents in the collection
      const q = query(requestCollection);
      const requestSnapshot = await getDocs(q);

      // Map the documents to an array of requests and set the state
      const fetchedRequests = requestSnapshot.docs.map(doc => {
        console.log("Request Username:", doc.data().username);
        return { id: doc.id, ...doc.data() };
      });
      setRequests(fetchedRequests);
      console.log("Fetched Requests:", fetchedRequests);
    };
    fetchRequests();
  }, [username]);

  // Function to fetch the user ID based on the username from Firestore
  const fetchUserIDByUsername = async (username) => {
    const userCollection = collection(db, 'users')
    const q = query(userCollection, where("username", "==", username));
    const userSnapshot = await getDocs(q);
    if (!userSnapshot.empty) {
      return userSnapshot.docs[0].id;
    }
    return null;
  }

  const handleRequestClick = async (requestorUsername) => {
    console.log("Using current UserID for query:", userId);

    // Fetch the user ID of the requestor based on their username
    const requestorUserId = await fetchUserIDByUsername(requestorUsername);
    if (!requestorUserId) {
      console.error("Could not find UserID for:", requestorUsername);
      return;
    }

    // Access the 'conversations' collection in Firestore
    const convoCollection = collection(db, 'conversations');

    // Query conversations where the current user is a participant
    const q = query(convoCollection, where("participants", "array-contains", userId));
    const convoSnapshot = await getDocs(q);
    console.log('All conversations involving current user:', convoSnapshot.docs.map(doc => doc.data()));

    // Check if there's an existing conversation between the current user and the requestor
    const existingConvo = convoSnapshot.docs.find(doc => {
      const participants = doc.data().participants;
      console.log('Participants for this conversation:', participants);
      return participants.includes(userId) && participants.includes(requestorUserId);
    });

    if (existingConvo) {
      // If conversation exists, find the opponent's ID and navigate to the DirectMessage page with it
      const opponentId = existingConvo.data().participants.find(id => id !== userId);
      navigate(`/direct-message/${opponentId}`);
    } else {
      // If no conversation exists, navigate to the DirectMessage page with the requestor's ID
      navigate(`/direct-message/${requestorUserId}`);
    }
  };

  return (
    <div className="buddy-request-container">
      <h2>Buddy Requests</h2>
      {requests.map(request => (
        <div className="buddy-request-box" onClick={() => handleRequestClick(request.username)} key={request.id}>
          <div className="buddy-request">@{request.username} Request for {request.peopleCount} people
            <div className="location">{request.location}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BuddyRequests;
