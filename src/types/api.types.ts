// TypeScript interfaces for API responses

// ========== COLLEGE TYPES ==========

// Backend College Schema (as stored in MongoDB)
export interface BackendCollege {
    _id: string;
    college_name: string;
    college_id: string;
    location: string;
    establishment_year: number;
    highlight: string[];
    Pros: string[];
    Cons: string[];
    about_college: string;
    mentors_fromcollege: string[]; // Array of mentor IDs
    avlaible_numberofmentors: number;
    college_img: string;
    whatsappLink?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Backend Team Member Schema (for mentor details)
export interface BackendTeamMember {
    _id: string;
    name: string;
    role: string;
    image: string;
    bio?: string;
    socialLinks?: {
        linkedin?: string;
        instagram?: string;
        github?: string;
        twitter?: string;
    };
    order?: number;
    isActive: boolean;
}

// API Response wrapper
export interface ApiResponse<T> {
    success: boolean;
    count?: number;
    data: T;
    message?: string;
}

// Error response
export interface ApiError {
    success: false;
    message: string;
    error?: string;
}

// ========== TEAM MEMBER TYPES ==========

export interface BackendTeamMemberFull {
    _id: string;
    name: string;
    college_name: string;
    year_academic: string;
    Role: 'Founder' | 'Executive' | 'Core' | 'mentor' | 'collegeHead';
    branch: string;
    Tagline: string;
    LinkedinURL: string;
    photo: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// ========== RESOURCE TYPES ==========

export interface BackendResource {
    _id: string;
    name: string;
    description: string;
    dowloadscnt: number;
    isPremium: 'yes' | 'No';
    img: string;
    fileUrl?: string;
    type: string;
    rating: number;
    last_updated: Date;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// ========== EVENT TYPES ==========

export interface BackendEvent {
    _id: string;
    event_name: string;
    description: string;
    dateofevent: Date;
    timeofevent: string;
    speaker_name: string;
    company_name: string;
    link: string;
    type: 'upcoming' | 'past';
    event_img: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
