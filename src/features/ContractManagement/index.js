import React, { useState } from 'react';
import ContractList from './ContractList';
import ContractForm from './ContractForm';

function ContractManagement() {
  const [activeTab, setActiveTab] = useState('contracts');

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b">
        <div className="flex gap-4 px-6">
          <button
            className={`py-3 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'contracts'
                ? 'border-teal-700 text-teal-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('contracts')}
          >
            Hợp đồng thuê
          </button>
        </div>
      </div>
      <div className="flex-1 bg-gray-50">
        <ContractList />
      </div>
    </div>
  );
}

export default ContractManagement;

