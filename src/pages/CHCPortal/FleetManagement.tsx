import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Tractor, CheckCircle2, PlayCircle, PauseCircle, Wrench, Loader2, AlertTriangle, LayoutDashboard, Settings, Bell, Search } from 'lucide-react';
import { mockApi, Machine, MachineStatus } from '../../services/mockApi';

const STATUS_CONFIG = {
  Available: { color: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50', icon: CheckCircle2, border: 'border-green-200' },
  Active: { color: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50', icon: PlayCircle, border: 'border-blue-200' },
  Idle: { color: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50', icon: PauseCircle, border: 'border-yellow-200' },
  Maintenance: { color: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50', icon: Wrench, border: 'border-red-200' },
};

export default function FleetManagement() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch machines for this CHC (simulated by filtering)
    mockApi.getMachines().then(data => {
      setMachines(data.filter(m => m.chcName === 'Kisan CHC Ludhiana'));
    });
  }, []);

  const handleStatusChange = async (id: string, newStatus: MachineStatus) => {
    if (updatingId) return; // Prevent multiple concurrent updates
    
    const originalMachines = [...machines];
    
    // Optimistic update
    setMachines(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    setUpdatingId(id);
    setErrorToast(null);

    try {
      await mockApi.updateMachineStatus(id, newStatus);
      // Success - keep optimistic state
    } catch (error) {
      // Revert on failure
      setMachines(originalMachines);
      setErrorToast('Failed to update status. Please try again.');
      setTimeout(() => setErrorToast(null), 3000);
    } finally {
      setUpdatingId(null);
    }
  };

  const counts = {
    Available: machines.filter(m => m.status === 'Available').length,
    Active: machines.filter(m => m.status === 'Active').length,
    Idle: machines.filter(m => m.status === 'Idle').length,
    Maintenance: machines.filter(m => m.status === 'Maintenance').length,
  };

  const filteredMachines = machines.filter(m => 
    m.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-green-500 p-2 rounded-xl">
            <Tractor className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">CropSense</h1>
            <p className="text-xs text-slate-400 font-medium">CHC Portal</p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">Menu</p>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-green-500/10 text-green-400 rounded-xl font-medium transition-colors">
              <LayoutDashboard className="w-5 h-5" />
              Fleet Management
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-xl font-medium transition-colors">
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-3 bg-slate-800 rounded-xl mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Kisan CHC</p>
              <p className="text-xs text-slate-400 truncate">Ludhiana, PB</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 flex-shrink-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">Fleet Overview</h2>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search machines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg text-sm transition-all outline-none"
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Error Toast */}
            {errorToast && (
              <div className="fixed top-20 right-8 bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center animate-in fade-in slide-in-from-top-4">
                <AlertTriangle className="w-5 h-5 mr-3" />
                <span className="font-medium">{errorToast}</span>
              </div>
            )}

            {/* Summary Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {(Object.keys(STATUS_CONFIG) as MachineStatus[]).map(status => {
                const config = STATUS_CONFIG[status];
                const Icon = config.icon;
                return (
                  <div key={status} className={`bg-white rounded-2xl p-6 border ${config.border} shadow-sm flex items-center justify-between hover:shadow-md transition-shadow`}>
                    <div>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{status}</p>
                      <p className={`text-4xl font-black ${config.text} tracking-tight`}>{counts[status]}</p>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl ${config.bg} flex items-center justify-center rotate-3`}>
                      <Icon className={`w-7 h-7 ${config.text}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Machine List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
              {filteredMachines.map(machine => {
                const currentConfig = STATUS_CONFIG[machine.status];
                const isUpdating = updatingId === machine.id;

                return (
                  <div key={machine.id} className={`bg-white rounded-2xl border-2 ${currentConfig.border} shadow-sm overflow-hidden transition-all duration-200 relative group hover:shadow-md`}>
                    {isUpdating && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                      </div>
                    )}
                    
                    <div className={`px-6 py-5 ${currentConfig.bg} border-b ${currentConfig.border} flex justify-between items-start`}>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{machine.type}</h3>
                        <p className="text-sm text-slate-600 font-mono bg-white/50 inline-block px-2 py-0.5 rounded border border-white/60">{machine.registrationNumber}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-white px-2.5 py-1 rounded-lg shadow-sm border border-slate-100">
                        {machine.id}
                      </span>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Update Status</p>
                      <div className="grid grid-cols-2 gap-3">
                        {(Object.keys(STATUS_CONFIG) as MachineStatus[]).map(status => {
                          const config = STATUS_CONFIG[status];
                          const isSelected = machine.status === status;
                          return (
                            <button
                              key={status}
                              disabled={isUpdating}
                              onClick={() => handleStatusChange(machine.id, status)}
                              className={`
                                py-3 px-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center border
                                ${isSelected 
                                  ? `${config.bg} ${config.text} ${config.border} ring-2 ring-offset-2 ring-${config.color.replace('bg-', '')}` 
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm'
                                }
                              `}
                            >
                              <span className={`w-2 h-2 rounded-full mr-2.5 ${isSelected ? config.color : 'bg-slate-300'}`}></span>
                              {status}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {filteredMachines.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
                <Tractor className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-700 mb-1">No machines found</h3>
                <p className="text-slate-500">Try adjusting your search query.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
