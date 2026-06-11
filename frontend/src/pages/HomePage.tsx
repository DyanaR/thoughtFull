import { useEffect, useState } from "react";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { getCurrentEntries } from "../services/entries";
import { getCurrentUser } from "../services/users";
import EntryList from "../components/EntryList";
import type { User, Entry } from "../types";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function HomePage() {
  // loginWithRedirect: redirects user to Auth0 login page
  // logout: logs user out and redirects back to app
  // isAuthenticated: true if user is logged in, false otherwise
  // user: object containing logged-in user ingo (e.g., name, email)
  const { logout, user, getAccessTokenSilently } = useAuth0();

  const navigate = useNavigate();

  const [backendUser, setBackendUser] = useState<User | null>(null);
  const [userEntries, setUserEntries] = useState<Entry[]>([]);
  // const [selectedEntry, setSelectedEntry] = useState<any>(null);

  const currentDate = new Date();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getAccessTokenSilently();

      const user = await getCurrentUser(token);
      setBackendUser(user);

      const entries = await getCurrentEntries(token);
      setUserEntries(entries);
    };

    fetchUser();
  }, [getAccessTokenSilently]);

  function formatCurrentDate(date: Date) {
    return `Today, ${date.getDate()} ${date.toLocaleDateString([], {
      month: "long",
    })}`;
  }

  return (
    <>
      <div style={{ padding: "var(--lg-container)" }}>
        <div>
          {/* user not logged in */}
          {/* {!isAuthenticated && (
            <div onClick={() => loginWithRedirect()}>Login</div>
          )} */}

          {/* user logged in */}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "2rem",
              paddingBottom: "2rem",
            }}
          >
            <h1 className="logo">
              thought<span>Full</span>
            </h1>
            <FiLogOut
              className="icons"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            />
          </div>

          <div style={{ paddingBottom: "5rem" }}>
            <p style={{ fontSize: "14px" }}>{formatCurrentDate(currentDate)}</p>
            <h2>Hi {backendUser?.name}, Welcome!</h2>
          </div>

          {backendUser && (
            <>
              {/* <AddEntry
                getAccessTokenSilently={getAccessTokenSilently}
                // this updates the state manually for faster displaying of all entries
                // if want to gurantee synced with db, then call getCurrentEntries
                onEntryCreated={(entry) =>
                  setUserEntries((prev) => [entry, ...prev])
                }
              />
              <h3>{backendUser.name} Journal Entries </h3> */}
              <div>
                <h3>Recent Journal Entries</h3>
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
          <button className="primary-button" onClick={() => navigate("/moods")}>
            Add Entry
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
