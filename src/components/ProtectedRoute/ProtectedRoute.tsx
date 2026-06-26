import React from 'react'
import type { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
    const token = useSelector((state: RootState) => state.userInfo.token);
    if (!token) {
        return <Navigate to="/login" replace />;
    }
  return (
    <>{children}</>
  )
}
