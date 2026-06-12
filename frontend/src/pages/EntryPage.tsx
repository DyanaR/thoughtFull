import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEntryById, updateEntry } from "../services/entries";
import { useAuth0 } from "@auth0/auth0-react";
import type { Entry } from "../types";
import { useNavigate, useLocation } from "react-router-dom";
import SelectMoods from "../components/SelectMoods";
import "../App.css";
import { IoIosArrowBack, IoIosMic } from "react-icons/io";
import { MdMood } from "react-icons/md";
import { formatUpdatedAt } from "../utils/dateUtils";

function EntryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { getAccessTokenSilently } = useAuth0();

  const [entry, setEntry] = useState<Entry | null>(null);

  const [showMoods, setShowMoods] = useState(false);

  const [selectedMoodIds, setSelectedMoodIds] = useState<string[]>([]);

  useEffect(() => {
    const transcript = location.state?.transcript;

    if (!transcript || !entry) return;

    const updatedContent = entry.content
      ? `${entry.content}\n\n${transcript}`
      : transcript;

    setEntry({ ...entry, content: updatedContent });

    const saveTranscript = async () => {
      if (!id) return;

      const token = await getAccessTokenSilently();

      await updateEntry(token, id, {
        content: updatedContent,
      });
    };

    saveTranscript();
  }, [location.state?.transcript, entry?.id]);

  useEffect(() => {
    const fetchEntry = async () => {
      if (!id) return;

      const token = await getAccessTokenSilently();
      const entryData = await getEntryById(token, id);

      setEntry(entryData);
      setSelectedMoodIds(entryData.moods.map((mood) => mood.id));
    };

    fetchEntry();
  }, [id, getAccessTokenSilently]);

  if (!entry) {
    return <p>Loading entry...</p>;
  }

  const handleSave = async () => {
    if (!id || !entry) return;

    const token = await getAccessTokenSilently();

    const updatedEntry = await updateEntry(token, id, {
      title: entry.title,
      content: entry.content,
    });

    setEntry(updatedEntry);
  };

  const handleMoodSelectionChange = async (updatedMoodIds: string[]) => {
    if (!id) return;

    setSelectedMoodIds(updatedMoodIds);

    const token = await getAccessTokenSilently();

    const updatedEntry = await updateEntry(token, id, {
      moodIds: updatedMoodIds,
    });

    setEntry(updatedEntry);
  };

  // const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();

  //   if (!entry.id) return;

  //   const confirmDelete = window.confirm("Delete this entry?");
  //   if (!confirmDelete) return;

  //   const token = await getAccessTokenSilently();
  //   await deleteEntry(token, entry.id);

  //   navigate("/home");
  // };

  return (
    <>
      <div style={{ padding: "var(--lg-container)" }}>
        <div
          className="navbar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <IoIosArrowBack
              className="icons"
              onClick={() => navigate("/home")}
            />
            <h3 style={{ fontWeight: "600" }}>Edit Journal</h3>
          </div>

          {/* <h1 className="logo">
            thought<span>Full</span>
          </h1> */}

          <div className="mood-menu-wrapper">
            <MdMood
              className="icons"
              onClick={() => setShowMoods((prev) => !prev)}
            />
            {showMoods && (
              <>
                <div
                  className="mood-click-outside"
                  onClick={() => setShowMoods(false)}
                />

                <div className="mood-popover">
                  <SelectMoods
                    selectedMoodIds={selectedMoodIds}
                    onMoodSelectionChange={handleMoodSelectionChange}
                    align="right"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div
          className="entry-page"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1rem",
              paddingTop: "3rem",
              paddingBottom: "2rem",
            }}
          >
            <p className="date-time-pill">{formatUpdatedAt(entry.updatedAt)}</p>
            <div
              style={{
                display: "flex",
                gap: ".5rem",
              }}
            >
              {entry.moods.map((mood) => (
                <span
                  key={mood.id}
                  className="selected-mood-pill"
                  style={{
                    backgroundColor: mood.color,
                    cursor: "default",
                  }}
                >
                  {mood.name}
                </span>
              ))}
            </div>
          </div>

          <input
            value={entry.title}
            onChange={(e) => setEntry({ ...entry, title: e.target.value })}
            onBlur={handleSave}
            className="journal-title-input"
          />
          <textarea
            value={entry.content}
            onChange={(e) => setEntry({ ...entry, content: e.target.value })}
            onBlur={handleSave}
            className="journal-content-input"
            // style={{
            //   width: "100%",
            //   minHeight: "300px",
            //   border: "none",
            //   outline: "none",
            //   background: "transparent",
            //   resize: "none",
            // }}
          />
        </div>
        <div className="buttons-group">
          {/* <button type="button" className="group-button" onClick={handleDelete}>
            <MdOutlineDelete className="icons" />
          </button> */}

          <div className="divider" />
          <button
            type="button"
            className="third-button bottom-right"
            onClick={() =>
              navigate("/record-audio", {
                state: {
                  entryId: entry.id,
                  returnTo: "edit-entry",
                  userTitle: entry.title,
                  userContent: entry.content,
                  moodIds: selectedMoodIds,
                  selectedMoods: entry.moods,
                  startRecording: true,
                },
              })
            }
          >
            <IoIosMic className="icons" />
          </button>

          <div className="divider" />
        </div>
      </div>
    </>
  );
}

export default EntryPage;
