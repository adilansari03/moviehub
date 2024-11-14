import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie-details/:movie_id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
