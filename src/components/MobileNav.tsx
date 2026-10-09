import React, { useState } from 'react';
import { 
  Home, 
  Stethoscope, 
  Building2, 
  Pill, 
  MoreHorizontal, 
  Droplet, 
  Baby, 
  BookOpen, 
  Activity, 
  Video,
  X 
} from 'lucide-react';
import { LanguageCode } from '../types';
import { UI_STRINGS } from '../data/languages';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLang: LanguageCode;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab, currentLang }) => {
  const t = UI_STRINGS[currentLang] || UI_STRINGS.en;
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'triage', label: t.navTriage, icon: Stethoscope },
    { id: 'facilities', label: t.navFacilities, icon: Building2 },
    { id: 'medicines', label: t.navMedicines || 'Medicines', icon: Pill },
  ];

  const moreItems = [
    { id: 'telehealth', label: t.navTeleHealth || 'Remote Consult', icon: Video, desc: 'Certified doctor & nurse virtual consultations' },
    { id: 'blood_bank', label: t.navBloodBank || 'Blood Bank', icon: Droplet, desc: 'NBTS live corridor reserves & urgent donor appeals' },
    { id: 'bukana', label: t.navBukana || 'Under-5 Card', icon: Baby, desc: 'Bukana ya Masea vaccination milestones & growth' },
    { id: 'health_info', label: t.navHealthInfo, icon: BookOpen, desc: 'MoH approved clinical protocols & home first-aid' },
    { id: 'surveillance', label: t.navSurveillance, icon: Activity, desc: 'Regional syndromic early-warnings & lifestyle feed' },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setIsMoreOpen(false);
  };

  const isMoreActive = moreItems.some(item => item.id === activeTab);

  return (
    <>
      {/* Expanded Quick Drawer for Mobile */}
      {isMoreOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex flex-col justify-end p-3 animate-in fade-in"
          onClick={() => setIsMoreOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 space-y-3 mb-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                {currentLang === 'tn' ? 'Ditirelo Tse Dingwe tsa PHELO' : 'More Health Services'}
              </span>
              <button 
                onClick={() => setIsMoreOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full p-3 rounded-2xl border flex items-center gap-3.5 text-left transition-colors ${
                      isActive 
                        ? 'bg-teal-50 border-teal-300 text-teal-950 shadow-2xs' 
                        : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-teal-800 text-white' : 'bg-white border border-slate-200 text-teal-800'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-1">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main 5-Button Bottom Navigation */}
      <nav 
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 safe-area-pb"
      >
        <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-1">
          {mainItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 transition-colors ${
                  isActive ? 'text-teal-900 font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-teal-800' : 'text-slate-400'}`} />
                <span className={`text-[10px] tracking-tight mt-1 truncate max-w-[64px] ${isActive ? 'font-semibold text-teal-950' : 'font-normal'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* More Button */}
          <button
            onClick={() => setIsMoreOpen(prev => !prev)}
            className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 transition-colors ${
              isMoreActive || isMoreOpen ? 'text-teal-900 font-semibold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MoreHorizontal className={`w-5 h-5 transition-transform ${isMoreActive || isMoreOpen ? 'scale-110 text-teal-800' : 'text-slate-400'}`} />
            <span className={`text-[10px] tracking-tight mt-1 truncate max-w-[64px] ${isMoreActive || isMoreOpen ? 'font-semibold text-teal-950' : 'font-normal'}`}>
              {currentLang === 'tn' ? 'Tse Dingwe' : 'More'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
