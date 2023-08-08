import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Home from './components/home_page';
import AddPost from './components/add_post';
import MessageDetail from './components/message_detail';
import Settings from './components/settings';
import EditSettings from './components/edit_setting';
import GetHomeSafeFeature from './components/get_home_safe';
import SearchResult from './components/search_result';
import DeletedPost from './components/deleted_post';
import FriendsListPage from './components/freind_list_page';
import DirectMessage from './components/direct_message';
import SignInPage from './components/signIn_page';
import SignUpPage from './components/sign_up_page';
import { ForgotPwPage } from './components/forgot_pw';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return unsubscribe;
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/message-detail/:threadId" element={<MessageDetail />} />
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/edit-settings" element={<EditSettings />} />
          <Route path="/request-walking-buddy" element={<GetHomeSafeFeature />} />
          <Route path="/search-results" element={<SearchResult />} />
          <Route path="/deleted-post" element={<DeletedPost />} />
          <Route path="/friend-list-page" element={<FriendsListPage />} />
          <Route path="/direct-message/:friendId" element={<DirectMessage />} />
          <Route path="/signup-page" element={<SignUpPage /> } />
          <Route path='/forgot-password' element={<ForgotPwPage />} />
          {/* Direct child of Router */}
          <Route path="/signin-page" element={<SignInPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
