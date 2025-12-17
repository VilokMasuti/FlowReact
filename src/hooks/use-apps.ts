import { useQuery } from '@tanstack/react-query';
import { fetchApps } from '../lib/mock-api';

export const useApps = () => {
  return useQuery({
    queryKey: ['apps'],
    queryFn: fetchApps,
    retry: 1,
    staleTime: 60000,
  });
};
