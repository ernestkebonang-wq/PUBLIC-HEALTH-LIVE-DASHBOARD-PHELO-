import { HealthcareProvider, ScheduledAppointment, ConsultationModality, ProviderSpecialty } from '../types';
import { BOTSWANA_TELEHEALTH_PROVIDERS, INITIAL_SCHEDULED_APPOINTMENTS } from '../data/telehealthProvidersData';

const APPOINTMENTS_STORAGE_KEY = 'phelo_telehealth_scheduled_appointments_v1';

export function getStoredAppointments(): ScheduledAppointment[] {
  if (typeof window === 'undefined') return INITIAL_SCHEDULED_APPOINTMENTS;
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(INITIAL_SCHEDULED_APPOINTMENTS));
      return INITIAL_SCHEDULED_APPOINTMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SCHEDULED_APPOINTMENTS;
  } catch {
    return INITIAL_SCHEDULED_APPOINTMENTS;
  }
}

export function saveAppointment(appointmentData: Omit<ScheduledAppointment, 'id' | 'createdAt' | 'status'>): ScheduledAppointment {
  const current = getStoredAppointments();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newAppointment: ScheduledAppointment = {
    ...appointmentData,
    id: `app-phelo-${Date.now()}-${randomSuffix}`,
    createdAt: new Date().toISOString(),
    status: 'confirmed',
    meetingLink: `https://telehealth.phelo.gov.bw/room/consult-${randomSuffix}`,
  };

  const updated = [newAppointment, ...current];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save appointment to localStorage', e);
    }
  }
  return newAppointment;
}

export function updateAppointmentStatus(appointmentId: string, status: ScheduledAppointment['status']): ScheduledAppointment[] {
  const current = getStoredAppointments();
  const updated = current.map(app => app.id === appointmentId ? { ...app, status } : app);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update appointment status in localStorage', e);
    }
  }
  return updated;
}

export function cancelAppointment(appointmentId: string): ScheduledAppointment[] {
  return updateAppointmentStatus(appointmentId, 'cancelled');
}

export function filterProviders(
  providers: HealthcareProvider[],
  districtFilter: string,
  specialtyFilter: string,
  modalityFilter: string,
  searchQuery: string
): HealthcareProvider[] {
  return providers.filter(provider => {
    // District filter
    if (districtFilter !== 'all' && districtFilter !== 'All Districts') {
      const distMatch = provider.district.toLowerCase().includes(districtFilter.toLowerCase()) ||
                        districtFilter.toLowerCase().includes(provider.district.toLowerCase());
      if (!distMatch) return false;
    }

    // Specialty filter
    if (specialtyFilter !== 'all' && provider.specialty !== specialtyFilter) {
      return false;
    }

    // Modality filter
    if (modalityFilter !== 'all' && !provider.supportedModalities.includes(modalityFilter as ConsultationModality)) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = provider.name.toLowerCase().includes(q);
      const matchFacility = provider.facility.toLowerCase().includes(q);
      const matchSpecialty = provider.specialtyLabelEn.toLowerCase().includes(q) || provider.specialtyLabelTn.toLowerCase().includes(q);
      const matchBio = provider.bioEn.toLowerCase().includes(q) || provider.bioTn.toLowerCase().includes(q);
      const matchLang = provider.languages.some(l => l.toLowerCase().includes(q));
      if (!matchName && !matchFacility && !matchSpecialty && !matchBio && !matchLang) {
        return false;
      }
    }

    return true;
  });
}
