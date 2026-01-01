import { useState, useEffect } from 'react';
import { College } from '../data/colleges';
import { getCollegesWithCache, clearCollegesCache } from '../services/college.service';

interface UseCollegesResult {
    colleges: College[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

/**
 * Custom hook for managing college data
 * Handles fetching, loading states, error handling, and caching
 */
export const useColleges = (): UseCollegesResult => {
    const [colleges, setColleges] = useState<College[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchColleges = async (forceRefresh: boolean = false) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getCollegesWithCache(forceRefresh);
            setColleges(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch colleges';
            setError(errorMessage);
            console.error('Error in useColleges:', err);
        } finally {
            setLoading(false);
        }
    };

    const refresh = async () => {
        clearCollegesCache();
        await fetchColleges(true);
    };

    useEffect(() => {
        fetchColleges();
    }, []);

    return { colleges, loading, error, refresh };
};
