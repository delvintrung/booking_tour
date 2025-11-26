import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import TourPage from "./pages/ToursPage";
import { DestinationsGrid } from "./components/destination/DestinationGrid";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ListTours from "./pages/DestinationTours";
import TourDetails from "./pages/TourDetails";
import HandBook from "./components/blog/HandBook";
import TravelTips from "./components/blog/TravelTips";
import Profile from "./components/user/Profile";
import BookingPage from "./pages/Booking";
import NotFoundPage from "./pages/404Page";
import { useUserStore } from "./stores/userStore";
import ChangePassword from "./pages/ChangePassword";
import VNPayReturnPage from "./pages/VNPayReturn";
import PaymentFailed from "./components/booking/PaymentFailed";
import TourPrivacyPolicy from "./components/tour/TourPrivacyPolicy";
import FindResult from "./components/tour/FindResult";

function App() {
  const { user } = useUserStore();
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

        <Route
          path="/tour/find"
          element={
            <MainLayout>
              <FindResult />
            </MainLayout>
          }
        />

        <Route
          path="/tours/privacy-policy"
          element={
            <MainLayout>
              <TourPrivacyPolicy />
            </MainLayout>
          }
        />

        <Route
          path="/blog/tour/handbook"
          element={
            <MainLayout>
              <HandBook />
            </MainLayout>
          }
        />

        <Route
          path="/blog/tour/experience"
          element={
            <MainLayout>
              <TravelTips />
            </MainLayout>
          }
        />

        <Route
          path="/user/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />

        <Route
          path="/order-booking/:id"
          element={
            <MainLayout>
              <BookingPage />
            </MainLayout>
          }
        />
        {/* Resolve vnpay return */}
        <Route
          path="payment/vnpay_return"
          element={
            <MainLayout>
              <VNPayReturnPage />
            </MainLayout>
          }
        />

        <Route
          path="/payment/payment-failed"
          element={
            <MainLayout>
              <PaymentFailed />
            </MainLayout>
          }
        />

        {user ? (
          <Route
            path="/user/change-password"
            element={
              <MainLayout>
                <ChangePassword />
              </MainLayout>
            }
          />
        ) : (
          <Route path="/user/change-password" element={<ChangePassword />} />
        )}
        {/* Route khong co header footer */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
