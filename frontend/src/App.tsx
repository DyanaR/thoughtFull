import { useEffect, useState } from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { getCurrentUser } from "./services/api";

function App() {
  // loginWithRedirect: redirects user to Auth0 login page
  // logout: logs user out and redirects back to app
  // isAuthenticated: true if user is logged in, false otherwise
  // user: object containing logged-in user ingo (e.g., name, email)
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const [backendUser, setBackendUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) return;

      const token = await getAccessTokenSilently();

      const user = await getCurrentUser(token);
      setBackendUser(user);
      console.log(user);
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <div>
        <h1>ThoughtFull</h1>

        {/* user not logged in */}
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect()}>Login</button>
        )}

        {/* user logged in */}
        {isAuthenticated && (
          <>
            <h1>Welcome {user?.name}</h1>
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </button>
          </>
        )}

        {backendUser && <p>Backend user: {backendUser.name}</p>}
      </div>
    </>
  );
}

export default App;
