import { useNavigate } from "react-router-dom";
import { deleteEntry } from "../services/api";
import { useAuth0 } from "@auth0/auth0-react";

type EntryCardProps = {
  entry: any;
  onEntryDeleted: (id: string) => void;
};

function EntryCard({ entry, onEntryDeleted }: EntryCardProps) {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      style={{
        backgroundColor: "white",
        width: "60%",
        cursor: "pointer",
      }}
      onClick={() =>
        navigate(`/entries/${entry.id}`, {
          state: entry,
        })
      }
    >
      <h2 style={{ color: "black" }}>{entry.title}</h2>
      <p>{entry.content}</p>
      <p>{entry.moods.join(", ")}</p>
      <button onClick={handleDelete}>Delete Entry</button>
      {/* <p>Created: {entry.createdAt}</p>
      <p>Updated: {entry.updatedAt}</p> */}
    </div>
  );
}

export default EntryCard;
