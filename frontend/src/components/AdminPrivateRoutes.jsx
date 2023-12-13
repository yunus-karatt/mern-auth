import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRoutes = () => {
  const {adminInfo}=useSelector(state=>state.adminAuth)
    return adminInfo ? <Outlet /> : <Navigate to="/admin" replace />;
}

export default AdminPrivateRoutes