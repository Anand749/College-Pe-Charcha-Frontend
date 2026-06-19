import { useState, useEffect } from 'react';
import { Resource, getResourcesWithCache, clearResourcesCache } from '../services/resource.service';
interface UseResourcesResult {
    resources: Resource[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

/**
 * Custom hook for managing resources data
 * Handles fetching, loading states, error handling, and caching
 */
export const useResources = (): UseResourcesResult => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchResources = async (forceRefresh: boolean = false) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getResourcesWithCache(forceRefresh);
            setResources(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch resources';
            setError(errorMessage);
            console.error('Error in useResources:', err);
        } finally {
            setLoading(false);
        }
    };

    const refresh = async () => {
        clearResourcesCache();
        await fetchResources(true);
    };

    useEffect(() => {
        fetchResources();
    }, []);

    return { resources, loading, error, refresh };
};
