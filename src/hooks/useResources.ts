import { useState, useEffect } from 'react';
import { Resource, getResourcesWithCache, clearResourcesCache } from '../services/resource.service';
import collegelist from '../files/clist.pdf'
import top20 from '../files/top20.pdf'
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

    const staticResources: Resource[] = [
        {
            id: 'static-1',
            title: 'Top 20 Engineering Colleges in Maharashtra',
            description: 'Comprehensive list and analysis of the top 20 engineering colleges in Maharashtra, covering rankings, placements, infrastructure, and student reviews.',
            category: 'College Rankings',
            isPremium: false,
            downloads: '2.4K+',
            rating: 4.8,
            previewImage: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?w=800',
            lastUpdated: '2025-07-15T00:00:00.000Z',
            fileUrl: top20
        },
        {
            id: 'static-2',
            title: 'College Preference List for CAP Rounds',
            description: 'Expertly curated preference list for CAP rounds including top colleges from Mumbai, Pune, and Sangli. Built from seniors\' real experiences.',
            category: 'Admission Guidance',
            isPremium: true,
            price: 199,
            downloads: '1K+',
            rating: 4.9,
            previewImage: '/files/list.png',
            lastUpdated: '2025-08-10T00:00:00.000Z',
            fileUrl: collegelist
        }
    ];

    const allResources = [...staticResources, ...resources];

    return { resources: allResources, loading, error, refresh };
};
