import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Loader2, User, Building, Settings } from 'lucide-react';

const Profile = ({ translations, language, setLanguage }) => {
  const { user, updateProfile, switchRole, loading, error, clearError } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    location: '',
    company_name: '',
    company_id: '',
    trade_certifications: '',
    service_areas: '',
    language: language,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.profile?.first_name || '',
        last_name: user.profile?.last_name || '',
        phone: user.profile?.phone || '',
        location: user.profile?.location || '',
        company_name: user.profile?.company_name || '',
        company_id: user.profile?.company_id || '',
        trade_certifications: Array.isArray(user.profile?.trade_certifications) 
          ? user.profile.trade_certifications.join(', ') 
          : '',
        service_areas: Array.isArray(user.profile?.service_areas)
          ? user.profile.service_areas.join(', ')
          : '',
        language: user.language || language,
      });
    }
  }, [user, language]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) {
      clearError();
    }
    if (message) {
      setMessage('');
    }
  };

  const handleLanguageChange = (value) => {
    setProfileData(prev => ({
      ...prev,
      language: value
    }));
    setLanguage(value); // Update app language immediately
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updateData = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone: profileData.phone || null,
        location: profileData.location || null,
        language: profileData.language,
      };

      if (user.role === 'professional') {
        updateData.company_name = profileData.company_name;
        updateData.company_id = profileData.company_id || null;
        updateData.trade_certifications = profileData.trade_certifications
          ? profileData.trade_certifications.split(',').map(cert => cert.trim()).filter(cert => cert)
          : [];
        updateData.service_areas = profileData.service_areas
          ? profileData.service_areas.split(',').map(area => area.trim()).filter(area => area)
          : [];
      }

      await updateProfile(updateData);
      setIsEditing(false);
      setMessage(translations.profileUpdated);
    } catch (err) {
      // Error handled in context
    } finally {
      setIsSaving(false);
    }
  };

  const handleSwitchToProfessional = async () => {
    try {
      await switchRole('professional');
      setMessage(translations.roleUpdated);
    } catch (err) {
      // Error handled in context
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{translations.profileSettings}</h1>
        <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
      </div>

      {(message || error) && (
        <Alert className={message ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          <AlertDescription className={message ? 'text-green-800' : 'text-red-800'}>
            {message || error}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {translations.personalInfo}
          </TabsTrigger>
          {user.role === 'professional' && (
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              {translations.companyInfo}
            </TabsTrigger>
          )}
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{translations.personalInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">{translations.firstName}</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={profileData.first_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">{translations.lastName}</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={profileData.last_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">{translations.email}</Label>
                <Input
                  id="email"
                  value={user.email}
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <Label htmlFor="phone">{translations.phone}</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="location">{translations.location}</Label>
                <Input
                  id="location"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Reykjavik, Iceland"
                />
              </div>

              <div className="flex justify-between items-center pt-4">
                <div className="text-sm text-gray-600">
                  Role: <span className="font-semibold capitalize">{user.role}</span>
                </div>
                <div className="space-x-2">
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {user.role === 'professional' && (
          <TabsContent value="company" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{translations.companyInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="company_name">{translations.companyName}</Label>
                  <Input
                    id="company_name"
                    name="company_name"
                    value={profileData.company_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="company_id">{translations.companyId}</Label>
                  <Input
                    id="company_id"
                    name="company_id"
                    value={profileData.company_id}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="KT-123456789"
                  />
                </div>

                <div>
                  <Label htmlFor="trade_certifications">{translations.tradeCertifications}</Label>
                  <Input
                    id="trade_certifications"
                    name="trade_certifications"
                    value={profileData.trade_certifications}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Plumbing, Electrical, Carpentry"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate certifications with commas</p>
                </div>

                <div>
                  <Label htmlFor="service_areas">{translations.serviceAreas}</Label>
                  <Input
                    id="service_areas"
                    name="service_areas"
                    value={profileData.service_areas}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="101, 102, 103, 104"
                  />
                  <p className="text-sm text-gray-500 mt-1">Postcodes you serve, separated by commas</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language">Language / Tungumál</Label>
                <Select value={profileData.language} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="is">Íslenska</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {user.role === 'customer' && (
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-2">{translations.becomeAProfessional}</h3>
                  <p className="text-gray-600 mb-4">
                    Upgrade to a professional account to start receiving job requests and managing your business.
                  </p>
                  <Button onClick={handleSwitchToProfessional}>
                    {translations.becomeAProfessional}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;