import { useEffect, useState } from "react";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { getCurrentEntries } from "../services/entries";
import { getCurrentUser } from "../services/users";
import EntryList from "../components/EntryList";
import type { User, Entry } from "../types";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi2";

function HomePage() {
  // loginWithRedirect: redirects user to Auth0 login page
  // logout: logs user out and redirects back to app
  // isAuthenticated: true if user is logged in, false otherwise
  // user: object containing logged-in user ingo (e.g., name, email)
  const { logout, getAccessTokenSilently } = useAuth0();

  const navigate = useNavigate();

  const [backendUser, setBackendUser] = useState<User | null>(null);
  const [userEntries, setUserEntries] = useState<Entry[]>([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  // const [selectedEntry, setSelectedEntry] = useState<any>(null);

  const currentDate = new Date();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoadingEntries(true);

        const token = await getAccessTokenSilently();

        const user = await getCurrentUser(token);
        setBackendUser(user);

        const entries = await getCurrentEntries(token);
        setUserEntries(entries);
      } finally {
        setIsLoadingEntries(false);
      }
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
      <div className="home-page" style={{ padding: "var(--lg-container)" }}>
        {/* user not logged in */}
        {/* {!isAuthenticated && (
            <div onClick={() => loginWithRedirect()}>Login</div>
          )} */}

        {/* user logged in */}
        <div className="home-static">
          {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "1rem",
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
          </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <FiLogOut
              className="icons"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            />
          </div>

          <div className="home-header" style={{ paddingBottom: "5rem" }}>
            <p style={{ fontSize: "14px" }}>{formatCurrentDate(currentDate)}</p>
            <h2>Hi {backendUser?.name}, Welcome!</h2>
          </div>
        </div>

        {backendUser && (
          <>
            <h3 style={{ paddingBottom: "1rem" }}>Recent Journal Entries</h3>
            <div className="entries-scroll-area">
              {isLoadingEntries ? (
                <div className="no-entries-message">Loading entries...</div>
              ) : userEntries.length === 0 ? (
                <div className="no-entries-message">
                  No journal entries yet. Start by writing a thought or
                  recording a reflection.
                </div>
              ) : (
                <EntryList
                  entries={userEntries}
                  onEntryDeleted={(deletedId) =>
                    setUserEntries((prev) =>
                      prev.filter((entry) => entry.id !== deletedId),
                    )
                  }
                />
              )}
            </div>
          </>
        )}
        {/* <button className="primary-button" onClick={() => navigate("/moods")}>
          Add Entry
        </button> */}
        <button
          className="third-button bottom-right"
          onClick={() => navigate("/moods")}
        >
          <HiOutlinePencil />
        </button>
      </div>
    </>
  );
}

export default HomePage;
