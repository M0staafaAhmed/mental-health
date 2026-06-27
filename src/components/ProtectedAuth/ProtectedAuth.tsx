import React from 'react'
import { Navigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export default function ProtectedAuth({children}: {children: React.ReactNode}) {
    const token = useSelector((state: RootState) => state.userInfo.token);
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }
  return (
    <>{children}</>
  )
}
