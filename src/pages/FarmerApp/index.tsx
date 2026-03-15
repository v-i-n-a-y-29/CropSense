import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, CloudSun, FileText, MonitorSmartphone, LogOut } from 'lucide-react';
import MachineFinder from './MachineFinder';
import WeatherAlerts from './WeatherAlerts';
import SchemesMSP from './SchemesMSP';
import { useAppContext } from '../../context/AppContext';

export default function FarmerApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, toggleLanguage } = useAppContext();

  const navItems = [
    { id: 'map', path: '/farmer', icon: MapPin, label: 'Find Machine', labelHi: 'मशीन खोजें' },
    { id: 'weather', path: '/farmer/weather', icon: CloudSun, label: 'Weather & Alerts', labelHi: 'मौसम और अलर्ट' },
    { id: 'schemes', path: '/farmer/schemes', icon: FileText, label: 'Schemes & MSP', labelHi: 'योजनाएं और MSP' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <MonitorSmartphone className="w-6 h-6 text-green-600 mr-3" />
          <span className="text-xl font-bold text-slate-800 tracking-tight">Farmer Portal</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="px-4 space-y-2">
            {navItems.map(item => {
              const isActive = location.pathname === item.path || (item.path !== '/farmer' && location.pathname.startsWith(item.path));
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
                  {language === 'en' ? item.label : item.labelHi}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={toggleLanguage}
            className="w-full flex items-center justify-center px-4 py-2 mb-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
          >
            {language === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center px-4 py-2 text-slate-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {language === 'en' ? 'Exit Portal' : 'पोर्टल से बाहर निकलें'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <main className="flex-1 overflow-auto bg-slate-50">
          <Routes>
            <Route path="/" element={<MachineFinder />} />
            <Route path="/weather" element={<WeatherAlerts />} />
            <Route path="/schemes" element={<SchemesMSP />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
