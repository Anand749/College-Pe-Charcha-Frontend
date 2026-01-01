import { useState, useEffect } from 'react';
import { Event, getEventsWithCache, clearEventsCache } from '../services/event.service';

interface UseEventsResult {
    events: Event[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

/**
 * Custom hook for managing events data
 * Handles fetching, loading states, error handling, and caching
 */
export const useEvents = (): UseEventsResult => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = async (forceRefresh: boolean = false) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getEventsWithCache(forceRefresh);
            setEvents(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch events';
            setError(errorMessage);
            console.error('Error in useEvents:', err);
        } finally {
            setLoading(false);
        }
    };

    const refresh = async () => {
        clearEventsCache();
        await fetchEvents(true);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return { events, loading, error, refresh };
};
