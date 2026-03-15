import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, BarChart3, Settings, LogOut, Bell } from 'lucide-react';
import LiveMap from './LiveMap';
import Analytics from './Analytics';

export default function GovDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'map', path: '/gov', icon: Map, label: 'Live Tracking' },
    { id: 'analytics', path: '/gov/analytics', icon: BarChart3, label: 'Analytics & AQI' },
    { id: 'settings', path: '/gov/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <LayoutDashboard className="w-6 h-6 text-green-600 mr-3" />
          <span className="text-xl font-bold text-slate-800 tracking-tight">CropSense Admin</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="px-4 space-y-1">
            {navItems.map(item => {
              const isActive = location.pathname === item.path || (item.path !== '/gov' && location.pathname.startsWith(item.path));
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-green-50 text-green-700 font-medium border border-green-100' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-green-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center px-4 py-3 bg-slate-50 rounded-xl mb-4">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
              DA
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">DA&FW Official</p>
              <p className="text-xs text-slate-500">Punjab Region</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center px-4 py-2 text-slate-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm">
          <h1 className="text-xl font-bold text-slate-800">
            {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50">
          <Routes>
            <Route path="/" element={<LiveMap />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<div className="p-8 text-slate-500">Settings coming soon...</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
