import React, { useState } from 'react';
import BillCreationForm from './BillCreationForm';
import BillList from './BillList';
import { Toast } from '../../components/Toast';

function BillManagement() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleBillCreated = () => {
    setToastMessage('Tạo tập hóa đơn thành công!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-gray-50 p-6">
        <BillCreationForm onSuccess={handleBillCreated} />
        <div className="mt-8">
          <BillList />
        </div>
      </div>
      {showToast && (
        <Toast 
          message={toastMessage}
          onClose={() => setShowToast(false)}
          type="success"
        />
      )}
    </div>
  );
}

export default BillManagement;

