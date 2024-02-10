import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { userAuth } from './firebase.js';
import NavBar from './components/NavBar.jsx';
import GamesTable from './components/GamesTable.jsx';
import InsertGame from './components/InsertGame.jsx';
import RemoveGame from './components/RemoveGame.jsx';
import LoginPage from './components/LoginPage.jsx';
import MobileView from './components/Mobile-View/MobileView.jsx';
import './App.css';

const PrivateRoute = ({ element: Element, logCheck }) => {
  return logCheck ? (
      <Element />
  ) : (
      <Navigate to="/login" replace state={{ from: '/' }} />
  )
}

export default function App() {
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(userAuth, (user) => {
      setLogged(!!user);
    });
    return () => unsub();
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <NavBar />
          <div className="content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/remove-game"
                element={<PrivateRoute element={RemoveGame} logCheck={isLogged} />}
              />
              <Route
                path="/insert-game"
                element={<PrivateRoute element={InsertGame} logCheck={isLogged} />}
              />
              <Route
                path="/"
                element={<PrivateRoute element={GamesTable} logCheck={isLogged} />}
              />
            </Routes>
          </div>
        </div>
      </Router>
      <div className="mobile-content">
        <MobileView />
      </div>
    </>
  );
}
