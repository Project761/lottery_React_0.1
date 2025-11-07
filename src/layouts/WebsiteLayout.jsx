import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/website/Header';
import Footer from '../components/website/Footer';
import '../styles/main.css';

const WebsiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
