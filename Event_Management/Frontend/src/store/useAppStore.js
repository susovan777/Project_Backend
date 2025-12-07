import { create } from 'zustand';
import eventAPI from '../services/eventServices';
import profileAPI from '../services/profileServices';
import { getUserTimezone } from '../utils/timezones';

const useAppStore = create((set, get) => ({
  // ================= STATES =================
  profiles: [],
  events: [],
  currentProfile: null,
  currentTimezone: getUserTimezone(),
  loading: false,
  error: null,

  // ============== PROFILE ACTIONS ==============

  // Get all profiles
  getProfiles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await profileAPI.getAll();
      set({ profiles: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch profiles',
        loading: false,
      });
    }
  },

  // Create new profile
  createProfile: async (profileData) => {
    set({ loading: true, error: null });
    try {
      const response = await profileAPI.create(profileData);
      set((state) => ({
        profiles: [...state.profiles, response.data],
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to create profile',
        loading: false,
      });
      throw error;
    }
  },

  // Set current profile (for viewing their events)
  setCurrentProfile: (profile) => {
    set({ currentProfile: profile });
    if (profile) {
      get().getEventsByProfile(profile._id);
    } else {
      get().getAllEvents();
    }
  },

  // Update profile timezone
  updateProfileTimezone: async () => {},

  // Delete profile
  deleteProfile: async (profileId) => {
    set({ loading: true, error: null });
    try {
      await profileAPI.delete(profileId);
      set((state) => ({
        profiles: state.profiles.filter((p) => profileId !== p._id),
        loading: false,
      }));

      // If we deleted the currently selected profile, clear selection
      if (get().currentProfile?._id === profileId) {
        set({ currentProfile: null });
        get().fetchAllEvents();
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to delete profile',
        loading: false,
      });
    }
  },

  // ============== EVENT ACTIONS ==============

  // Fetch events for current profile
  getEventsByProfile: async (profileId) => {
    set({ loading: true, error: null });
    try {
      const timezone = get().currentTimezone;
      const response = await eventAPI.getByProfile(profileId, timezone);
      set({ events: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch events',
        loading: false,
      });
    }
  },

  // Fetch all events
  getAllEvents: async () => {
    set({ loading: true, error: null });
    try {
      const timezone = get().currentTimezone;
      const response = await eventAPI.getAll(timezone);
      set({ events: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch events',
        loading: false,
      });
    }
  },

  // Create new event
  createEvent: async (eventData) => {
    set({ loading: true, error: null });
    try {
      const response = await eventAPI.create(eventData);
      set((state) => ({
        events: [...state.events, response.data],
        loading: false,
      }));

      // Refetch events to get proper timezone conversion
      const currentProfile = get().currentProfile;
      if (currentProfile) {
        await get().getEventsByProfile(currentProfile._id);
      } else {
        await get().getAllEvents();
      }

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to create event',
        loading: false,
      });
      throw error;
    }
  },

  // Update event
  updateEvent: async (eventId, eventData) => {
    set({ loading: true, error: null });
    try {
      const response = await eventAPI.update(eventId, {
        ...eventData,
      });
      set((state) => ({
        events: state.events.map((e) =>
          e._id === eventId ? response.data : e
        ),
        loading: false,
      }));

      // Refetch events to get proper timezone conversion
      const currentProfile = get().currentProfile;
      if (currentProfile) {
        console.log('Refetching events for profile:', currentProfile._id);
        await get().getEventsByProfile(currentProfile._id);
      } else {
        console.log('Refetching all events');
        await get().fetchAllEvents();
      }

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to update event',
        loading: false,
      });
    }
  },

  // Delete event
  deleteEvent: async (id) => {
    set({ loading: true, error: null });
    try {
      await eventAPI.delete(id);
      set((state) => ({
        events: state.events.filter((e) => e._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to delete event',
        loading: false,
      });
    }
  },

  // Set current timezone (when user changes it)
  setCurrentTimezone: async (timezone) => {
    set({ currentTimezone: timezone });
    // Refetch events with new timezone
    const currentProfile = get().currentProfile;
    if (currentProfile) {
      await get().getEventsByProfile(currentProfile._id);
    } else {
      await get().getAllEvents();
    }
  },
  clearError: () => set({ error: null }),
}));

export default useAppStore;
