import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleAuthClick = () => {
    loginWithRedirect();
  };

  if (isLoading) return null;

  return (
    <div className="landing-page">
      <h1 className="logo">
        thought<span>Full</span>
      </h1>

      <h2 style={{ paddingTop: "1rem", fontSize: "28px" }}>
        Journal Your Heart Out
      </h2>

      <p className="landing-subtitle">
        Capture your thoughts and moods from every part of life
      </p>

      <button className="secondary-button" onClick={handleAuthClick}>
        Get Started
      </button>

      <p className="small-text">
        Already User?{" "}
        <span onClick={handleAuthClick} style={{ cursor: "pointer" }}>
          <u>Log in.</u>
        </span>
      </p>
    </div>
  );
}

export default LandingPage;
