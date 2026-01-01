import apiClient from '../config/api.config';
import { ApiResponse, BackendResource } from '../types/api.types';

// Frontend resource interface (matching existing ResourcesPage interface)
export interface Resource {
    id: string;
    title: string;
    description: string;
    category: 'College Rankings' | 'Branch Analysis' | 'Career Guidance' | 'Placement Data' | 'Admission Guidance';
    isPremium: boolean;
    price?: number;
    downloads: number | string;
    rating: number;
    previewImage: string;
    lastUpdated: string;
    fileUrl?: string;
}

/**
 * Transform backend resource data to frontend Resource interface
 */
const transformResourceData = (backendResource: BackendResource): Resource => {
    return {
        id: backendResource._id,
        title: backendResource.name,
        description: backendResource.description,
        category: (backendResource.type as any) || 'Admission Guidance', // Map type to category
        isPremium: backendResource.isPremium === 'yes',
        price: backendResource.isPremium === 'yes' ? 199 : 0, // Default price for premium
        downloads: backendResource.dowloadscnt >= 1000
            ? `${(backendResource.dowloadscnt / 1000).toFixed(1)}K+`
            : backendResource.dowloadscnt.toString(),
        rating: backendResource.rating,
        previewImage: backendResource.img || 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?w=800',
        lastUpdated: new Date(backendResource.last_updated).toISOString().split('T')[0],
        fileUrl: backendResource.fileUrl,
    };
};

/**
 * Fetch all resources from the API
 */
export const getAllResources = async (): Promise<Resource[]> => {
    try {
        const response = await apiClient.get<ApiResponse<BackendResource[]>>('/api/resources');

        if (!response.data.success || !response.data.data) {
            throw new Error('Failed to fetch resources');
        }

        // Transform and filter active resources
        const resources = response.data.data
            .filter(resource => resource.isActive)
            .map(transformResourceData);

        return resources;
    } catch (error) {
        console.error('Error fetching resources:', error);
        throw error;
    }
};

/**
 * Cache management
 */
let resourcesCache: Resource[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get resources with caching
 */
export const getResourcesWithCache = async (forceRefresh: boolean = false): Promise<Resource[]> => {
    const now = Date.now();

    // Return cached data if valid and not forcing refresh
    if (!forceRefresh && resourcesCache && (now - cacheTimestamp) < CACHE_DURATION) {
        return resourcesCache;
    }

    // Fetch fresh data
    const resources = await getAllResources();
    resourcesCache = resources;
    cacheTimestamp = now;

    return resources;
};

/**
 * Clear cache
 */
export const clearResourcesCache = (): void => {
    resourcesCache = null;
    cacheTimestamp = 0;
};
