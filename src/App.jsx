import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import GamesTable from './components/GamesTable.jsx';
import InsertGame from './components/InsertGame.jsx';
import RemoveGame from './components/RemoveGame.jsx';
import './App.css';

export default function App() {
  return (
    React.createElement(Router, null,
      React.createElement('div', { className: 'App' },
        React.createElement(NavBar),
        React.createElement('div', { className: 'content' },
          React.createElement(Routes, null,
            React.createElement(Route, { path: '/remove-game', element: React.createElement(RemoveGame) }),
            React.createElement(Route, { path: '/insert-game', element: React.createElement(InsertGame) }),
            React.createElement(Route, { path: '/', element: React.createElement(GamesTable) })
          )
        )
      )
    )
  );
}