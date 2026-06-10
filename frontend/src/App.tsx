import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EntryPage from "./pages/EntryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/entries/:id" element={<EntryPage />} />
    </Routes>
  );
}

export default App;
