import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = ({ url }) => {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userData = { fullname, username, password };
      await axios.post(`${url}/add-user`, userData);
      console.log(userData);
      Swal.fire({
        title: "Registration successful",
        icon: "success",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Registration failed",
        text: error.response.data.message || "An error occurred during registration.",
        icon: "error",
      });
    }
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#092635",
        }}
      >
        <h1 style={{ color: "#fff", marginBottom: "20px" }}>Register</h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            width: "100%",
          }}
          onSubmit={handleRegister}
        >
          <label style={{ color: "#b6895b", marginBottom: "10px" }}>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            style={{ padding: "10px", marginBottom: "15px" }}
            value={fullname}
            onChange={handleFullNameChange}
            required
          />

          <label style={{ color: "#b6895b", marginBottom: "10px" }}>User Name</label>
          <input
            type="text"
            placeholder="Enter your username"
            style={{ padding: "10px", marginBottom: "15px" }}
            value={username}
            onChange={handleUsernameChange}
            required
          />

          <label style={{ color: "#b6895b", marginBottom: "10px" }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            style={{ padding: "10px", marginBottom: "15px" }}
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#b6895b",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </form>

        <p style={{ color: "#fff", marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#b6895b", textDecoration: "underline" }}>
            Log in here
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
