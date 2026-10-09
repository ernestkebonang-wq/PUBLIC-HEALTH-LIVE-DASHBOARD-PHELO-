/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { HomeView } from './components/HomeView';
import { TriageCareRouter } from './components/TriageCareRouter';
import { FacilityDirectory } from './components/FacilityDirectory';
import { HealthLibraryView } from './components/HealthLibraryView';
import { PublicHealthSurveillance } from './components/PublicHealthSurveillance';
import { EssentialMedicinesTracker } from './components/EssentialMedicinesTracker';
import { BloodDonationHub } from './components/BloodDonationHub';
import { BukanaYaMasea } from './components/BukanaYaMasea';
import { RemoteConsultationPortal } from './components/RemoteConsultationPortal';
import { EmergencyModal } from './components/EmergencyModal';
import { PrivacyVaultModal } from './components/PrivacyVaultModal';
import { HealthVideoHubModal } from './components/HealthVideoHubModal';
import { BrandIdentityModal } from './components/BrandIdentityModal';
import { PHELOLogo } from './components/PHELOLogo';
import { EnvironmentalCanvas } from './components/EnvironmentalCanvas';
import { LanguageCode, UserProfile } from './types';
import { getInitialUserProfile, saveUserProfile } from './services/storageService';

export default function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isPrivacyVaultOpen, setIsPrivacyVaultOpen] = useState(false);
  const [isHealthVideoOpen, setIsHealthVideoOpen] = useState(false);
  const [isBrandGuideOpen, setIsBrandGuideOpen] = useState(false);
  const [isLivingMode, setIsLivingMode] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>(getInitialUserProfile());
  const [facilityTierFilter, setFacilityTierFilter] = useState<string>('all');
  const [healthLibraryArticleId, setHealthLibraryArticleId] = useState<string | undefined>();
  const [surveillanceDistrict, setSurveillanceDistrict] = useState<string | undefined>();
  const [surveillanceViewMode, setSurveillanceViewMode] = useState<'feed' | 'matrix'>('feed');

  useEffect(() => {
    // Sync language preference if set in profile
    if (userProfile.preferredLanguage) {
      setCurrentLang(userProfile.preferredLanguage);
    }
  }, [userProfile]);

  const handleLanguageChange = (lang: LanguageCode) => {
    setCurrentLang(lang);
    const updated = { ...userProfile, preferredLanguage: lang };
    setUserProfile(updated);
    saveUserProfile(updated);
  };

  const handleNavigateToFacilities = (careRouteType?: string) => {
    if (careRouteType === 'emergency_facility' || careRouteType === 'district_hospital') {
      setFacilityTierFilter('district_hospital');
    } else if (careRouteType === 'urgent_clinic_24h' || careRouteType === 'clinic_24h') {
      setFacilityTierFilter('clinic_24h');
    } else if (careRouteType === 'private_hospital') {
      setFacilityTierFilter('private_hospital');
    } else {
      setFacilityTierFilter('all');
    }
    setActiveTab('facilities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/90 text-slate-900 flex flex-col font-sans relative">
      {/* Living Ecological & Health Environment Background Canvas */}
      <EnvironmentalCanvas isLivingMode={isLivingMode} />

      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-teal-800 text-white p-2 z-50 rounded text-xs"
      >
        Skip to main content
      </a>

      {/* Top Bar Contract Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenPrivacyVault={() => setIsPrivacyVaultOpen(true)}
        onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
      />

      {/* Main Content Viewport */}
      <main id="main-content" className="flex-1 relative z-10">
        {activeTab === 'home' && (
          <HomeView
            currentLang={currentLang}
            isLivingMode={isLivingMode}
            userDistrict={userProfile.district}
            onNavigateTab={(tab, payload) => {
              if (tab === 'facilities') {
                handleNavigateToFacilities(payload);
              } else if (tab === 'health_info') {
                setHealthLibraryArticleId(payload);
                setActiveTab('health_info');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (tab === 'surveillance_feed') {
                setSurveillanceDistrict(payload);
                setSurveillanceViewMode('feed');
                setActiveTab('surveillance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (tab === 'surveillance_matrix') {
                setSurveillanceDistrict(payload);
                setSurveillanceViewMode('matrix');
                setActiveTab('surveillance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (tab === 'surveillance') {
                setSurveillanceDistrict(payload);
                setSurveillanceViewMode('feed');
                setActiveTab('surveillance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
            onOpenVideoHub={() => setIsHealthVideoOpen(true)}
            onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
          />
        )}

        {activeTab === 'triage' && (
          <TriageCareRouter
            currentLang={currentLang}
            userProfile={userProfile}
            onNavigateToFacilities={handleNavigateToFacilities}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        )}

        {activeTab === 'facilities' && (
          <FacilityDirectory
            currentLang={currentLang}
            initialDistrict={userProfile.district || 'All'}
            initialTierFilter={facilityTierFilter}
          />
        )}

        {activeTab === 'medicines' && (
          <EssentialMedicinesTracker
            currentLang={currentLang}
            initialDistrict={userProfile.district || 'All'}
            onNavigateToFacilities={handleNavigateToFacilities}
          />
        )}

        {activeTab === 'blood_bank' && (
          <BloodDonationHub
            currentLang={currentLang}
            onNavigateToFacilities={handleNavigateToFacilities}
          />
        )}

        {activeTab === 'bukana' && (
          <BukanaYaMasea
            currentLang={currentLang}
            onNavigateToFacilities={handleNavigateToFacilities}
          />
        )}

        {activeTab === 'telehealth' && (
          <RemoteConsultationPortal
            currentLang={currentLang}
            initialDistrict={userProfile.district || 'All'}
            onNavigateToFacilities={handleNavigateToFacilities}
            onNavigateToTriage={() => {
              setActiveTab('triage');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        )}

        {activeTab === 'health_info' && (
          <HealthLibraryView 
            currentLang={currentLang} 
            initialArticleId={healthLibraryArticleId}
          />
        )}

        {activeTab === 'surveillance' && (
          <PublicHealthSurveillance 
            currentLang={currentLang} 
            initialDistrict={surveillanceDistrict}
            initialViewMode={surveillanceViewMode}
            onNavigateTab={(tab, payload) => {
              if (tab === 'facilities') {
                handleNavigateToFacilities(payload);
              } else if (tab === 'health_info') {
                setHealthLibraryArticleId(payload);
                setActiveTab('health_info');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (tab === 'triage') {
                setActiveTab('triage');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
        )}
      </main>

      {/* Editorial Footer (Strict anti-slop: clean copyright, zero fake telemetry tickers) */}
      <footer className="bg-white/90 backdrop-blur-sm border-t border-slate-200 mt-auto py-8 mb-16 md:mb-0 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2.5">
              <PHELOLogo
                variant="horizontal"
                size="xs"
                showTagline={false}
                onClick={() => setIsBrandGuideOpen(true)}
                className="cursor-pointer"
              />
              <span aria-hidden="true">·</span>
              <span>Botswana Health Ecosystem</span>
              <span aria-hidden="true">·</span>
              <span>Care First · Intelligence Second</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-600">
              <button
                onClick={() => setIsBrandGuideOpen(true)}
                className="hover:text-teal-900 font-semibold text-teal-800 transition-colors"
                title="View Official PHELO Brand Identity Guidelines"
              >
                Brand Identity
              </button>
              <button
                onClick={() => setIsLivingMode(!isLivingMode)}
                className="hover:text-slate-900 transition-colors"
                title="Toggle ambient background visual effects"
              >
                {isLivingMode ? 'Ambient: Living' : 'Ambient: Calm'}
              </button>
              <button
                onClick={() => setIsPrivacyVaultOpen(true)}
                className="hover:text-slate-900 transition-colors"
              >
                Privacy & Data Separation
              </button>
              <button
                onClick={() => setIsHealthVideoOpen(true)}
                className="hover:text-teal-800 transition-colors font-medium text-teal-800"
              >
                Clinical Media Hub
              </button>
              <button
                onClick={() => setIsEmergencyOpen(true)}
                className="hover:text-rose-700 transition-colors font-medium text-rose-800"
              >
                Emergency (997)
              </button>
              <span>MoH Botswana Aligned</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLang={currentLang}
      />

      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        currentLang={currentLang}
        onNavigateToFacilities={() => {
          setIsEmergencyOpen(false);
          setActiveTab('facilities');
        }}
      />

      {/* Privacy & Progressive Identity Vault Modal */}
      <PrivacyVaultModal
        isOpen={isPrivacyVaultOpen}
        onClose={() => setIsPrivacyVaultOpen(false)}
        userProfile={userProfile}
        onProfileUpdate={setUserProfile}
        currentLang={currentLang}
      />

      {/* Health Educational Media Hub Modal */}
      <HealthVideoHubModal
        isOpen={isHealthVideoOpen}
        onClose={() => setIsHealthVideoOpen(false)}
        currentLang={currentLang}
      />

      {/* Official PHELO Brand Identity & Visual Guidelines Modal */}
      <BrandIdentityModal
        isOpen={isBrandGuideOpen}
        onClose={() => setIsBrandGuideOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
