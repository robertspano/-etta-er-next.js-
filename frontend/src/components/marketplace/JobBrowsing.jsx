import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Search, 
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  Eye,
  Clock,
  ChevronLeft,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import apiService from '../../services/api';

const JobBrowsing = ({ translations, language }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [jobRequests, setJobRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filter state
  const [filters, setFilters] = useState({
    category: '',
    postcode: '',
    search: '',
    budget_min: '',
    budget_max: '',
    priority: '',
    status: 'open' // Default to open jobs only
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadJobRequests(currentPage);
  }, [currentPage, filters, isAuthenticated, navigate]);

  const loadJobRequests = async (page = 1) => {
    try {
      setLoading(true);
      setError('');
      
      // Prepare filters for API call
      const requestFilters = {
        page: page,
        limit: itemsPerPage,
        professional_view: true // This tells the API we want jobs visible to professionals
      };
      
      // Add filters if they have values
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          requestFilters[key] = filters[key];
        }
      });
      
      const response = await apiService.getJobRequests(requestFilters);
      setJobRequests(response?.items || response || []);
      
      // Update pagination info
      if (response?.total) {
        setTotalPages(Math.ceil(response.total / itemsPerPage));
      } else {
        setTotalPages(1);
      }
      
    } catch (error) {
      console.error('Failed to load job requests:', error);
      setError(error.message || 'Failed to load job requests');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(language === 'is' ? 'is-IS' : 'en-US');
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat(language === 'is' ? 'is-IS' : 'en-US', {
      style: 'currency',
      currency: 'ISK',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'open': return 'secondary';
      case 'quoted': return 'outline';
      case 'accepted': return 'default';
      case 'in_progress': return 'default';
      case 'completed': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {translations.availableJobs || 'Available Jobs'}
          </h1>
          <p className="text-gray-600 mt-2">
            {translations.browseJobsDescription || 'Browse and bid on construction projects in your area'}
          </p>
        </div>
        <Link to="/dashboard">
          <Button variant="outline">
            {translations.backToDashboard || 'Back to Dashboard'}
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {translations.filter || 'Filter Jobs'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder={translations.search + ' jobs...'}
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder={translations.category} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="plumbing">{translations.services_plumbing || 'Plumbing'}</SelectItem>
                <SelectItem value="electrical">{translations.services_electrical || 'Electrical'}</SelectItem>
                <SelectItem value="carpentry">{translations.services_carpentry || 'Carpentry'}</SelectItem>
                <SelectItem value="painting">{translations.services_painting || 'Painting'}</SelectItem>
                <SelectItem value="roofing">{translations.services_roofing || 'Roofing'}</SelectItem>
                <SelectItem value="heating">{translations.services_heating || 'Heating'}</SelectItem>
                <SelectItem value="renovation">{translations.services_renovation || 'Renovation'}</SelectItem>
                <SelectItem value="landscaping">{translations.services_landscaping || 'Landscaping'}</SelectItem>
                <SelectItem value="construction">{translations.services_construction || 'Construction'}</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Location Filter */}
            <Input
              placeholder={translations.postcode}
              value={filters.postcode}
              onChange={(e) => handleFilterChange('postcode', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Priority Filter */}
            <Select value={filters.priority} onValueChange={(value) => handleFilterChange('priority', value)}>
              <SelectTrigger>
                <SelectValue placeholder={translations.priority} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Priorities</SelectItem>
                <SelectItem value="urgent">{translations.urgent}</SelectItem>
                <SelectItem value="high">{translations.high}</SelectItem>
                <SelectItem value="medium">{translations.medium}</SelectItem>
                <SelectItem value="low">{translations.low}</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Budget Range */}
            <Input
              type="number"
              placeholder={translations.budgetMin + ' (ISK)'}
              value={filters.budget_min}
              onChange={(e) => handleFilterChange('budget_min', e.target.value)}
            />
            <Input
              type="number"
              placeholder={translations.budgetMax + ' (ISK)'}
              value={filters.budget_max}
              onChange={(e) => handleFilterChange('budget_max', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600">
              {jobRequests.length === 0 ? 
                'No jobs found' : 
                `Showing ${jobRequests.length} job${jobRequests.length !== 1 ? 's' : ''}`
              }
              {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </div>
          </div>

          {/* Job Listings */}
          {jobRequests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {translations.noJobsFound || 'No jobs found'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {translations.noJobsFoundDescription || 'Try adjusting your filters to see more job opportunities.'}
                </p>
                <Button onClick={() => setFilters({ category: '', postcode: '', search: '', budget_min: '', budget_max: '', priority: '', status: 'open' })}>
                  {translations.clearFilters || 'Clear Filters'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobRequests.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadgeVariant(job.status)}>
                          {translations[job.status] || job.status}
                        </Badge>
                        <Badge variant={getPriorityBadgeVariant(job.priority)}>
                          {translations[job.priority] || job.priority}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {job.views_count || 0}
                      </span>
                    </div>
                    
                    {/* Title & Category */}
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{job.title}</h3>
                    <p className="text-sm text-gray-600 capitalize mb-3">{job.category}</p>
                    
                    {/* Description */}
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{job.description}</p>
                    
                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{job.postcode}</span>
                        {job.address && <span>• {job.address}</span>}
                      </div>
                      
                      {(job.budget_min || job.budget_max) && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          <span>
                            {job.budget_min && job.budget_max ? 
                              `${formatCurrency(job.budget_min)} - ${formatCurrency(job.budget_max)}` :
                              formatCurrency(job.budget_min || job.budget_max)
                            }
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{translations.posted || 'Posted'}: {formatDate(job.posted_at)}</span>
                      </div>
                      
                      {job.quote_deadline && (
                        <div className="flex items-center gap-2 text-sm text-orange-600">
                          <Clock className="h-4 w-4" />
                          <span>{translations.quoteDeadline}: {formatDate(job.quote_deadline)}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Photos indicator */}
                    {job.photos && job.photos.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <span>📷 {job.photos.length} photo{job.photos.length !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link to={`/professional/job/${job.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          {translations.viewDetails || 'View Details'}
                        </Button>
                      </Link>
                      <Link to={`/professional/job/${job.id}/quote`}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          {translations.submitQuote || 'Submit Quote'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobBrowsing;