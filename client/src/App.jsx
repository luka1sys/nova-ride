import './styles/global.css';
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from "./contexts/AuthContext"; // დარწმუნდი რომ იმპორტი სწორია
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import Navbar from './components/Navbar';
import ScrollAnimations from './components/Scroll';
import AuthenticationPage from './pages/AuthenticationPage';
import AboutPage from './pages/AboutPage';
import BookingPage from './pages/BookingPage';
import PaymentSuccessPage from './pages/PaymentSuccess';
import AdminPanel from './pages/AdminPanel';
import Panel from './pages/Panel';
import { ToastContainer } from "react-toastify";
import Car from './pages/Car';
import ConactUs from './pages/ContactUs';
import Service from './pages/Service';
import ScrollToTop from './utils/ScrollToTop';
import ForgotPassword from './components/ForgotPasswordForm';
import ResetPassword from './components/ResetPasswordForm';

// დამცავი კომპონენტი როუტებისთვის
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/authentication" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/panel" />;

  return children;
};

function App() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // 1️⃣ Preloader ტაიმერი
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    if (!dot) return;

    const moveDot = (e) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    window.addEventListener("mousemove", moveDot);

    return () => window.removeEventListener("mousemove", moveDot);
  }, [loading]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#050505]">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-[#fe9a00] shadow-[0_0_20px_rgba(254,154,0,0.3)]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#fe9a00] font-bold text-sm tracking-widest">NR</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden bg-[#050505] min-h-screen">
      <div
        id="cursor-dot"
        className="fixed top-0 left-0 w-[8px] h-[8px] bg-[#fe9a00] rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-600 ease-out shadow-[0_0_10px_rgba(254,154,0,0.8)]"
      ></div>

      <Navbar />
      <ScrollToTop /> {/* აქ ჩასვი */}
      <ScrollAnimations />
      <ToastContainer theme="dark" />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contactus" element={<ConactUs />} />
        <Route path="/authentication" element={<AuthenticationPage />} />
        <Route path='/carspage' element={<CarsPage />} />
        <Route path='/car/:id' element={<Car />} />
        <Route path='/service' element={<Service />} />


        {/* User Dashboard */}
        <Route path="/panel" element={
          <ProtectedRoute>
            <Panel />
          </ProtectedRoute>
        } />

        {/* Admin Dashboard - მხოლოდ ადმინებისთვის */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminPanel />
          </ProtectedRoute>
        } />

        {/* ძველი adminpanel-ის გადამისამართება ახალ /admin-ზე */}
        <Route path="/adminpanel" element={<Navigate to="/admin" />} />

        {/* Booking & Payment */}
        <Route path='/bookingpage/:id' element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        } />
        <Route path='/paymentsuccess' element={<PaymentSuccessPage />} />

        {/* 404 - Redirect to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;