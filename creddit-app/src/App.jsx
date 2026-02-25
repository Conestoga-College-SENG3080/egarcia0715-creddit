import { Routes, Route, Link } from "react-router-dom";
import ForumView from "./views/forums";
import FavouritesView from "./views/favourites";


export default function App() {
  return (
    <div>
      <h1>Erin Garcia – Creddit Favourites</h1>

      <nav>
        <Link to="/">Forums</Link> |{" "}
        <Link to="/favourites">Favourites</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ForumView />} />
        <Route path="/favourites" element={<FavouritesView />} />
      </Routes>
    </div>
  );
}