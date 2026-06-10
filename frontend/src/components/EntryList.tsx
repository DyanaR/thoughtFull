import EntryCard from "./EntryCard";

interface Entry {
  id: number;
  title: string;
  moods: string;
  content: string;
}

interface EntryListProps {
  entries: Entry[];
}

function EntryList({ entries }: EntryListProps) {
  return (
    <>
      <div
        id="entries"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {entries.length > 0 ? (
          entries.map((entry) => <EntryCard key={entry.id} entry={entry} />)
        ) : (
          <p>No entries yet.</p>
        )}
      </div>
    </>
  );
}

export default EntryList;
