import apiClient from '../config/api.config';
import { ApiResponse, BackendTeamMemberFull } from '../types/api.types';

// Frontend team member interface (matching existing TeamPage interface)
export interface TeamMember {
    id: string;
    name: string;
    role: string;
    college: string;
    year: string;
    bio: string;
    photo: string;
    linkedin?: string;
    instagram?: string;
    email?: string;
}

/**
 * Transform backend team member data to frontend TeamMember interface
 */
const transformTeamMemberData = (backendMember: BackendTeamMemberFull): TeamMember => {
    // Map backend Role to frontend display role
    let displayRole = '';
    switch (backendMember.Role) {
        case 'Founder':
            displayRole = 'Founder & Lead';
            break;
        case 'Executive':
            displayRole = 'Executive Team Member';
            break;
        case 'Core':
            displayRole = 'Core Team Member';
            break;
        case 'mentor':
            displayRole = `College Mentor - ${backendMember.college_name}`;
            break;
        case 'collegeHead':
            displayRole = `College Head - ${backendMember.college_name}`;
            break;
        default:
            displayRole = backendMember.Role.charAt(0).toUpperCase() + backendMember.Role.slice(1);
    }

    return {
        id: backendMember._id,
        name: backendMember.name,
        role: displayRole,
        college: backendMember.college_name,
        year: backendMember.year_academic,
        bio: backendMember.Tagline || 'Dedicated team member contributing to our mission.',
        photo: backendMember.photo,
        linkedin: backendMember.LinkedinURL,
    };
};

/**
 * Fetch all team members from the API
 */
export const getAllTeamMembers = async (): Promise<TeamMember[]> => {
    try {
        const response = await apiClient.get<ApiResponse<BackendTeamMemberFull[]>>('/api/team');

        if (!response.data.success || !response.data.data) {
            throw new Error('Failed to fetch team members');
        }

        // Transform and filter active team members
        const teamMembers = response.data.data
            .filter(member => member.isActive)
            .map(transformTeamMemberData);

        return teamMembers;
    } catch (error) {
        console.error('Error fetching team members:', error);
        throw error;
    }
};

/**
 * Cache management
 */
let teamMembersCache: TeamMember[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get team members with caching
 */
export const getTeamMembersWithCache = async (forceRefresh: boolean = false): Promise<TeamMember[]> => {
    const now = Date.now();

    // Return cached data if valid and not forcing refresh
    if (!forceRefresh && teamMembersCache && (now - cacheTimestamp) < CACHE_DURATION) {
        return teamMembersCache;
    }

    // Fetch fresh data
    const teamMembers = await getAllTeamMembers();
    teamMembersCache = teamMembers;
    cacheTimestamp = now;

    return teamMembers;
};

/**
 * Clear cache
 */
export const clearTeamMembersCache = (): void => {
    teamMembersCache = null;
    cacheTimestamp = 0;
};
