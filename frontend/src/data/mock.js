// Mock data for the BuildConnect platform
// This data will be replaced with actual API calls once backend is implemented

export const mockServices = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    description: 'Complete plumbing solutions from repairs to installations by licensed professionals.',
    icon: 'Droplets',
    averagePrice: '$150-300',
    professionals: 2500,
    completedJobs: 12000
  },
  {
    id: 'electrical',
    name: 'Electrical',
    description: 'Safe and reliable electrical work by certified electricians for homes and businesses.',
    icon: 'Zap',
    averagePrice: '$200-500',
    professionals: 1800,
    completedJobs: 9500
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    description: 'Custom woodwork, furniture, and structural carpentry by skilled craftsmen.',
    icon: 'Hammer',
    averagePrice: '$300-800',
    professionals: 2200,
    completedJobs: 8200
  }
];

export const mockProfessionals = [
  {
    id: 1,
    name: 'Ólafur Jónsson',
    specialty: 'Plumbing',
    rating: 4.9,
    reviewsCount: 156,
    yearsExperience: 12,
    location: 'Reykjavík',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verified: true,
    insured: true,
    priceRange: '$150-300',
    completedJobs: 340
  },
  {
    id: 2,
    name: 'Sigríður Einarsdóttir',
    specialty: 'Electrical',
    rating: 4.8,
    reviewsCount: 89,
    yearsExperience: 8,
    location: 'Akureyri',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b64e5d6a?w=150&h=150&fit=crop&crop=face',
    verified: true,
    insured: true,
    priceRange: '$200-500',
    completedJobs: 145
  }
];

export const mockProjects = [
  {
    id: 1,
    title: 'Kitchen Renovation',
    description: 'Complete kitchen remodel including plumbing, electrical, and carpentry work.',
    status: 'completed',
    budget: '$15000-25000',
    location: 'Reykjavík',
    createdAt: '2024-01-15',
    completedAt: '2024-02-28',
    clientName: 'Anna Kristinsdóttir',
    professionalId: 1,
    rating: 5
  },
  {
    id: 2,
    title: 'Bathroom Repair',
    description: 'Fix leaking pipes and replace fixtures in master bathroom.',
    status: 'in_progress',
    budget: '$2000-4000',
    location: 'Hafnarfjörður',
    createdAt: '2024-02-10',
    clientName: 'Gunnar Þórsson',
    professionalId: 1,
    estimatedCompletion: '2024-03-15'
  }
];

export const mockTestimonials = [
  {
    id: 1,
    clientName: 'Sigríður Jónsdóttir',
    role: 'Homeowner',
    rating: 5,
    text: 'Excellent service! Found a reliable plumber within hours and the work was completed perfectly. Highly recommend this platform.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b64e5d6a?w=150&h=150&fit=crop&crop=face',
    projectType: 'Plumbing',
    completedDate: '2024-01-20'
  },
  {
    id: 2,
    clientName: 'Gunnar Þórsson',
    role: 'Business Owner',
    rating: 5,
    text: 'Used this service for electrical work at my office. Professional, punctual, and fair pricing. Will definitely use again.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    projectType: 'Electrical',
    completedDate: '2024-01-25'
  },
  {
    id: 3,
    clientName: 'Anna Kristinsdóttir',
    role: 'Homeowner',
    rating: 5,
    text: 'Amazing experience with our kitchen renovation. The contractor was skilled, clean, and finished on time. Thank you!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    projectType: 'Carpentry',
    completedDate: '2024-02-28'
  }
];

export const mockStats = {
  totalProjects: 50000,
  verifiedProfessionals: 15000,
  customerSatisfaction: 4.8,
  completionRate: 98
};

export const mockCategories = [
  { id: 'home-improvement', name: 'Home Improvement', projectCount: 12500 },
  { id: 'repairs', name: 'Repairs & Maintenance', projectCount: 18200 },
  { id: 'construction', name: 'Construction', projectCount: 8900 },
  { id: 'landscaping', name: 'Landscaping', projectCount: 6400 },
  { id: 'specialized', name: 'Specialized Services', projectCount: 4000 }
];

// Mock API responses for form submissions
export const mockApiResponses = {
  submitProject: {
    success: true,
    message: 'Project submitted successfully!',
    projectId: 'proj_' + Math.random().toString(36).substr(2, 9),
    estimatedQuotes: '3-5',
    expectedResponseTime: '2-4 hours'
  },
  
  registerProfessional: {
    success: true,
    message: 'Registration submitted! We will review your application within 24 hours.',
    applicationId: 'app_' + Math.random().toString(36).substr(2, 9)
  },
  
  contactSubmission: {
    success: true,
    message: 'Thank you for your message! We will get back to you within 24 hours.',
    ticketId: 'ticket_' + Math.random().toString(36).substr(2, 9)
  }
};