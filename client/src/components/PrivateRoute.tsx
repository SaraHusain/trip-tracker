import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const t = localStorage.getItem('tt_token');
    const token = (t !== null && t !==  undefined && t !== "undefined");
    return token ? children : <Navigate to="/login" />;
};