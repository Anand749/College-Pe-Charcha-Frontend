import apiClient from '../config/api.config';
import { ApiResponse, BackendEvent } from '../types/api.types';

// Frontend event interface (matching existing EventsPage interface)
export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    type: 'Expert Session' | 'Workshop' | 'Session' | 'Webinar';
    speaker: string;
    company?: string;
    image: string;
    lumaLink: string;
    isUpcoming: boolean;
}

/**
 * Transform backend event data to frontend Event interface
 */
const transformEventData = (backendEvent: BackendEvent): Event => {
    return {
        id: backendEvent._id,
        title: backendEvent.event_name,
        description: backendEvent.description,
        date: new Date(backendEvent.dateofevent).toISOString().split('T')[0],
        time: backendEvent.timeofevent,
        type: 'Expert Session', // Default type, backend doesn't have this categorization
        speaker: backendEvent.speaker_name,
        company: backendEvent.company_name || undefined,
        image: backendEvent.event_img || 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?w=800',
        lumaLink: backendEvent.link,
        isUpcoming: backendEvent.type === 'upcoming',
    };
};

/**
 * Fetch all events from the API
 */
export const getAllEvents = async (): Promise<Event[]> => {
    try {
        const response = await apiClient.get<ApiResponse<BackendEvent[]>>('/api/events');

        if (!response.data.success || !response.data.data) {
            throw new Error('Failed to fetch events');
        }

        // Transform and filter active events
        const events = response.data.data
            .filter(event => event.isActive)
            .map(transformEventData);

        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

/**
 * Get upcoming events
 */
export const getUpcomingEvents = async (): Promise<Event[]> => {
    const events = await getAllEvents();
    return events.filter(event => event.isUpcoming);
};

/**
 * Get past events
 */
export const getPastEvents = async (): Promise<Event[]> => {
    const events = await getAllEvents();
    return events.filter(event => !event.isUpcoming);
};

/**
 * Cache management
 */
let eventsCache: Event[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get events with caching
 */
export const getEventsWithCache = async (forceRefresh: boolean = false): Promise<Event[]> => {
    const now = Date.now();

    // Return cached data if valid and not forcing refresh
    if (!forceRefresh && eventsCache && (now - cacheTimestamp) < CACHE_DURATION) {
        return eventsCache;
    }

    // Fetch fresh data
    const events = await getAllEvents();
    eventsCache = events;
    cacheTimestamp = now;

    return events;
};

/**
 * Clear cache
 */
export const clearEventsCache = (): void => {
    eventsCache = null;
    cacheTimestamp = 0;
};
