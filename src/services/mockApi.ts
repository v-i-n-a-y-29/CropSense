export type MachineStatus = 'Available' | 'Active' | 'Idle' | 'Maintenance';

export interface Machine {
  id: string;
  type: string;
  registrationNumber: string;
  status: MachineStatus;
  chcName: string;
  chcPhone: string;
  lat: number;
  lng: number;
  distance?: number;
}

export interface WeatherData {
  temp: number;
  high: number;
  low: number;
  condition: string;
  rainfall: number;
  forecast: { day: string; temp: number; icon: string }[];
}

export interface Scheme {
  id: string;
  titleEn: string;
  titleHi: string;
  eligibilityEn: string;
  eligibilityHi: string;
  benefitsEn: string;
  benefitsHi: string;
  link: string;
}

export interface MSP {
  id: string;
  cropEn: string;
  cropHi: string;
  price: number;
  image: string;
}

const MOCK_MACHINES: Machine[] = [
  { id: 'M001', type: 'Happy Seeder', registrationNumber: 'PB-10-AB-1234', status: 'Available', chcName: 'Kisan CHC Ludhiana', chcPhone: '+919876543210', lat: 30.900965, lng: 75.857277 },
  { id: 'M002', type: 'Super Seeder', registrationNumber: 'PB-10-XY-9876', status: 'Active', chcName: 'Kisan CHC Ludhiana', chcPhone: '+919876543210', lat: 30.910000, lng: 75.860000 },
  { id: 'M003', type: 'Rotavator', registrationNumber: 'PB-11-CD-5678', status: 'Idle', chcName: 'Punjab Agro CHC', chcPhone: '+919988776655', lat: 30.890000, lng: 75.840000 },
  { id: 'M004', type: 'Laser Leveler', registrationNumber: 'PB-12-EF-1122', status: 'Maintenance', chcName: 'Green Farm CHC', chcPhone: '+919998887776', lat: 30.920000, lng: 75.870000 },
  { id: 'M005', type: 'Happy Seeder', registrationNumber: 'PB-10-GH-3344', status: 'Available', chcName: 'Punjab Agro CHC', chcPhone: '+919988776655', lat: 30.880000, lng: 75.830000 },
  { id: 'M006', type: 'Tractor', registrationNumber: 'PB-10-JK-5566', status: 'Available', chcName: 'Green Farm CHC', chcPhone: '+919998887776', lat: 30.930000, lng: 75.880000 },
  { id: 'M007', type: 'Super Seeder', registrationNumber: 'PB-10-LM-7788', status: 'Active', chcName: 'Kisan CHC Ludhiana', chcPhone: '+919876543210', lat: 30.905000, lng: 75.850000 },
];

let machinesState = [...MOCK_MACHINES];

export const mockApi = {
  getMachines: async (lat?: number, lng?: number, radius?: number): Promise<Machine[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (lat && lng) {
      // Very rough distance calculation for mock purposes
      return machinesState.map(m => ({
        ...m,
        distance: Math.round(Math.sqrt(Math.pow((m.lat - lat) * 111, 2) + Math.pow((m.lng - lng) * 111, 2)) * 10) / 10
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }
    return machinesState;
  },

  updateMachineStatus: async (id: string, status: MachineStatus): Promise<Machine> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const index = machinesState.findIndex(m => m.id === id);
    if (index === -1) throw new Error('Machine not found');
    
    machinesState[index] = { ...machinesState[index], status };
    return machinesState[index];
  },

  getWeather: async (lat: number, lng: number): Promise<WeatherData> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      temp: 28,
      high: 32,
      low: 22,
      condition: 'Partly Cloudy',
      rainfall: 60, // 60% chance, triggering alert
      forecast: [
        { day: 'Mon', temp: 29, icon: 'sun' },
        { day: 'Tue', temp: 27, icon: 'cloud' },
        { day: 'Wed', temp: 25, icon: 'rain' },
        { day: 'Thu', temp: 26, icon: 'cloud' },
        { day: 'Fri', temp: 28, icon: 'sun' },
        { day: 'Sat', temp: 30, icon: 'sun' },
        { day: 'Sun', temp: 31, icon: 'sun' },
      ]
    };
  },

  getSchemes: async (): Promise<Scheme[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      {
        id: 'S1',
        titleEn: 'PM-KISAN Samman Nidhi',
        titleHi: 'पीएम-किसान सम्मान निधि',
        eligibilityEn: 'Small and marginal farmers with cultivable land up to 2 hectares.',
        eligibilityHi: '2 हेक्टेयर तक खेती योग्य भूमि वाले छोटे और सीमांत किसान।',
        benefitsEn: '₹6,000 per year in three equal installments.',
        benefitsHi: 'तीन समान किस्तों में ₹6,000 प्रति वर्ष।',
        link: 'https://pmkisan.gov.in/'
      },
      {
        id: 'S2',
        titleEn: 'Sub-Mission on Agricultural Mechanization (SMAM)',
        titleHi: 'कृषि यंत्रीकरण पर उप-मिशन (SMAM)',
        eligibilityEn: 'All farmers, preference to small/marginal, women, SC/ST.',
        eligibilityHi: 'सभी किसान, छोटे/सीमांत, महिलाओं, एससी/एसटी को प्राथमिकता।',
        benefitsEn: 'Subsidy up to 50-80% on purchase of agricultural machinery.',
        benefitsHi: 'कृषि मशीनरी की खरीद पर 50-80% तक की सब्सिडी।',
        link: 'https://agrimachinery.nic.in/'
      }
    ];
  },

  getMSP: async (): Promise<MSP[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 'M1', cropEn: 'Wheat', cropHi: 'गेहूँ', price: 2275, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=200&q=80' },
      { id: 'M2', cropEn: 'Paddy (Common)', cropHi: 'धान (सामान्य)', price: 2183, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200&q=80' },
      { id: 'M3', cropEn: 'Mustard', cropHi: 'सरसों', price: 5650, image: 'https://images.unsplash.com/photo-1621460244140-5167f082e0e0?auto=format&fit=crop&w=200&q=80' },
      { id: 'M4', cropEn: 'Gram', cropHi: 'चना', price: 5440, image: 'https://images.unsplash.com/photo-1585996020581-22964b304c4f?auto=format&fit=crop&w=200&q=80' },
    ];
  },

  getAnalytics: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      statusBreakdown: [
        { name: 'Available', value: machinesState.filter(m => m.status === 'Available').length, color: '#22c55e' },
        { name: 'Active', value: machinesState.filter(m => m.status === 'Active').length, color: '#3b82f6' },
        { name: 'Idle', value: machinesState.filter(m => m.status === 'Idle').length, color: '#eab308' },
        { name: 'Maintenance', value: machinesState.filter(m => m.status === 'Maintenance').length, color: '#ef4444' },
      ],
      correlationData: [
        { date: 'Oct 1', utilization: 20, aqi: 150 },
        { date: 'Oct 5', utilization: 35, aqi: 180 },
        { date: 'Oct 10', utilization: 50, aqi: 220 },
        { date: 'Oct 15', utilization: 75, aqi: 280 },
        { date: 'Oct 20', utilization: 85, aqi: 350 },
        { date: 'Oct 25', utilization: 90, aqi: 400 }, // Peak stubble burning season
        { date: 'Oct 30', utilization: 60, aqi: 300 },
        { date: 'Nov 5', utilization: 40, aqi: 200 },
      ]
    };
  }
};
