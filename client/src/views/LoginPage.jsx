import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import loginImage from "../img/mitsuha.png";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage({ url }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const addedData = { username, password };
      const { data } = await axios.post(`${url}/login`, addedData);

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Invalid input",
        icon: "error",
      });
    }
  }

  async function googleLogin(codeResponse) {
    try {
      console.log(codeResponse);
      const { data } = await axios.post(`${url}/google-login`, null, {
        headers: {
          token: codeResponse.credential,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  function usernameOnChange(event) {
    setUsername(event.target.value);
  }

  function passwordOnChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#092635",
        }}
      >
        {/* Image on the left */}
        <div
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "400px",
            maxHeight: "400px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${loginImage})`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        {/* Login form on the right */}
        <div
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "400px",
            maxHeight: "400px",
            padding: "40px",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#191919",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              textAlign: "center",
              color: "#fff",
            }}
          >
            Log In
          </h1>
  
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
            onSubmit={handleLogin}
          >
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "1rem", color: "#b6895b" }}>
                Username
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #b6895b",
                  borderRadius: "4px",
                  borderColor: "#b6895b",
                }}
                onChange={usernameOnChange}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "1rem", color: "#b6895b" }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #b6895b",
                  borderRadius: "4px",
                  borderColor: "#b6895b",
                }}
                onChange={passwordOnChange}
              />
            </div>
            <div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "#b6895b",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Log In
              </button>
            </div>
          </form>
  
          <div className="divider px-10">OR</div>
  
          <div className="mt-6 flex justify-center items-center">
            <GoogleLogin onSuccess={googleLogin} />
          </div>
  
          <p style={{ marginTop: "10px", textAlign: "center", color: "#fff" }}>
            Don't have an account?{" "}
            <Link
              to="/add-user"
              style={{ color: "#b6895b", textDecoration: "underline" }}
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
  
}
