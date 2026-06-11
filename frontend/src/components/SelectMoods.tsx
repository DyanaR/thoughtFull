import { useAuth0 } from "@auth0/auth0-react";
import { getMoods } from "../services/moods";
import { useEffect, useState } from "react";
import type { Mood } from "../types";
import MoodPill from "./MoodPill";

type SelectMoodsProps = {
  selectedMoodIds: string[];
  onMoodSelectionChange: (ids: string[], moods: Mood[]) => void;
  align?: "left" | "right" | "center";
};

function SelectMoods({
  selectedMoodIds,
  onMoodSelectionChange,
  align = "center",
}: SelectMoodsProps) {
  const { getAccessTokenSilently } = useAuth0();

  const [moods, setMoods] = useState<Mood[]>([]);

  useEffect(() => {
    const fetchMood = async () => {
      const token = await getAccessTokenSilently();
      const moodData = await getMoods(token);
      setMoods(moodData);
    };
    fetchMood();
  }, [getAccessTokenSilently]);

  const toggleMood = (moodId: string) => {
    let updatedMoodIds: string[];

    if (selectedMoodIds.includes(moodId)) {
      updatedMoodIds = selectedMoodIds.filter((id) => id !== moodId);
    } else {
      if (selectedMoodIds.length >= 2) return;
      updatedMoodIds = [...selectedMoodIds, moodId];
    }

    const updatedMoods = moods.filter((mood) =>
      updatedMoodIds.includes(mood.id),
    );
    onMoodSelectionChange(updatedMoodIds, updatedMoods);
  };

  return (
    <>
      <div>
        {/* <h3>How are you feeling?</h3> */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: ".5rem",
            justifyContent:
              align === "right"
                ? "flex-end"
                : align === "left"
                  ? "flex-start"
                  : "center",
          }}
        >
          {moods.map((mood) => {
            const isSelected = selectedMoodIds.includes(mood.id);

            return (
              <MoodPill
                key={mood.id}
                name={mood.name}
                color={mood.color}
                isSelected={isSelected}
                onClick={() => toggleMood(mood.id)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SelectMoods;
