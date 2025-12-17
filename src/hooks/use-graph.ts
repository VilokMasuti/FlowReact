import { useQuery } from '@tanstack/react-query';
import { fetchGraph } from '../lib/mock-api';

export function useGraph(appId: string | null) {
  return useQuery({
    queryKey: ['graph', appId],
    queryFn: () => fetchGraph(appId!),
    enabled: !!appId,
    retry: 1,
  });
}
