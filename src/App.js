// src/App.js

import React from 'react';
import './App.css';
import Navbar from './Navbar';
import TaskList from './TaskList';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <TaskList />
      <Footer/>
    </div>
  );
}

export default App;
