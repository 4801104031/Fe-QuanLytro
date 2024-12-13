import React, { useState } from 'react';
import SidebarUser from '../SideBar/SideBarUser';
import UserBillList from '../../features/UserManagement/UserBillList';
import UserFeedback from '../../features/UserManagement/UserFeedBack';
import UserSettings from '../../features/UserManagement/UserSettings';
const DashboardUser = () => {
  const [activeSection, setActiveSection] = useState('welcome');

  const renderContent = () => {
    switch (activeSection) {
      case 'bills':
        return <UserBillList />;
      case 'feedback':
        return <UserFeedback />;
      case 'settings': return <UserSettings />;
      default:
        return <div className="content p-4"><h2>Chào mừng bạn đã trở lại với IT Motel</h2></div>;
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarUser onNavigate={setActiveSection} />
      <div className="flex-1 p-6 ml-64">

        <div className="content bg-white p-6 rounded-lg shadow-md">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
