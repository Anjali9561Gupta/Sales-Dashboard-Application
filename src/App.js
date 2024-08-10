import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard1 from "./components/Dashboard1";
import Dashboard2 from './components/Dashboard2';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/today" element={<Dashboard1 />} />
        <Route path="/comparison" element={<Dashboard2 />} />
      </Routes>
    </Router>
  );
}

export default App;