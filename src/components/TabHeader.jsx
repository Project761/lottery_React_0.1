import React from 'react';
import tabsConfig from '../config/tabs';

const TabHeader = ({ activeTab, onTabChange }) => {
  const tabs = tabsConfig;

  return (
    <div className="tab-header-container">
      <div className="tab-header">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabHeader;
