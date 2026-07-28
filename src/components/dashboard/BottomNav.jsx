import React from 'react';
import { Home, CalendarDays, ShoppingCart, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '#meals', label: 'Meals', icon: CalendarDays },
    { path: '#grocery', label: 'Grocery', icon: ShoppingCart },
    { path: '#profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-between items-center md:hidden z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || location.hash === item.path;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center space-y-1 w-16 transition-colors ${
              isActive ? 'text-wellness-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-wellness-100' : 'bg-transparent'}`}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
