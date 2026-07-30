import React, { Suspense, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';

// Lazy load route components for code splitting and performance optimization
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Onboarding = React.lazy(() => import('./pages/Onboarding'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Personalization = React.lazy(() => import('./pages/Personalization'));
const MealDetails = React.lazy(() => import('./pages/MealDetails'));
const Generator = React.lazy(() => import('./pages/Generator'));
const GroceryList = React.lazy(() => import('./pages/GroceryList'));
const EditProfile = React.lazy(() => import('./pages/EditProfile'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return <LoadingSpinner message="Authenticating..." />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return <LoadingSpinner message="Authenticating..." />;
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <div className="antialiased text-slate-900 min-h-screen bg-wellness-50 font-sans selection:bg-wellness-200 selection:text-wellness-900">
      <ErrorBoundary>
        <AuthProvider>
          <ProfileProvider>
            <BrowserRouter>
              <Suspense fallback={<LoadingSpinner message="Loading..." />}>
                <Routes>
                  <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
                  <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
                  <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/personalization" element={<ProtectedRoute><Personalization /></ProtectedRoute>} />
                  <Route path="/generator" element={<ProtectedRoute><Generator /></ProtectedRoute>} />
                  <Route path="/meal/:id" element={<ProtectedRoute><MealDetails /></ProtectedRoute>} />
                  <Route path="/grocery-list" element={<ProtectedRoute><GroceryList /></ProtectedRoute>} />
                  <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
                  {/* Default to Login page for now */}
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ProfileProvider>
        </AuthProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
