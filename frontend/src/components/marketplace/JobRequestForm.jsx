import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Upload, X, MapPin, DollarSign, Calendar, Camera } from 'lucide-react';
import apiService from '../../services/api';

const JobRequestForm = ({ translations, language, editMode = false, existingJob = null }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    postcode: '',
    address: '',
    budget_min: '',
    budget_max: '',
    priority: 'medium',
    deadline: '',
    quote_deadline: '',
  });

  const [photos, setPhotos] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load existing job data if in edit mode
  useEffect(() => {
    if (editMode && existingJob) {
      setFormData({
        category: existingJob.category || '',
        title: existingJob.title || '',
        description: existingJob.description || '',
        postcode: existingJob.postcode || '',
        address: existingJob.address || '',
        budget_min: existingJob.budget_min || '',
        budget_max: existingJob.budget_max || '',
        priority: existingJob.priority || 'medium',
        deadline: existingJob.deadline ? new Date(existingJob.deadline).toISOString().slice(0, 16) : '',
        quote_deadline: existingJob.quote_deadline ? new Date(existingJob.quote_deadline).toISOString().slice(0, 16) : '',
      });
      setPhotos(existingJob.photos || []);
    }
  }, [editMode, existingJob]);

  // Load services for category selection
  useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesData = await apiService.getServices(language);
        setServices(servicesData || []);
      } catch (error) {
        console.error('Failed to load services:', error);
      }
    };
    loadServices();
  }, [language]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login?returnUrl=/create-job');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setError('File size must be less than 10MB');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Create preview URLs
    const newPhotos = validFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      uploaded: false
    }));

    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const removePhoto = (index) => {
    setPhotos(prev => {
      const updated = [...prev];
      // Clean up object URL
      if (updated[index].url.startsWith('blob:')) {
        URL.revokeObjectURL(updated[index].url);
      }
      updated.splice(index, 1);
      return updated;
    });
  };

  const validateForm = () => {
    if (!formData.category) {
      setError('Please select a category');
      return false;
    }
    if (!formData.title.trim()) {
      setError('Job title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Job description is required');
      return false;
    }
    if (!formData.postcode.trim()) {
      setError('Postcode is required');
      return false;
    }

    // Validate budget if provided
    const minBudget = parseFloat(formData.budget_min);
    const maxBudget = parseFloat(formData.budget_max);
    
    if (formData.budget_min && formData.budget_max && minBudget >= maxBudget) {
      setError('Maximum budget must be greater than minimum budget');
      return false;
    }

    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    
    try {
      // Prepare form data
      const jobData = {
        category: formData.category,
        title: formData.title.trim(),
        description: formData.description.trim(),
        postcode: formData.postcode.trim(),
        address: formData.address.trim() || null,
        priority: formData.priority,
      };

      // Add budget if provided
      if (formData.budget_min) {
        jobData.budget_min = parseFloat(formData.budget_min);
      }
      if (formData.budget_max) {
        jobData.budget_max = parseFloat(formData.budget_max);
      }

      // Add deadlines if provided
      if (formData.deadline) {
        jobData.deadline = new Date(formData.deadline).toISOString();
      }
      if (formData.quote_deadline) {
        jobData.quote_deadline = new Date(formData.quote_deadline).toISOString();
      }

      let result;
      if (editMode && existingJob) {
        result = await apiService.updateJobRequest(existingJob.id, jobData);
        setSuccess(translations.jobRequestUpdated);
      } else {
        result = await apiService.createJobRequest(jobData);
        setSuccess(translations.jobRequestCreated);
      }

      const jobId = result.id || existingJob?.id;

      // Upload photos if any new ones were added
      if (jobId && photos.some(p => p.file)) {
        const uploadPromises = photos
          .filter(photo => photo.file && !photo.uploaded)
          .map(photo => apiService.uploadJobPhoto(jobId, photo.file));
        
        await Promise.all(uploadPromises);
      }

      // Redirect to job detail or dashboard after success
      setTimeout(() => {
        if (editMode) {
          navigate(`/job/${jobId}`);
        } else {
          navigate('/dashboard');
        }
      }, 2000);

    } catch (error) {
      setError(error.message || translations.createJobError);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated()) {
    return null; // Will redirect
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            {editMode ? translations.edit + ' ' + translations.jobRequest : translations.createJobRequest}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitForm} className="space-y-6">
            {/* Category */}
            <div>
              <Label htmlFor="category">{translations.category} *</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={translations.selectOption} />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.key} value={service.key}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Job Title */}
            <div>
              <Label htmlFor="title">{translations.jobTitle} *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={translations.jobTitle}
                required
              />
            </div>

            {/* Job Description */}
            <div>
              <Label htmlFor="description">{translations.jobDescription} *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={translations.describeProject}
                rows={4}
                required
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postcode">{translations.postcode} *</Label>
                <Input
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  placeholder="101"
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">{translations.address}</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Laugavegur 15"
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                {translations.budget} ({translations.optional})
              </Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Input
                    name="budget_min"
                    type="number"
                    value={formData.budget_min}
                    onChange={handleInputChange}
                    placeholder={translations.budgetMin}
                    min="0"
                  />
                </div>
                <div>
                  <Input
                    name="budget_max"
                    type="number"
                    value={formData.budget_max}
                    onChange={handleInputChange}
                    placeholder={translations.budgetMax}
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Priority */}
            <div>
              <Label htmlFor="priority">{translations.priority}</Label>
              <Select value={formData.priority} onValueChange={(value) => handleSelectChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{translations.low}</SelectItem>
                  <SelectItem value="medium">{translations.medium}</SelectItem>
                  <SelectItem value="high">{translations.high}</SelectItem>
                  <SelectItem value="urgent">{translations.urgent}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Deadlines */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deadline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {translations.deadline}
                </Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="quote_deadline">{translations.quoteDeadline}</Label>
                <Input
                  id="quote_deadline"
                  name="quote_deadline"
                  type="datetime-local"
                  value={formData.quote_deadline}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Photos */}
            <div>
              <Label className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                {translations.photos}
              </Label>
              <div className="mt-2">
                <input
                  id="photo-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">{translations.dragDropFiles}</p>
                  <p className="text-xs text-gray-400">{translations.maxFileSize}</p>
                </label>
                
                {/* Photo previews */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={photo.url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                disabled={isLoading}
              >
                {translations.cancel}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 
                  (editMode ? translations.update + '...' : translations.create + '...') : 
                  (editMode ? translations.update : translations.create)
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobRequestForm;