import { Link } from "react-router-dom";
import { MdMovie } from "react-icons/md";

function Header() {
  return (
    <header className="w-full md:px-12 px-5 py-5 bg-transparent flex items-center justify-between fixed top-0  border-[#525252] z-50">
      <Link
        to="/"
        className="text-[white] text-2xl font-bold flex items-center gap-1"
      >
        <MdMovie className="text-red-600" /> MovieHub
      </Link>
      <nav>
        <Link to="/" style={{ margin: "0 1rem", color: "white" }}>
          Home
        </Link>
        <Link to="/movies" style={{ margin: "0 1rem", color: "white" }}>
          Movies
        </Link>
      </nav>
    </header>
  );
}

export default Header;
