# BuildConnect - Construction Services Marketplace Platform
## API Contracts & Implementation Plan

### Overview
This document outlines the API contracts, data models, and integration plan for converting the current frontend-only application into a full-stack construction services marketplace platform.

### Current Frontend Implementation
- **Language Support**: Icelandic (is) and English (en) with dynamic switching
- **Main Sections**: Hero, Services, How It Works, Stats, Testimonials, Footer
- **Key Features**: Project submission form, service categories, professional listings
- **Styling**: Blue color scheme with glassmorphism effects, responsive design

### Mock Data Currently Used
The following data is currently mocked in `/app/frontend/src/data/mock.js`:

1. **Services**: 9 service categories (plumbing, electrical, carpentry, etc.)
2. **Professionals**: Professional profiles with ratings, experience, location
3. **Projects**: Sample projects with status, budget, timeline
4. **Testimonials**: Customer reviews and ratings
5. **Stats**: Platform statistics (50k+ projects, 15k+ professionals, 4.8 rating)
6. **Categories**: Service categories with project counts

---

## API Contracts

### 1. Authentication & User Management

#### POST /api/auth/register
```json
{
  "userType": "client|professional",
  "email": "user@example.com",
  "password": "hashedPassword",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+354-555-0123",
  "language": "en|is"
}
```

#### POST /api/auth/login
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

#### GET /api/auth/profile
Returns user profile data

### 2. Project Management

#### POST /api/projects
```json
{
  "serviceType": "plumbing|electrical|carpentry|etc",
  "title": "Kitchen Renovation",
  "description": "Complete kitchen remodel...",
  "location": "Reykjavík",
  "budget": "15000-25000",
  "urgency": "immediate|within_week|within_month|flexible",
  "images": ["image1.jpg", "image2.jpg"],
  "clientId": "user_id"
}
```

#### GET /api/projects
Get projects list with filters

#### GET /api/projects/:id
Get specific project details

#### PUT /api/projects/:id/status
Update project status

### 3. Professional Management

#### POST /api/professionals
```json
{
  "userId": "user_id",
  "specialties": ["plumbing", "heating"],
  "experience": 12,
  "location": "Reykjavík",
  "priceRange": "150-300",
  "certifications": ["license1.pdf"],
  "insurance": "insurance_doc.pdf",
  "portfolio": ["work1.jpg", "work2.jpg"]
}
```

#### GET /api/professionals
Get professionals list with filters

#### GET /api/professionals/:id
Get professional profile

### 4. Quote Management

#### POST /api/quotes
```json
{
  "projectId": "project_id",
  "professionalId": "professional_id",
  "price": 2500,
  "timeline": "2-3 weeks",
  "description": "Detailed work description",
  "materials": "Included|Excluded"
}
```

#### GET /api/quotes/project/:projectId
Get quotes for a project

#### PUT /api/quotes/:id/accept
Accept a quote

### 5. Review System

#### POST /api/reviews
```json
{
  "projectId": "project_id",
  "professionalId": "professional_id",
  "rating": 5,
  "title": "Excellent work!",
  "description": "Very professional and clean work.",
  "images": ["result1.jpg"]
}
```

#### GET /api/reviews/professional/:id
Get professional reviews

### 6. Platform Statistics

#### GET /api/stats
Returns platform statistics for homepage

---

## Database Models

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  passwordHash: String,
  userType: "client|professional",
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    location: String,
    avatar: String
  },
  language: "en|is",
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Projects Collection
```javascript
{
  _id: ObjectId,
  clientId: ObjectId,
  title: String,
  description: String,
  serviceType: String,
  location: String,
  budget: String,
  urgency: String,
  status: "open|quoted|in_progress|completed|cancelled",
  images: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Professionals Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  specialties: [String],
  experience: Number,
  location: String,
  priceRange: String,
  rating: Number,
  reviewCount: Number,
  completedJobs: Number,
  isVerified: Boolean,
  isInsured: Boolean,
  certifications: [String],
  portfolio: [String],
  createdAt: Date
}
```

### Quotes Collection
```javascript
{
  _id: ObjectId,
  projectId: ObjectId,
  professionalId: ObjectId,
  price: Number,
  timeline: String,
  description: String,
  materials: String,
  status: "pending|accepted|rejected|expired",
  createdAt: Date,
  expiresAt: Date
}
```

### Reviews Collection
```javascript
{
  _id: ObjectId,
  projectId: ObjectId,
  professionalId: ObjectId,
  clientId: ObjectId,
  rating: Number,
  title: String,
  description: String,
  images: [String],
  isVerified: Boolean,
  createdAt: Date
}
```

---

## Frontend Integration Plan

### Phase 1: Replace Mock Data
1. Replace `mock.js` data with actual API calls
2. Implement API service layer (`/src/services/api.js`)
3. Add loading states and error handling
4. Update form submissions to use real endpoints

### Phase 2: Authentication
1. Add login/register pages
2. Implement user context
3. Add protected routes
4. Update header to show user info

### Phase 3: Enhanced Features
1. Professional dashboard
2. Client project management
3. Real-time notifications
4. File upload functionality

### API Service Structure
```javascript
// /src/services/api.js
class ApiService {
  async submitProject(projectData) {
    // Replace mock response
    return fetch(`${API_BASE}/projects`, {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
  }
  
  async getServices() {
    // Replace mockServices
    return fetch(`${API_BASE}/services`);
  }
  
  // ... other methods
}
```

### Form Integration Updates
- Update Hero component project submission
- Add proper validation and error handling
- Show real-time feedback during submission
- Connect language switching to user preferences

---

## Business Logic Implementation

### Matching Algorithm
- Location-based matching
- Specialty matching
- Availability scoring
- Rating and review weighting

### Notification System
- Email notifications for new projects
- SMS alerts for urgent projects
- In-app messaging system

### Payment Integration
- Secure payment processing
- Escrow service for project funds
- Professional fee management

### Quality Assurance
- Professional verification process
- Insurance validation
- Review authenticity checks

---

## Security Considerations

- JWT token authentication
- Input validation and sanitization
- Rate limiting for API endpoints
- File upload security (image processing)
- Professional background checks
- Secure payment processing

---

## Deployment & Scaling

- MongoDB indexing strategy
- API response caching
- Image optimization and CDN
- Mobile app considerations
- Multi-language SEO optimization

This implementation plan ensures a smooth transition from the current frontend-only application to a fully functional construction services marketplace platform while maintaining the existing user experience and design.