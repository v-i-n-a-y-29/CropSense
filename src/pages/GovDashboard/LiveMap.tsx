import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Filter, Check, MapPin, Tractor, Activity, AlertCircle } from 'lucide-react';
import { mockApi, Machine, MachineStatus } from '../../services/mockApi';

// Custom icons based on status
const createIcon = (color: string) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const icons = {
  Available: createIcon('green'),
  Active: createIcon('blue'),
  Idle: createIcon('yellow'),
  Maintenance: createIcon('red')
};

export default function LiveMap() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [filters, setFilters] = useState({
    status: [] as MachineStatus[],
    type: [] as string[],
    district: 'All'
  });

  useEffect(() => {
    mockApi.getMachines().then(setMachines);
  }, []);

  const types = Array.from(new Set(machines.map(m => m.type)));
  
  const filteredMachines = machines.filter(m => {
    if (filters.status.length > 0 && !filters.status.includes(m.status)) return false;
    if (filters.type.length > 0 && !filters.type.includes(m.type)) return false;
    return true;
  });

  const toggleStatusFilter = (status: MachineStatus) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status) 
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };

  const toggleTypeFilter = (type: string) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type.includes(type) 
        ? prev.type.filter(t => t !== type)
        : [...prev.type, type]
    }));
  };

  const kpis = [
    { label: 'Total Machines', value: machines.length, icon: Tractor, color: 'text-slate-700', bg: 'bg-slate-100' },
    { label: 'Active Now', value: machines.filter(m => m.status === 'Active').length, icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Available', value: machines.filter(m => m.status === 'Available').length, icon: Check, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Maintenance', value: machines.filter(m => m.status === 'Maintenance').length, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="h-full flex flex-col p-8 gap-8 max-w-[1600px] mx-auto">
      {/* KPI Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center justify-between hover:shadow-md transition-shadow group">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{kpi.label}</p>
                <p className={`text-4xl font-black ${kpi.color} tracking-tight`}>{kpi.value}</p>
              </div>
              <div className={`w-14 h-14 rounded-2xl ${kpi.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className={`w-7 h-7 ${kpi.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-[600px]">
        {/* Map Area */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-slate-200 font-bold text-slate-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            Live Tracking
          </div>
          <MapContainer center={[30.900965, 75.857277]} zoom={11} className="h-full w-full z-0">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
              chunkedLoading
              maxClusterRadius={40}
            >
              {filteredMachines.map(machine => (
                <Marker 
                  key={machine.id} 
                  position={[machine.lat, machine.lng]}
                  icon={icons[machine.status]}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-bold text-slate-900 text-lg mb-1">{machine.type}</h3>
                      <p className="text-slate-500 text-sm mb-3 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {machine.chcName}
                      </p>
                      <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                        <span className="text-xs text-slate-400 font-mono">{machine.registrationNumber}</span>
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider
                          ${machine.status === 'Available' ? 'bg-green-100 text-green-700' : ''}
                          ${machine.status === 'Active' ? 'bg-blue-100 text-blue-700' : ''}
                          ${machine.status === 'Idle' ? 'bg-yellow-100 text-yellow-700' : ''}
                          ${machine.status === 'Maintenance' ? 'bg-red-100 text-red-700' : ''}
                        `}>
                          {machine.status}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>

        {/* Filter Sidebar */}
        <div className="w-full lg:w-80 bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col overflow-y-auto">
          <div className="flex items-center mb-8 pb-4 border-b border-slate-100">
            <div className="bg-sky-50 p-2 rounded-lg mr-3">
              <Filter className="w-5 h-5 text-sky-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Filters</h2>
          </div>

          <div className="mb-10">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Status</h3>
            <div className="space-y-4">
              {(['Available', 'Active', 'Idle', 'Maintenance'] as MachineStatus[]).map(status => (
                <label key={status} className="flex items-center cursor-pointer group">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mr-4 transition-all
                    ${filters.status.includes(status) ? 'bg-sky-500 border-sky-500 shadow-sm shadow-sky-200' : 'border-slate-300 group-hover:border-sky-400 bg-slate-50'}
                  `}>
                    {filters.status.includes(status) && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`font-medium transition-colors ${filters.status.includes(status) ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{status}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Machine Type</h3>
            <div className="space-y-4">
              {types.map(type => (
                <label key={type} className="flex items-center cursor-pointer group">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mr-4 transition-all
                    ${filters.type.includes(type) ? 'bg-sky-500 border-sky-500 shadow-sm shadow-sky-200' : 'border-slate-300 group-hover:border-sky-400 bg-slate-50'}
                  `}>
                    {filters.type.includes(type) && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`font-medium transition-colors ${filters.type.includes(type) ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
