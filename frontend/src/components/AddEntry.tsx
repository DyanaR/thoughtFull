import { useState } from "react";
import { createEntry } from "../services/entries";
import type { Entry } from "../types";

type AddEntryProps = {
  getAccessTokenSilently: () => Promise<string>;
  onEntryCreated: (entry: Entry) => void;
};

function AddEntry({ getAccessTokenSilently, onEntryCreated }: AddEntryProps) {
  const [userTitle, setUserTitle] = useState("");
  const [userContent, setUserContent] = useState("");
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    moods: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = await getAccessTokenSilently();

    setNewEntry({
      ...newEntry,
      title: userTitle,
      content: userContent,
    });

    const createdEntry = await createEntry(token, {
      title: userTitle,
      content: userContent,
      moodIds: [],
    });

    onEntryCreated(createdEntry);

    setUserTitle("");
    setUserContent("");
  };

  return (
    <>
      <div>
        <h3>Record a new entry ...</h3>
        <form onSubmit={handleSubmit}>
          <label> Title </label>
          <input
            type="text"
            name="title"
            value={userTitle}
            onChange={(e) => setUserTitle(e.target.value)}
          ></input>{" "}
          <br />
          <label>Content</label>
          <input
            type="text"
            name="content"
            value={userContent}
            onChange={(e) => setUserContent(e.target.value)}
          ></input>
          <br />
          <input type="submit" value="Create Entry" />
        </form>
      </div>
    </>
  );
}

export default AddEntry;
