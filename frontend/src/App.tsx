import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import EntryPage from "./pages/EntryPage";
import MoodSelectionPage from "./pages/MoodSelectionPage";
import AddEntryPage from "./pages/AddEntryPage";
import LandingPage from "./pages/LandingPage";
import NamePage from "./pages/NamePage";
import AuthRedirectPage from "./pages/AuthRedirectPage";

function App() {
  return (
    <Routes>
      {/* public pages */}
      <Route path="/" element={<LandingPage />} />

      {/* protected pages */}
      <Route
        path="/auth-redirect"
        element={
          <ProtectedRoute>
            <AuthRedirectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/name"
        element={
          <ProtectedRoute>
            <NamePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/entries/:id"
        element={
          <ProtectedRoute>
            <EntryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/moods"
        element={
          <ProtectedRoute>
            <MoodSelectionPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-entry"
        element={
          <ProtectedRoute>
            <AddEntryPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
