import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home_page';
import AddPost from './components/add_post';
import MessageDetail from './components/message_detail';
import Settings from './components/settings';
import EditSettings from './components/edit_setting';
import GetHomeSafeFeature from './components/get_home_safe';

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;







