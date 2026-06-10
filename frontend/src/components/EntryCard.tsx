import { useNavigate } from "react-router-dom";

type EntryDetailsProps = {
  entry: any;
};

function EntryCard({ entry }: EntryDetailsProps) {
  const navigate = useNavigate();
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
      {/* <p>Created: {entry.createdAt}</p>
      <p>Updated: {entry.updatedAt}</p> */}
    </div>
  );
}

export default EntryCard;
