import { create } from 'zustand';

const useAppStore = create((set) => ({
  // ___ STATES ___
  profiles: [],
  events: [],

  // ___ ACTIONS ___ (Functions to modify states)
  setProfiles: (profilesArray) => set({ profiles: profilesArray }),
  addProfile: (profile) =>
    set((state) => ({ profiles: [...state.profiles, profile] })),

  setEvents: (eventsArray) => set({ events: eventsArray }),
  addEvent: (event) => set((state) => ({ events: [...state.event, event] })),
}));

export default useAppStore;
