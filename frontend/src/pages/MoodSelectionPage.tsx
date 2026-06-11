import SelectMoods from "../components/SelectMoods";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Mood } from "../types";
import { IoIosArrowBack } from "react-icons/io";

function MoodSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMoodIds, setSelectedMoodIds] = useState<string[]>(
    location.state?.moodIds ?? [],
  );

  const [selectedMoods, setSelectedMoods] = useState<Mood[]>(
    location.state?.selectedMoods ?? [],
  );

  const handleMoodSelectionChange = (
    updatedMoodIds: string[],
    updatedMoods: Mood[],
  ) => {
    setSelectedMoodIds(updatedMoodIds);
    setSelectedMoods(updatedMoods);
  };

  const handleNext = () => {
    navigate("/add-entry", {
      state: {
        moodIds: selectedMoodIds,
        selectedMoods: selectedMoods,
      },
    });
  };

  return (
    <div style={{ padding: "var(--lg-container)" }}>
      <div className="entry-progress">
        <div className="entry-progress-fill" style={{ width: "50%" }} />
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
          onClick={() => navigate("/home")}
          style={{
            position: "absolute",
            left: 0,
          }}
        />
        <h3>Create New Journal</h3>
      </div>
      <div style={{ paddingTop: "3rem", paddingBottom: "1rem" }}>
        <h2>What emotions do you feel right now?</h2>
        <p style={{ paddingTop: "1rem", fontSize: "14px" }}>
          Select up to 2 emotions.
        </p>
      </div>

      <div
        style={{
          padding: "3rem 0",
          flexWrap: "wrap",
          width: "40%",
        }}
      >
        <SelectMoods
          align="left"
          selectedMoodIds={selectedMoodIds}
          onMoodSelectionChange={handleMoodSelectionChange}
        />
      </div>

      <button className="primary-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default MoodSelectionPage;
