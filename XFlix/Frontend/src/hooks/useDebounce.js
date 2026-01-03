import { useEffect, useState } from 'react';

/**
 * useDebounce Hook
 * Delays updating a value until after a specified delay
 * Useful for search inputs to avoid making API calls on every keystroke
 *
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 * @return {any} Debounced value
 *
 * Example:
 * const searchQuery = 'test';
 * const debouncedQuery = useDebounce(searchQuery, 500);
 * // debouncedQuery updates 500ms after user stops typing
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timeout to update debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function - cancels timeout if value changes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
