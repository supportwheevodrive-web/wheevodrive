import React, { useContext, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DetailsScreen from "./screens/DetailsScreen/DetailsScreen";
import SavedCarsScreen from "./screens/SavedCarsScreen/SavedCarsScreen";
import BlogsScreen from "./screens/BlogsScreen/BlogsScreen";
import ExploreCarsScreen from "./screens/ExploreCarsScreen/ExploreCarsScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen/SignUpScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import AddCarScreen from "./screens/AddCarScreen/AddCarScreen";
import EditProfileScreen from "./screens/EditProfileScreen/EditProfileScreen";
import { UserContext, UserProvider } from "./hooks/UserContext";
import AboutUsScreen from "./screens/AboutUsScreen/AboutUsScreen";
import ReviewScreen from "./screens/ReviewScreen/ReviewScreen";
import BackToTop from "./components/BackToTop/BackToTop";
import DealerProfileScreen from "./screens/DealerProfileScreen/DealerProfileScreen";
import ChatScreen from "./screens/ChatScreen/ChatScreen";
import { useAuthStore } from "./store/useAuthStore";
import ForegotPasswordScreen from "./screens/ForegotPasswordScreen/ForegotPasswordScreen";
import ResetPassswordScreen from "./screens/ResetPassswordScreen/ResetPassswordScreen";
import ContactScreen from "./screens/ContactScreen/ContactScreen";
import PremiumPlans from "./components/PremiumPlans/PremiumPlans";
import PaymentScreen from "./screens/PaymentScreen/PaymentScreen";
import PaymentSuccess from "./screens/PaymentSuccess/PaymentSuccess";
import Services from "./screens/Services/Services";
import FAQSection from "./sections/FAQ/FAQ";
import PrivacyPolicy from "./screens/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./screens/TermsAndConditions/TermsAndConditions";

function Layout() {
  const location = useLocation();
  const hideHeaderFooter = ["/signin", "/signup", "/forgot-password"].includes(
    location.pathname
  );
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     setLoggedIn(true);
  //   }
  // }, [user]);

  return (
    <UserProvider>
      <div>
        {!hideHeaderFooter && <Header />}
        <main>
          <Routes>
            <Route path="/signin" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/car" element={<DetailsScreen />} />
            <Route path="/favourites" element={<SavedCarsScreen />} />
            {/* <Route path="/blogs/:slug" element={<BlogsScreen />} /> */}
            <Route path="/blogs/:slug?" element={<BlogsScreen />} />
            <Route path="/used-cars" element={<ExploreCarsScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/car/add" element={<AddCarScreen />} />
            <Route path="/car/:id" element={<DetailsScreen />} />
            <Route path="/car/edit/:id" element={<AddCarScreen />} />
            <Route path="/profile/edit" element={<EditProfileScreen />} />
            <Route path="/about-us" element={<AboutUsScreen />} />
            <Route path="/reviews" element={<ReviewScreen />} />
            <Route path="/profile/:id" element={<DealerProfileScreen />} />
            <Route path="/premium-plans" element={<PremiumPlans />} />
            {/* <Route path="/subscribe/:plan" element={<PaymentScreen />} /> */}
            <Route
              path="/chats"
              element={authUser ? <ChatScreen /> : <ChatScreen />}
            />
            <Route
              path="/forgot-password"
              element={<ForegotPasswordScreen />}
            />
            <Route
              path="/reset-password/:id"
              element={<ResetPassswordScreen />}
            />
            <Route path="/contact-us" element={<ContactScreen />} />
            <Route path="/payment-success/:plan" element={<PaymentSuccess />} />
            <Route path="/services" element={<Services />} />
            <Route path="/faqs" element={<FAQSection />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
          </Routes>
          {!hideHeaderFooter && <Footer />}
          <BackToTop />
        </main>
      </div>
    </UserProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
