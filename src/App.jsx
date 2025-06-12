
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import Navbar from './components/Layout/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PurchasesPage from './pages/PurchasesPage';
import TransfersPage from './pages/TransfersPage';
import AssignmentsPage from './pages/AssignmentsPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen">
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route 
                        path="/dashboard" 
                        element={
                          <ProtectedRoute allowedRoles={['Admin', 'Base Commander', 'Logistics Officer']}>
                            <DashboardPage />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/purchases" 
                        element={
                          <ProtectedRoute allowedRoles={['Admin', 'Base Commander', 'Logistics Officer']}>
                            <PurchasesPage />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/transfers" 
                        element={
                          <ProtectedRoute allowedRoles={['Admin', 'Base Commander', 'Logistics Officer']}>
                            <TransfersPage />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/assignments" 
                        element={
                          <ProtectedRoute allowedRoles={['Admin', 'Base Commander', 'Logistics Officer']}>
                            <AssignmentsPage />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/users" 
                        element={
                          <ProtectedRoute allowedRoles={['Admin']}>
                            <UsersPage />
                          </ProtectedRoute>
                        } 
                      />
                    </Routes>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
