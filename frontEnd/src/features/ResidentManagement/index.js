import React, { useState } from 'react';
import ResidentList from './ResidentList';
import ResidentForm from './ResidentForm';

function ResidentManagement() {
  const [activeTab, setActiveTab] = useState('residents');

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b">
        <div className="flex gap-4 px-6">
          <button
            className={`py-3 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'residents'
                ? 'border-teal-700 text-teal-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('residents')}
          >
            Cư dân
          </button>
        </div>
      </div>
      <div className="flex-1 bg-gray-50">
        <ResidentList />
      </div>
    </div>
  );
}

export default ResidentManagement;

