import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateCurrentUser } from "../services/users";
import { useAuth0 } from "@auth0/auth0-react";

function NamePage() {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    try {
      setError("");

      const token = await getAccessTokenSilently();

      await updateCurrentUser(token, {
        name: name.trim(),
      });

      navigate("/home", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Could not save your name. Please try again.");
    }
  };

  return (
    <div style={{ padding: "var(--lg-container)" }}>
      <h1
        className="logo"
        style={{ paddingTop: "3rem", paddingBottom: "5rem" }}
      >
        thought<span>Full</span>
      </h1>
      <h2>What should we call you?</h2>
      <p style={{ paddingTop: "1rem", fontSize: "14px" }}>
        This is how your name will appear throughout ThoughtFull.
      </p>
      {error && <p className="form-error show">{error}</p>}

      <input
        // style={{ font: "var(--font-h)" }}
        type="text"
        value={name}
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
        className="name-input"
      />

      <button
        className="primary-button"
        onClick={handleContinue}
        disabled={!name.trim()}
      >
        Continue
      </button>
    </div>
  );
}

export default NamePage;
