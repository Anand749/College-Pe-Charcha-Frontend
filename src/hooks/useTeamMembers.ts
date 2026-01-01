import { useState, useEffect } from 'react';
import { TeamMember, getTeamMembersWithCache, clearTeamMembersCache } from '../services/team.service';

interface UseTeamMembersResult {
    teamMembers: TeamMember[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

/**
 * Custom hook for managing team member  data
 * Handles fetching, loading states, error handling, and caching
 */
export const useTeamMembers = (): UseTeamMembersResult => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTeamMembers = async (forceRefresh: boolean = false) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getTeamMembersWithCache(forceRefresh);
            setTeamMembers(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch team members';
            setError(errorMessage);
            console.error('Error in useTeamMembers:', err);
        } finally {
            setLoading(false);
        }
    };

    const refresh = async () => {
        clearTeamMembersCache();
        await fetchTeamMembers(true);
    };

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    return { teamMembers, loading, error, refresh };
};
