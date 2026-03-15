import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, Phone, Navigation, X } from 'lucide-react';
import { mockApi, Machine } from '../../services/mockApi';
import { useAppContext } from '../../context/AppContext';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function MachineFinder() {
  const { language, toggleLanguage } = useAppContext();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number]>([30.900965, 75.857277]); // Default Ludhiana
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate fetching machines
    mockApi.getMachines(userLocation[0], userLocation[1]).then(setMachines);
    
    // Simulate getting user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => console.log("Geolocation denied, using default")
      );
    }
  }, []);

  const handleMarkerClick = (machine: Machine) => {
    setSelectedMachine(machine);
    setUserLocation([machine.lat, machine.lng]);
  };

  const filteredMachines = machines.filter(m => 
    m.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.chcName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative h-full w-full">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapContainer center={userLocation} zoom={13} className="h-full w-full" zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={userLocation} />
          
          {/* User Location Marker */}
          <Marker position={userLocation} icon={createIcon('violet')}>
            <Popup>You are here</Popup>
          </Marker>

          {/* Machine Markers */}
          {filteredMachines.map(machine => (
            <Marker 
              key={machine.id} 
              position={[machine.lat, machine.lng]}
              icon={icons[machine.status]}
              eventHandlers={{ click: () => handleMarkerClick(machine) }}
            >
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Top Overlay UI */}
      <div className="absolute top-6 left-6 z-[1000] flex gap-2 pointer-events-none w-96">
        <div className="flex-1 bg-white rounded-xl shadow-lg flex items-center px-4 h-14 pointer-events-auto border border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input 
            type="text" 
            placeholder={language === 'en' ? "Search machine or CHC..." : "मशीन या CHC खोजें..."}
            className="flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Side Panel Overlay for Selected Machine */}
      {selectedMachine && (
        <div className="absolute top-6 right-6 w-96 bg-white rounded-2xl shadow-2xl z-[1000] p-6 transition-transform duration-300 transform translate-x-0 border border-slate-100">
          <button 
            onClick={() => setSelectedMachine(null)}
            className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start justify-between mb-6 mt-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{selectedMachine.type}</h2>
              <p className="text-slate-500 flex items-center mt-2">
                <Navigation className="w-4 h-4 mr-1.5" />
                {selectedMachine.chcName} • {selectedMachine.distance} km away
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2
              ${selectedMachine.status === 'Available' ? 'bg-green-100 text-green-700' : ''}
              ${selectedMachine.status === 'Active' ? 'bg-blue-100 text-blue-700' : ''}
              ${selectedMachine.status === 'Idle' ? 'bg-yellow-100 text-yellow-700' : ''}
              ${selectedMachine.status === 'Maintenance' ? 'bg-red-100 text-red-700' : ''}
            `}>
              <span className={`w-2.5 h-2.5 rounded-full 
                ${selectedMachine.status === 'Available' ? 'bg-green-500' : ''}
                ${selectedMachine.status === 'Active' ? 'bg-blue-500' : ''}
                ${selectedMachine.status === 'Idle' ? 'bg-yellow-500' : ''}
                ${selectedMachine.status === 'Maintenance' ? 'bg-red-500' : ''}
              `}></span>
              {selectedMachine.status}
            </span>
            <span className="text-sm text-slate-500 font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              {selectedMachine.registrationNumber}
            </span>
          </div>

          <button 
            className={`w-full h-14 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-md transition-all
              ${selectedMachine.status === 'Available' ? 'bg-green-600 hover:bg-green-700 hover:shadow-lg' : 'bg-slate-400 cursor-not-allowed'}
            `}
            disabled={selectedMachine.status !== 'Available'}
            onClick={() => window.location.href = `tel:${selectedMachine.chcPhone}`}
          >
            <Phone className="w-6 h-6 mr-2" />
            {language === 'en' ? 'Call Operator' : 'ऑपरेटर को कॉल करें'}
          </button>
        </div>
      )}
    </div>
  );
}
