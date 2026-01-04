import apiClient from '../config/api.config';
import { College, Mentor } from '../data/colleges';
import { BackendCollege, BackendTeamMemberFull, ApiResponse } from '../types/api.types';

/**
 * Transform backend college data to frontend College interface
 */
const transformCollegeData = (backendCollege: BackendCollege, mentors: Mentor[] = []): College => {
    return {
        id: backendCollege.college_id,
        name: backendCollege.college_name,
        fullName: backendCollege.college_name, // Using college_name as fullName since backend doesn't have separate field
        location: backendCollege.location,
        established: backendCollege.establishment_year,
        image: backendCollege.college_img,
        description: backendCollege.about_college || '',
        highlights: backendCollege.highlight || [],
        pros: backendCollege.Pros || [],
        cons: backendCollege.Cons || [],
        whatsappLink: backendCollege.whatsappLink || '', // Empty string if no link set
        mentors: mentors,
    };
};

/**
 * Transform backend team member to frontend Mentor interface
 */
const transformMentorData = (backendMember: BackendTeamMemberFull): Mentor => {
    return {
        id: backendMember._id,
        name: backendMember.name,
        branch: backendMember.branch || backendMember.Role || 'N/A', // Department/Branch from backend
        btranch: backendMember.Role, // Store role (mentor/collegeHead) in btranch for display logic
        year: backendMember.year_academic || 'Contact for details',
        photo: backendMember.photo || 'https://via.placeholder.com/150',
        linkedin: backendMember.LinkedinURL,
        instagram: undefined, // Backend doesn't have instagram for team members
    };
};

/**
 * Fetch all colleges from the API
 */
export const getAllColleges = async (): Promise<College[]> => {
    try {
        const response = await apiClient.get<ApiResponse<BackendCollege[]>>('/api/colleges');

        if (!response.data.success || !response.data.data) {
            throw new Error('Failed to fetch colleges');
        }

        // Fetch all team members once
        const teamResponse = await apiClient.get<ApiResponse<BackendTeamMemberFull[]>>('/api/team');
        const allTeamMembers = teamResponse.data.success ? teamResponse.data.data : [];

        // For each college, filter mentors by college name
        const collegesWithMentors = response.data.data
            .filter(college => college.isActive) // Only include active colleges
            .map((college) => {
                // Find all mentors and college heads whose college_name matches this college
                const collegeMentors = allTeamMembers
                    .filter(member =>
                        member.isActive &&
                        (member.Role === 'mentor' || member.Role === 'collegeHead') &&
                        member.college_name.toLowerCase() === college.college_name.toLowerCase()
                    )
                    .map(transformMentorData);

                return transformCollegeData(college, collegeMentors);
            });

        return collegesWithMentors;
    } catch (error) {
        console.error('Error fetching colleges:', error);
        throw error;
    }
};

/**
 * Fetch a single college by ID
 */
export const getCollegeById = async (collegeId: string): Promise<College | null> => {
    try {
        // First, get all colleges and find the one with matching college_id
        const colleges = await getAllColleges();
        const college = colleges.find(c => c.id === collegeId);

        return college || null;
    } catch (error) {
        console.error(`Error fetching college ${collegeId}:`, error);
        throw error;
    }
};

/**
 * Fetch college by name (for backward compatibility)
 */
export const getCollegeByName = async (collegeName: string): Promise<College | null> => {
    try {
        const colleges = await getAllColleges();
        const college = colleges.find(
            (c) =>
                c.id.toLowerCase() === collegeName.toLowerCase() ||
                c.name.toLowerCase() === collegeName.toLowerCase() ||
                c.fullName.toLowerCase() === collegeName.toLowerCase()
        );

        return college || null;
    } catch (error) {
        console.error(`Error fetching college by name ${collegeName}:`, error);
        throw error;
    }
};

/**
 * Cache management
 */
let collegesCache: College[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get colleges with caching
 */
export const getCollegesWithCache = async (forceRefresh: boolean = false): Promise<College[]> => {
    const now = Date.now();

    // Return cached data if valid and not forcing refresh
    if (!forceRefresh && collegesCache && (now - cacheTimestamp) < CACHE_DURATION) {
        return collegesCache;
    }

    // Fetch fresh data
    const colleges = await getAllColleges();
    collegesCache = colleges;
    cacheTimestamp = now;

    return colleges;
};

/**
 * Clear cache
 */
export const clearCollegesCache = (): void => {
    collegesCache = null;
    cacheTimestamp = 0;
};
