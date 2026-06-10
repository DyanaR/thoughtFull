import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEntryById, updateEntry } from "../services/api";
import { useAuth0 } from "@auth0/auth0-react";

function EntryPage() {
  const { id } = useParams();
  const { getAccessTokenSilently } = useAuth0();

  type Entry = {
    id: string;
    title: string;
    content: string;
    moods: string[];
    createdAt: string;
    updatedAt: string;
  };

  const [entry, setEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      if (!id) return;

      const token = await getAccessTokenSilently();
      const entryData = await getEntryById(token, id);

      setEntry(entryData);
      setEntry(entryData);
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

  function formatUpdatedAt(dateString: string) {
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
      <div
        className="entry-page"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex" }}>
          <p
            style={{
              border: "solid 1px white",
              borderRadius: ".5rem",
              padding: "4px",
            }}
          >
            {formatUpdatedAt(entry.updatedAt)}
          </p>
          <div>
            {entry.moods.map((mood: string) => (
              <span key={mood}>{mood}</span>
            ))}
          </div>
        </div>
        <input
          value={entry.title}
          onChange={(e) => setEntry({ ...entry, title: e.target.value })}
          onBlur={handleSave}
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            border: "none",
            outline: "none",
            background: "transparent",
          }}
        />
        <textarea
          value={entry.content}
          onChange={(e) => setEntry({ ...entry, content: e.target.value })}
          onBlur={handleSave}
          style={{
            width: "100%",
            minHeight: "300px",
            border: "none",
            outline: "none",
            background: "transparent",
            resize: "none",
          }}
        />
      </div>
    </>
  );
}

export default EntryPage;
