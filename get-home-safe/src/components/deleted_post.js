import React from 'react';
import '../CSS/style.css';
import FriendsList from './friends_list';

const DeletedPost = () => {
    return (
        <div className="container">
            <FriendsList />
            <div className="message-detail-container">
                <div className="message-container">
                    <h1>Post Deleted</h1>
                    <div className="message-content">
                        <p><i className="fas fa-exclamation-triangle"></i>
                            The following post has been deleted.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeletedPost;
