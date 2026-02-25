/*
 * Filename		  : App.jsx
 * Project		  : frontend-assignment-garciaerin
 * By			      : Erin Garcia
 * Date 		    : 2026-03-01
 * Description	: This file contains the main home page of the web app.
 */


import { Routes, Route, Link } from "react-router-dom";
import ForumView from "./views/forums";
import FavouritesView from "./views/favourites";
import "./index.css"


export default function App() {
  return (
    <div>
      <h1 className="header">Erin Garcia – Creddit</h1>

      <nav className="nav">
        <Link to="/">Forums </Link>
        <Link to="/favourites"> Favourites</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ForumView />} />
        <Route path="/favourites" element={<FavouritesView />} />
      </Routes>
    </div>
  );
}