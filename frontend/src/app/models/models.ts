export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'worker' | 'employer';
  phone?: string;
  barangay: string;
  municipality: string;
  avatar?: string;
  isActive: boolean;
  // Worker
  skills?: string[];
  availability?: 'full-time' | 'part-time' | 'weekends' | 'flexible';
  bio?: string;
  experience?: string;
  dailyRate?: number;
  // Employer
  businessName?: string;
  businessType?: string;
  // Stats
  averageRating?: number;
  totalRatings?: number;
  completedJobs?: number;
  createdAt?: string;
}

export interface Job {
  _id: string;
  employer: User | string;
  title: string;
  description: string;
  category: string;
  skillsRequired: string[];
  barangay: string;
  municipality: string;
  payType: 'daily' | 'weekly' | 'monthly' | 'fixed';
  payAmount: number;
  duration: string;
  startDate?: string;
  slots: number;
  status: 'open' | 'in-progress' | 'filled' | 'closed';
  applicants?: User[];
  hiredWorkers?: User[];
  views: number;
  createdAt: string;
}

export interface Application {
  _id: string;
  job: Job | string;
  worker: User | string;
  employer: User | string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  completedAt?: string;
  createdAt: string;
}

export interface Notification {
  _id: string;
  recipient: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  data?: any;
  createdAt: string;
}

export interface Rating {
  _id: string;
  application: string;
  rater: User;
  ratee: string;
  score: number;
  comment?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  message?: string;
  [key: string]: any;
}

export const JOB_CATEGORIES = [
  { value: 'construction', label: 'Construction' },
  { value: 'domestic', label: 'Domestic / Household' },
  { value: 'agriculture', label: 'Agriculture / Farming' },
  { value: 'driving', label: 'Driving / Transport' },
  { value: 'electrical', label: 'Electrical Work' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'carpentry', label: 'Carpentry' },
  { value: 'laundry', label: 'Laundry' },
  { value: 'cooking', label: 'Cooking / Food Prep' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'gardening', label: 'Gardening' },
  { value: 'security', label: 'Security / Watchman' },
  { value: 'other', label: 'Other' },
];

export const PAMPANGA_BARANGAYS = [
  'San Fernando', 'Angeles City', 'Mabalacat', 'Clark', 'Mexico',
  'Lubao', 'Guagua', 'Macabebe', 'Masantol', 'Porac', 'Floridablanca',
  'Sasmuan', 'Candaba', 'Arayat', 'San Simon', 'Bacolor',
  'Magalang', 'Sta. Ana', 'Sta. Rita', 'Sto. Tomas', 'San Luis',
  'Minalin', 'Pampanga', 'Other'
];

export const SKILL_SUGGESTIONS = [
  'Carpentry', 'Electrical', 'Plumbing', 'Painting', 'Welding',
  'Masonry', 'Farming', 'Cooking', 'Laundry', 'Cleaning',
  'Driving', 'Gardening', 'Security', 'Delivery', 'Childcare',
  'Elderly Care', 'Animal Care', 'Construction', 'Tailoring'
];
