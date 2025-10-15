import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TourPage from "./pages/ToursPage";
import { DestinationsGrid } from "./components/destination/DestinationGrid";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route co header footer */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/tours"
          element={
            <MainLayout>
              <TourPage />
            </MainLayout>
          }
        />
        <Route
          path="/destinations"
          element={
            <MainLayout>
              <DestinationsGrid />
            </MainLayout>
          }
        />
        {/* Route khong co header footer */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
