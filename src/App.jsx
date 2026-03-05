import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import PostItem from './PostItem';
import ViewItem from './ViewItem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/postitem" element={<PostItem />} />
        <Route path="/viewitems" element={<ViewItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
