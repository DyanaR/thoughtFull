import { useEffect, useState } from "react";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { getCurrentEntries } from "../services/entries";
import { getCurrentUser } from "../services/users";
import AddEntry from "../components/AddEntry";
import EntryList from "../components/EntryList";
import type { User, Entry } from "../types";

function HomePage() {
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

  const [backendUser, setBackendUser] = useState<User | null>(null);
  const [userEntries, setUserEntries] = useState<Entry[]>([]);
  // const [selectedEntry, setSelectedEntry] = useState<any>(null);

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
            <div>
              <EntryList
                entries={userEntries}
                onEntryDeleted={(deletedId) =>
                  setUserEntries((prev) =>
                    prev.filter((entry) => entry.id !== deletedId),
                  )
                }
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;
