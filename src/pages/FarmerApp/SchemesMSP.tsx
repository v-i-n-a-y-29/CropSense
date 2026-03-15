import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { mockApi, Scheme, MSP } from '../../services/mockApi';
import { useAppContext } from '../../context/AppContext';

export default function SchemesMSP() {
  const { language } = useAppContext();
  const [activeTab, setActiveTab] = useState<'msp' | 'schemes'>('msp');
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [msps, setMsps] = useState<MSP[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);

  useEffect(() => {
    mockApi.getSchemes().then(setSchemes);
    mockApi.getMSP().then(setMsps);
  }, []);

  const filteredMsps = msps.filter(m => 
    m.cropEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.cropHi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-full flex flex-col max-w-7xl mx-auto w-full">
      {/* Header & Tabs */}
      <div className="bg-white pt-8 pb-4 px-8 shadow-sm z-10 sticky top-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-3xl font-bold text-slate-800">
          {language === 'en' ? 'Market & Schemes' : 'बाजार और योजनाएं'}
        </h1>
        
        <div className="flex bg-slate-100 p-1.5 rounded-xl w-full md:w-auto">
          <button 
            className={`px-8 py-2.5 text-sm font-bold rounded-lg transition-colors ${activeTab === 'msp' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('msp')}
          >
            {language === 'en' ? 'MSP Rates' : 'MSP दरें'}
          </button>
          <button 
            className={`px-8 py-2.5 text-sm font-bold rounded-lg transition-colors ${activeTab === 'schemes' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('schemes')}
          >
            {language === 'en' ? 'Govt Schemes' : 'सरकारी योजनाएं'}
          </button>
        </div>

        {activeTab === 'msp' && (
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder={language === 'en' ? "Search crops..." : "फसलें खोजें..."}
              className="w-full bg-slate-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-green-500/20 transition-all border border-transparent focus:border-green-500/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 overflow-y-auto">
        {activeTab === 'msp' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-6">
            {filteredMsps.map(msp => (
              <div key={msp.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col group">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <img src={msp.image} alt={msp.cropEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">
                    {language === 'en' ? msp.cropEn : msp.cropHi}
                  </h3>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-slate-500 text-sm mb-2 uppercase tracking-wider font-semibold">
                    {language === 'en' ? 'Current MSP' : 'वर्तमान MSP'}
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-green-700">₹{msp.price}</p>
                    <p className="text-slate-400 text-sm ml-2">/ Quintal</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            {schemes.map(scheme => {
              const isExpanded = expandedScheme === scheme.id;
              return (
                <div key={scheme.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:border-green-300">
                  <button 
                    className="w-full p-6 flex items-start justify-between text-left"
                    onClick={() => setExpandedScheme(isExpanded ? null : scheme.id)}
                  >
                    <h3 className="font-bold text-slate-800 pr-4 text-xl leading-tight">
                      {language === 'en' ? scheme.titleEn : scheme.titleHi}
                    </h3>
                    <div className="bg-slate-50 p-2 rounded-full">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50">
                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                          {language === 'en' ? 'Eligibility' : 'पात्रता'}
                        </h4>
                        <p className="text-slate-700 text-base leading-relaxed">
                          {language === 'en' ? scheme.eligibilityEn : scheme.eligibilityHi}
                        </p>
                      </div>
                      <div className="mb-8">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                          {language === 'en' ? 'Benefits' : 'लाभ'}
                        </h4>
                        <p className="text-slate-700 text-base leading-relaxed">
                          {language === 'en' ? scheme.benefitsEn : scheme.benefitsHi}
                        </p>
                      </div>
                      <a 
                        href={scheme.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto inline-flex px-8 py-3 bg-green-600 text-white font-bold rounded-xl items-center justify-center hover:bg-green-700 transition-colors shadow-sm"
                      >
                        {language === 'en' ? 'Apply Now' : 'अभी आवेदन करें'}
                        <ExternalLink className="w-5 h-5 ml-2" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
