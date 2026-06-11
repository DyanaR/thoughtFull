import EntryCard from "./EntryCard";
import type { Entry } from "../types";

type EntryListProps = {
  entries: Entry[];
  onEntryDeleted: (id: string) => void;
};

function EntryList({ entries, onEntryDeleted }: EntryListProps) {
  return (
    <>
      <div
        id="entries"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          width: "100%",
          padding: "1rem 0",
          paddingBottom: "20rem",
        }}
      >
        {entries.map((entry: any) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onEntryDeleted={onEntryDeleted}
          />
        ))}
      </div>
    </>
  );
}

export default EntryList;
