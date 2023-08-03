import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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



const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/message-detail" element={<MessageDetail />} />
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/edit-settings" element={<EditSettings />} />
          <Route path="/request-walking-buddy" element={<GetHomeSafeFeature />} />
          <Route path="/search-results" element={<SearchResult />} />
          <Route path="/deleted-post" element={<DeletedPost />} />
          <Route path="/friend-list-page" element={<FriendsListPage />} />
          <Route path="/direct-message" element={<DirectMessage />} />
          <Route path="/signin-page" element={<SignInPage />} />
          <Route path="/signup-page" element={<SignUpPage /> } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;







