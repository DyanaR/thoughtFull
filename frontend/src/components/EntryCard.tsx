import { useNavigate } from "react-router-dom";
import { deleteEntry } from "../services/entries";
import { useAuth0 } from "@auth0/auth0-react";
import type { Entry } from "../types";
import { MdOutlineDelete } from "react-icons/md";
import { formatUpdatedAt } from "../utils/dateUtils";

type EntryCardProps = {
  entry: Entry;
  onEntryDeleted: (id: string) => void;
};

function EntryCard({ entry, onEntryDeleted }: EntryCardProps) {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const handleDelete = async (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();

    if (!entry.id) return;

    const confirmDelete = window.confirm("Delete this entry?");
    if (!confirmDelete) return;

    const token = await getAccessTokenSilently();
    await deleteEntry(token, entry.id);
    onEntryDeleted(entry.id);
  };

  return (
    <div
      className="entry-card"
      onClick={() =>
        navigate(`/entries/${entry.id}`, {
          state: entry,
        })
      }
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 className="entry-title">{entry.title}</h3>
        <MdOutlineDelete onClick={handleDelete} />
      </div>
      <p className="entry-content">{entry.content}</p>
      <p className="small-text">{formatUpdatedAt(entry.updatedAt)}</p>
      <div
        style={{
          display: "flex",
          gap: ".5rem",
        }}
      >
        {entry.moods.map((mood) => (
          <span
            key={mood.id}
            style={{
              backgroundColor: mood.color,
            }}
            className="selected-mood-pill"
          >
            {mood.name}
          </span>
        ))}
      </div>

      {/* <p>Created: {entry.createdAt}</p>
       */}
    </div>
  );
}

export default EntryCard;
