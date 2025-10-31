import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './interceptors/Axios'; // Global Axios configuration // Components
import Header from './components/Header';
import Footer from './components/Footer';
import TabHeader from './components/TabHeader';
import Home from './pages/Home';
import PersonalDetailsForm from './pages/PersonalDetailsForm';
import BankDetailsForm from './pages/BankDetailsForm';
import DemandDraftDetails from './pages/DemandDraftDetails';
import IncomeDetails from './pages/IncomeDetails';
import LoginPage from './pages/LoginPage';
import OtpVerify from './components/OtpVerify';
import ThankYouPage from './components/ThankYouPage';

// Router Wrapper Component
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Update active tab based on route
  const updateActiveTab = useCallback(() => {
    const path = location.pathname;
    if (path === '/apply') setActiveTab('personal');
    else if (path === '/bank-details') setActiveTab('bank');
    else if (path === '/dd-details') setActiveTab('dd');
    else if (path === '/income-details') setActiveTab('income');
    else setActiveTab('');
  }, [location]);

  // Handle tab changes
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    switch (tabId) {
      case 'personal':
        navigate('/apply');
        break;
      case 'bank':
        navigate('/bank-details');
        break;
      case 'dd':
        navigate('/dd-details');
        break;
      case 'income':
        navigate('/income-details');
        break;
      default:
        break;
    }
  }, [navigate]);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Initial load effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    updateActiveTab();

    return () => clearTimeout(timer);
  }, [updateActiveTab]);

  // Show loading spinner while loading
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
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      {/* Main Content */}
      <div className="container mt-4 mb-4 flex-grow-1">
        {activeTab && (
          <TabHeader 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />
        )}
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/apply" element={<PersonalDetailsForm />} />
            <Route path="/bank-details" element={<BankDetailsForm />} />
            <Route 
              path="/dd-details" 
              element={
                <DemandDraftDetails 
                  onBack={() => handleTabChange('bank')} 
                />
              } 
            />
            <Route 
              path="/income-details" 
              element={
                <IncomeDetails 
                  onBack={() => handleTabChange('dd')} 
                />
              } 
            />
            <Route path="/verify-otp" element={<OtpVerify />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      
      <Footer />
      
      {/* Toast Notifications */}
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
    </div>
  );
}

export default AppWithRouter;
