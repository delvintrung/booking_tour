import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import TourPage from "./pages/ToursPage";
import { DestinationsGrid } from "./components/destination/DestinationGrid";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ListTours from "./pages/ListTours";
import TourDetails from "./pages/TourDetails";

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
        <Route
          path="/destination/:name"
          element={
            <MainLayout>
              <ListTours />
            </MainLayout>
          }
        />
        <Route
          path="/tour/details/:id"
          element={
            <MainLayout>
              <TourDetails />
            </MainLayout>
          }
        />
        {/* Route khong co header footer */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
