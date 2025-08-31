import useSWR from 'swr';

export const useMeals = (username) => {
  const fetcher = (url) => fetch(url, { headers: { 'X-Username': username }}).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    'http://localhost:3001/meals',
    fetcher
  );

  return {
    meals: data,
    error,
    isLoading,
  };
}