import { useState, useEffect } from 'react';
import { CloudRain, Sun, Cloud, AlertTriangle, Droplets, Wind } from 'lucide-react';
import { mockApi, WeatherData } from '../../services/mockApi';
import { useAppContext } from '../../context/AppContext';

export default function WeatherAlerts() {
  const { language } = useAppContext();
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    mockApi.getWeather(30.900965, 75.857277).then(setWeather);
  }, []);

  if (!weather) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 mt-4">
        {language === 'en' ? 'Weather & Alerts' : 'मौसम और अलर्ट'}
      </h1>

      {/* Alert Banner */}
      {weather.rainfall > 50 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl shadow-sm mb-8 flex items-start">
          <AlertTriangle className="w-8 h-8 text-red-500 mr-4 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-800 font-bold text-xl mb-1">
              {language === 'en' ? 'Heavy Rain Expected' : 'भारी बारिश की संभावना'}
            </h3>
            <p className="text-red-600 text-base">
              {language === 'en' 
                ? 'Delay seeding operations for the next 48 hours to prevent seed washout.' 
                : 'बीज बहने से रोकने के लिए अगले 48 घंटों के लिए बुवाई का काम टाल दें।'}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Hero Weather Card */}
        <div className="md:col-span-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-10 -right-10 opacity-20">
            <CloudRain className="w-64 h-64" />
          </div>
          
          <div className="relative z-10">
            <p className="text-blue-100 font-medium mb-2 text-lg">
              {language === 'en' ? 'Today, Ludhiana' : 'आज, लुधियाना'}
            </p>
            <div className="flex items-start mb-4">
              <span className="text-8xl font-bold tracking-tighter">{weather.temp}°</span>
              <span className="text-3xl mt-3 ml-1">C</span>
            </div>
            <p className="text-2xl font-medium">{weather.condition}</p>
          </div>
          
          <div className="relative z-10 mt-8">
            <div className="flex items-center text-blue-100 mb-6 text-lg">
              <span className="font-medium mr-4">H: {weather.high}°</span>
              <span className="font-medium">L: {weather.low}°</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-blue-400/30">
              <div className="flex items-center">
                <Droplets className="w-6 h-6 text-blue-200 mr-3" />
                <div>
                  <p className="text-sm text-blue-200 uppercase tracking-wider">Rain Chance</p>
                  <p className="font-bold text-lg">{weather.rainfall}%</p>
                </div>
              </div>
              <div className="flex items-center">
                <Wind className="w-6 h-6 text-blue-200 mr-3" />
                <div>
                  <p className="text-sm text-blue-200 uppercase tracking-wider">Wind</p>
                  <p className="font-bold text-lg">12 km/h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-slate-800 mb-6 px-1">
            {language === 'en' ? '7-Day Forecast' : '7-दिवसीय पूर्वानुमान'}
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {weather.forecast.map((day, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <p className="text-slate-500 font-medium mb-4 text-lg">{day.day}</p>
                {day.icon === 'sun' && <Sun className="w-10 h-10 text-yellow-500 mb-4" />}
                {day.icon === 'cloud' && <Cloud className="w-10 h-10 text-slate-400 mb-4" />}
                {day.icon === 'rain' && <CloudRain className="w-10 h-10 text-blue-500 mb-4" />}
                <p className="text-2xl font-bold text-slate-800">{day.temp}°</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
