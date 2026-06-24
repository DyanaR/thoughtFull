import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/auth-redirect", { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleAuthClick = (screenHint?: "signup" | "login") => {
    loginWithRedirect({
      appState: {
        returnTo: "/auth-redirect",
      },
      authorizationParams: {
        screen_hint: screenHint,
      },
    });
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

      <button
        className="secondary-button"
        onClick={() => handleAuthClick("signup")}
      >
        Get Started
      </button>

      <p className="small-text">
        Already a user?{" "}
        <span
          onClick={() => handleAuthClick("login")}
          style={{ cursor: "pointer" }}
        >
          <u>Log in.</u>
        </span>
      </p>
    </div>
  );
}

export default LandingPage;
