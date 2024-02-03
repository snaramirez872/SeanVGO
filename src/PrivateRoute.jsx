import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export default function PrivateRoute({ element, path, logCheck }) {
    return logCheck ? (
        <Route path={path} element={element} />
    ) : (
        <Navigate to="/login" replace state={{ from: path }} />
    )
}
