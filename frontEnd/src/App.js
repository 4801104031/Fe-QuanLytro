import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserRoomList from './features/UserManagement/UserRoomList';
import { ProtectedRoute, GuestRoute } from './api/useAuth';

const App = () => (
  <Router>
    <Routes>
      {/* GuestRoute: Chỉ cho phép người chưa đăng nhập */}
      <Route element={<GuestRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* ProtectedRoute: Chỉ cho phép người có vai trò 'admin' */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />} />
      </Route>

      {/* ProtectedRoute: Chỉ cho phép người có vai trò 'user' */}
      <Route element={<ProtectedRoute allowedRoles={['resident']} />}>
        <Route path="/user" element={<UserLayout />} />
      </Route>

      {/* Route khác */}
      <Route path="/rooms" element={<UserRoomList />} />
    </Routes>
  </Router>
);

export default App;


// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import AdminLayout from './layouts/AdminLayout';
// import UserLayout from './layouts/UserLayout';
// import LoginPage from './pages/LoginPage'; // Import trang đăng nhập
// import RegisterPage from './pages/RegisterPage';
// import UserRoomList from './features/UserManagement/UserRoomList';
// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />  {/* Định nghĩa tuyến đường cho trang đăng nhập */}
//       <Route path="/admin" element={<AdminLayout />} />
//       <Route path="/user" element={<UserLayout />} />
//       <Route path="/rooms" element={<UserRoomList />} /> {/* Thêm route */}
//     </Routes>
//   </Router>
// );

// export default App;
