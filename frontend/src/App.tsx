import { useEffect, useState } from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { getCurrentUser, getCurrentEntries } from "./services/api";
import AddEntry from "./components/AddEntry";

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
  const [userEntries, setUserEntries] = useState<any[]>([]);
  const [userEntry, setUserEntry] = useState<any>(null);
  // const [newEntry, setNewEntry] = useState({
  //   title: "",
  //   content: "",
  //   moods: [],
  // });

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) return;

      const token = await getAccessTokenSilently();

      // user
      const user = await getCurrentUser(token);
      setBackendUser(user);
      console.log(user);

      // all entries
      const entries = await getCurrentEntries(token);
      setUserEntries(entries);
      console.log(entries);
    };
    fetchUser();
  }, [isAuthenticated, getAccessTokenSilently]);

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

        {backendUser && (
          <>
            <AddEntry
              getAccessTokenSilently={getAccessTokenSilently}
              // this updates the state manually for faster displaying of all entries
              // if want to gurantee synced with db, then call getCurrentEntries
              onEntryCreated={(entry) =>
                setUserEntries((prev) => [entry, ...prev])
              }
            />
            <h3>{backendUser.name} Journal Entries </h3>
            {userEntries.length > 0 ? (
              userEntries.map((entry) => (
                <div key={entry.id}>
                  <h3>{entry.title}</h3>
                  <p>{entry.moods}</p>
                  <p>{entry.content}</p>
                </div>
              ))
            ) : (
              <p>No entries yet.</p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
