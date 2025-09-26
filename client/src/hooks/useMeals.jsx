import useSWR from 'swr';
import { createApiUrl } from "../lib/ApiHelpers.js";

export const useMeals = () => {
  const fetcher = (url, username) => fetch(url, { headers: { 'X-Username': username }}).then((res) => res.json());
  
  const getMeals = (username, queryParams = {}) => {
    // Build URL with query parameters
    const baseUrl = createApiUrl('meals');
    const urlParams = new URLSearchParams(queryParams);
    const url = urlParams.toString() ? `${baseUrl}?${urlParams.toString()}` : baseUrl;
    
    const { data, error, isLoading } = useSWR(
      [url, username],
      ([url, username]) => fetcher(url, username)
    );

    return {
      meals: data,
      error,
      isLoading,
    };
  };

  return {
    getMeals,
  };
}