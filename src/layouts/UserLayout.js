// src/layouts/UserLayout.js
import React from 'react';
import SidebarUser from '../components/SideBar/SideBarUser';
import UserDashboard from '../components/Dashboard/UserDashBoard';
import './UserLayout.css'; // Import file CSS cho layout
const UserLayout = () => (
  <div className="user-layout">
    <SidebarUser />
    <UserDashboard />
  </div>
);

export default UserLayout;
