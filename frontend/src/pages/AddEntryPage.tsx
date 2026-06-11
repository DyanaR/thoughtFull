import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createEntry } from "../services/entries";
import { useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import type { Mood } from "../types";
import { MdOutlineDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import AudioTranscriber from "../components/AudioTranscriber";

function AddEntryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const moodIds = location.state?.moodIds ?? [];
  const selectedMoods: Mood[] = location.state?.selectedMoods ?? [];

  const [userTitle, setUserTitle] = useState("");
  const [userContent, setUserContent] = useState("");
  const [error, setError] = useState("");

  const [audioStatus, setAudioStatus] = useState("");
  const [audioError, setAudioError] = useState("");

  const currentDateTime = new Date();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userTitle.trim()) {
      setError("Your journal entry needs a title.");
      return;
    }

    if (!userContent.trim()) {
      setError("Your journal entry is empty.");
      return;
    }

    setError("");

    const token = await getAccessTokenSilently();

    await createEntry(token, {
      title: userTitle,
      content: userContent,
      moodIds,
    });

    navigate("/home");
  };

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 10000);

    return () => clearTimeout(timer);
  }, [error]);

  function formatDateTime(dateString: string) {
    const date = new Date(dateString);

    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const time = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    if (isToday) {
      return `Today, ${time}`;
    }

    if (isYesterday) {
      return `Yesterday, ${time}`;
    }

    return (
      date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      }) + `, ${time}`
    );
  }

  return (
    <>
      <div style={{ padding: "var(--lg-container)" }}>
        <div className="entry-progress">
          <div className="entry-progress-fill" style={{ width: "100%" }} />
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IoIosArrowBack
            className="icons"
            onClick={() =>
              navigate("/moods", {
                state: {
                  moodIds,
                  selectedMoods,
                },
              })
            }
            style={{
              position: "absolute",
              left: 0,
            }}
          />
          <h3>Create New Journal</h3>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            paddingTop: "3rem",
            paddingBottom: "2rem",
          }}
        >
          <p className="date-time-pill">
            {formatDateTime(currentDateTime.toISOString())}
          </p>
          <div
            style={{
              display: "flex",
              gap: ".5rem",
            }}
          >
            {selectedMoods.map((mood) => (
              <span
                key={mood.id}
                style={{ backgroundColor: mood.color }}
                className="selected-mood-pill"
              >
                {mood.name}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="entry-page">
          {audioStatus && <p className="small-text">{audioStatus}</p>}
          {audioError && <p className="form-error show">{audioError}</p>}
          <input
            value={userTitle}
            onChange={(e) => setUserTitle(e.target.value)}
            placeholder="Untitled"
            className="journal-title-input"
          />

          <textarea
            value={userContent}
            onChange={(e) => setUserContent(e.target.value)}
            placeholder="Journal your heart out ..."
            className="journal-content-input"
          />

          <p className={`form-error ${error ? "show" : ""}`}>{error}</p>

          <div className="buttons-group">
            <button
              type="button"
              className="group-button"
              onClick={() => navigate("/home")}
            >
              <MdOutlineDelete className="icons" />
            </button>

            <div className="divider" />

            <AudioTranscriber
              onTranscriptReady={(transcript) =>
                setUserContent((prev) =>
                  prev ? `${prev}\n\n${transcript}` : transcript,
                )
              }
              onStatusChange={setAudioStatus}
              onError={setAudioError}
            />

            <div className="divider" />

            <button className="group-button" type="submit">
              <FaCheck className="icons" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddEntryPage;
