type MoodPillProps = {
  name: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
};

function MoodPill({ name, color, isSelected, onClick }: MoodPillProps) {
  return (
    <div
      onClick={onClick}
      className={isSelected ? "selected-mood-pill" : "mood-pill"}
      style={{
        backgroundColor: isSelected ? color : "transparent",
      }}
    >
      {/* {isSelected ? "✓ " : ""} */}
      {name.charAt(0) + name.slice(1)}
    </div>
  );
}

export default MoodPill;
