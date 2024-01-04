import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  function handleCreateFormation() {
    navigate("/create-formation");
  }

  function handleAddForum() {
    navigate("/add-forums");
  }


  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  const betaStyle = {
    color: "#b6895b",
  };

  const logoutStyle = {
    cursor: "pointer",
    textDecoration: "none",
    color: "#fff",
    marginLeft: "1rem",
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo">
          supa
          <span style={betaStyle}>socca</span>
        </Link>
      </div>

      <div className="navbar-nav">
        <Link to="/add-forums" className="navbar-nav a"></Link>
        <a
          onClick={handleAddForum}
          className="navbar-nav logout-link cursor-pointer"
        >
          Add Forum<span style={betaStyle}></span>
        </a>
        <Link to="/create-formation" className="navbar-nav a"></Link>
        <a
          onClick={handleCreateFormation}
          className="navbar-nav logout-link cursor-pointer"
        >
          Create Formation<span style={betaStyle}>(Beta)</span>
        </a>
        <Link to="/add" className="navbar-nav a"></Link>
        <a
          onClick={handleLogout}
          className="navbar-nav logout-link cursor-pointer"
        >
          Logout
        </a>
      </div>
    </nav>
  );
}
