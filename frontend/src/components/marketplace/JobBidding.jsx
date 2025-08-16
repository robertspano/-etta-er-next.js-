import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Search,
  Filter,
  MapPin,
  DollarSign,
  Clock,
  Calendar,
  Users,
  Eye,
  FileText,
  ChevronRight,
  AlertCircle,
  Briefcase
} from 'lucide-react';
import apiService from '../../services/api';

const JobBidding = ({ translations, language }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // Filters
  const [filters, setFilters] = useState({
    category: '',
    postcode: '',
    radius: '',
    budget_min: '',
    budget_max: '',
    priority: '',
    search: ''
  });

  // Sorting
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  const categories = [
    'plumbing', 'electrical', 'carpentry', 'painting', 'roofing', 
    'heating', 'renovation', 'landscaping', 'construction'
  ];

  const priorities = ['low', 'medium', 'high', 'urgent'];

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadJobRequests();
  }, [pagination.page, sortBy, sortOrder, isAuthenticated, navigate]);

  const loadJobRequests = async () => {
    try {
      setLoading(true);
      setError('');
      
      const queryFilters = {
        page: pagination.page,
        limit: pagination.limit,
        sort_by: sortBy,
        sort_order: sortOrder,
        status: 'open', // Only show open jobs for professionals
        ...filters
      };

      // Remove empty filters
      Object.keys(queryFilters).forEach(key => {
        if (!queryFilters[key]) delete queryFilters[key];
      });

      const response = await apiService.getJobRequests(queryFilters);
      
      setJobs(response.jobs || []);
      setPagination(prev => ({
        ...prev,
        total: response.total || 0,
        totalPages: Math.ceil((response.total || 0) / prev.limit)
      }));
      
    } catch (error) {
      console.error('Failed to load job requests:', error);
      setError(error.message || 'Failed to load job requests');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    loadJobRequests();
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      postcode: '',
      radius: '',
      budget_min: '',
      budget_max: '',
      priority: '',
      search: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
    loadJobRequests();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const viewJobDetail = (jobId) => {
    navigate(`/professional/job/${jobId}`);
  };

  const submitQuote = (jobId) => {
    navigate(`/professional/quote/${jobId}`);
  };

  const formatCurrency = (amount) => {
    if (!amount) return '';
    return new Intl.NumberFormat(language === 'is' ? 'is-IS' : 'en-US', {
      style: 'currency',
      currency: 'ISK',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(language === 'is' ? 'is-IS' : 'en-US');
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'open': return 'default';
      case 'quoted': return 'secondary';
      case 'accepted': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {translations.availableJobs || 'Available Jobs'}
          </h2>
          <p className="text-gray-600 mt-1">
            {translations.findNewOpportunities || 'Find new opportunities in your service area'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Briefcase className="h-4 w-4" />
          {pagination.total} {translations.jobsAvailable || 'jobs available'}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {translations.filters || 'Filters'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <Label htmlFor="search">{translations.search}</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder={translations.searchJobs || 'Search jobs...'}
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <Label>{translations.category}</Label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={translations.selectCategory || 'All Categories'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {translations[`services_${category}`] || category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Postcode + Radius */}
            <div>
              <Label htmlFor="postcode">{translations.postcode}</Label>
              <div className="flex gap-2">
                <Input
                  id="postcode"
                  placeholder="101"
                  value={filters.postcode}
                  onChange={(e) => handleFilterChange('postcode', e.target.value)}
                  className="flex-1"
                />
                <Select value={filters.radius} onValueChange={(value) => handleFilterChange('radius', value)}>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Km" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="5">5km</SelectItem>
                    <SelectItem value="10">10km</SelectItem>
                    <SelectItem value="25">25km</SelectItem>
                    <SelectItem value="50">50km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Priority */}
            <div>
              <Label>{translations.priority}</Label>
              <Select value={filters.priority} onValueChange={(value) => handleFilterChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={translations.allPriorities || 'All Priorities'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {priorities.map(priority => (
                    <SelectItem key={priority} value={priority}>
                      {translations[priority] || priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Budget Range */}
            <div>
              <Label>{translations.budgetRange || 'Budget Range'}</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Min ISK"
                  type="number"
                  value={filters.budget_min}
                  onChange={(e) => handleFilterChange('budget_min', e.target.value)}
                />
                <Input
                  placeholder="Max ISK"
                  type="number"
                  value={filters.budget_max}
                  onChange={(e) => handleFilterChange('budget_max', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="flex gap-2">
              <Button onClick={applyFilters}>
                {translations.applyFilters || 'Apply Filters'}
              </Button>
              <Button variant="outline" onClick={resetFilters}>
                {translations.reset || 'Reset'}
              </Button>
            </div>
            
            {/* Sorting */}
            <div className="flex items-center gap-2">
              <Label className="text-sm">{translations.sortBy || 'Sort by'}:</Label>
              <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                const [field, order] = value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at-desc">{translations.newest || 'Newest'}</SelectItem>
                  <SelectItem value="created_at-asc">{translations.oldest || 'Oldest'}</SelectItem>
                  <SelectItem value="budget_max-desc">{translations.highestBudget || 'Highest Budget'}</SelectItem>
                  <SelectItem value="budget_max-asc">{translations.lowestBudget || 'Lowest Budget'}</SelectItem>
                  <SelectItem value="priority-desc">{translations.highestPriority || 'Highest Priority'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {translations.noJobsFound || 'No jobs found'}
              </h3>
              <p className="text-gray-600 text-center max-w-md">
                {translations.noJobsFoundDesc || 'Try adjusting your filters or check back later for new opportunities.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <Badge variant={getStatusBadgeVariant(job.status)}>
                        {translations[job.status] || job.status}
                      </Badge>
                      <Badge variant={getPriorityBadgeVariant(job.priority)}>
                        {translations[job.priority] || job.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => viewJobDetail(job.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      {translations.view}
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => submitQuote(job.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      {translations.submitQuote}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span><strong>{translations.location}:</strong> {job.postcode}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span><strong>{translations.budget}:</strong> 
                      {job.budget_min && job.budget_max ? 
                        `${formatCurrency(job.budget_min)} - ${formatCurrency(job.budget_max)}` :
                        formatCurrency(job.budget_min || job.budget_max || 0)
                      }
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span><strong>{translations.quotes}:</strong> {job.quote_count || 0}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span><strong>{translations.posted}:</strong> {formatDate(job.created_at)}</span>
                  </div>
                </div>

                {job.deadline && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2 text-sm text-orange-600">
                      <Clock className="h-4 w-4" />
                      <span><strong>{translations.deadline}:</strong> {formatDate(job.deadline)}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {translations.showing} {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} {translations.of} {pagination.total}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                >
                  {translations.previous || 'Previous'}
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={pagination.page === pageNum ? "default" : "outline"}
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  {pagination.totalPages > 5 && (
                    <>
                      <span className="px-2">...</span>
                      <Button
                        variant={pagination.page === pagination.totalPages ? "default" : "outline"}
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setPagination(prev => ({ ...prev, page: pagination.totalPages }))}
                      >
                        {pagination.totalPages}
                      </Button>
                    </>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                >
                  {translations.next || 'Next'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobBidding;