import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link to="/" className="logo">Main</Link>
            <nav className="nav">
              <Link to="/login">Login / Register</Link>
            </nav>
        </header>
    );
}