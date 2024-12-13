// src/layouts/AdminLayout.js
import React from 'react';
import SidebarAdmin from '../components/SideBar/SideBarAdmin';
import AdminDashboard from '../components/Dashboard/AdminDashBoard';
import './AdminLayout.css'; // Import file CSS cho layout

const AdminLayout = () => (
  <div className="admin-layout">
    
    <SidebarAdmin />
    <AdminDashboard/>
  </div>
);

export default AdminLayout;
