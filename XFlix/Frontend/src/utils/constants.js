/**
 * Application Constants
 */

// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082/api/v1';

// Genre Options
export const GENRES = [
  { value: 'All', label: 'All' },
  { value: 'Education', label: 'Education' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Movies', label: 'Movies' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Lifestyle', label: 'Lifestyle' },
];

// Content Rating Options
export const CONTENT_RATINGS = [
  { value: 'Anyone', label: 'Anyone' },
  { value: '7+', label: '7+' },
  { value: '12+', label: '12+' },
  { value: '16+', label: '16+' },
  { value: '18+', label: '18+' },
];

// Sort By Options
export const SORT_OPTIONS = [
  { value: 'releaseDate', label: 'Release Date' },
  { value: 'viewCount', label: 'View Count' },
];

// Video Link Format Regex
export const VIDEO_LINK_REGEX = /^(https:\/\/www\.youtube\.com|youtube\.com)\/embed\/[a-zA-Z0-9_-]+$/;