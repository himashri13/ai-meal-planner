import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Personalization from './pages/Personalization';
import MealDetails from './pages/MealDetails';
import Generator from './pages/Generator';
import GroceryList from './pages/GroceryList';
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="antialiased text-slate-900 min-h-screen bg-wellness-50 font-sans selection:bg-wellness-200 selection:text-wellness-900">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/personalization" element={<Personalization />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/meal/:id" element={<MealDetails />} />
          <Route path="/grocery-list" element={<GroceryList />} />
          {/* Default to Login page for now */}
          <Route path="/" element={<Navigate to="/login" replace />} />
<Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
