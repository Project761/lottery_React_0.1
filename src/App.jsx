import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './interceptors/Axios';
import Header from './components/website/Header';
import Footer from './components/website/Footer';
import TabHeader from './components/website/TabHeader';
import Home from './pages/websitelayouts/Home';
// import PersonalDetailsPage from './pages/websitelayouts/PersonalDetailsPage';
import BankDetailsForm from './pages/websitelayouts/BankDetailsForm';
import AcknowledgementReceipt from './pages/websitelayouts/AcknowledgementReceipt';
import DemandDraftDetails from './pages/websitelayouts/DemandDraftDetails';
import IncomeDetails from './pages/websitelayouts/IncomeDetails';
import LoginPage from './pages/websitelayouts/LoginPage';
import OtpVerify from './components/website/OtpVerify';
import ThankYouPage from './components/website/ThankYouPage';
import { FormDataProvider } from './context/FormDataContext';
import AdminLayout from './layouts/admin/AdminLayout';
import AdminPage from "./pages/adminlayouts/AdminPage";
import Dashboard from './pages/adminlayouts/Dashboard';
import AdminLogin from './components/admin/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PersonalDetailsPage from './pages/websitelayouts/PersonalDetailsPage';
import PersonalDetailsForm from './pages/websitelayouts/PersonalDetailsForm';
import AdminSettings from './pages/AdminSettings/AdminSettings';



// Admin Layout Wrapper
// const AdminLayout = () => {
//   return (
//     <div className="d-flex">
//       <div className="flex-grow-1">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// Website Layout Wrapper
const WebsiteLayout = () => {
  const [activeTab, setActiveTab] = useState('');
  const location = useLocation();

  const updateActiveTab = useCallback(() => {
    const path = location.pathname;
    if (path === '/apply') setActiveTab('personal');
    else if (path === '/bank-details') setActiveTab('bank');
    else if (path === '/dd-details') setActiveTab('dd');
    else if (path === '/income-details') setActiveTab('income');
    else setActiveTab('');
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
    updateActiveTab();
  }, [location.pathname, updateActiveTab]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container mt-4 mb-4 flex-grow-1">
        {activeTab && (
          <TabHeader activeTab={activeTab} onTabChange={(tab) => {
            setActiveTab(tab);
            // You can add navigation logic here if needed
          }} />
        )}
        <main className="flex-grow-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}


function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = useCallback(() => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setIsAuthenticated(false);
    setTimeout(() => {
      window.location.href = '/admin/login';
      window.location.reload();
    }, 800);
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            style={{ width: '4rem', height: '4rem' }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormDataProvider>
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/admin/login" element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin onLogin={handleLogin} />} /> */}
        <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<AdminSettings />} />
          {["project", "plot", "application", "bank-details", "bank", "caste", "DemandDraftAmount", "City"].map((pageName) => (
            <Route key={pageName} path={pageName} element={<AdminPage page={pageName} />} />
          ))}
        </Route>

        {/* Public Website Routes */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/apply" element={<PersonalDetailsForm />} />
          <Route path="/bank-details" element={<BankDetailsForm />} />
          <Route path="/dd-details" element={<DemandDraftDetails />} />
          <Route path="/income-details" element={<IncomeDetails />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/personal-details" element={<PersonalDetailsPage />} />
          <Route path="/acknowledgement-receipt" element={<AcknowledgementReceipt />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </FormDataProvider>
  );
}

export default App;
