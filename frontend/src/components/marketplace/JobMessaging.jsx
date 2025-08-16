import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  Image, 
  File, 
  X,
  Download,
  User,
  Clock
} from 'lucide-react';
import apiService from '../../services/api';

const JobMessaging = ({ translations, language }) => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [jobRequest, setJobRequest] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadMessagingData();
  }, [jobId, isAuthenticated, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessagingData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load job request details
      const jobData = await apiService.getJobRequest(jobId);
      setJobRequest(jobData);
      
      // Load messages for this job
      const messagesData = await apiService.getJobMessages(jobId);
      setMessages(messagesData || []);
      
    } catch (error) {
      console.error('Failed to load messaging data:', error);
      setError(error.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleFileAttachment = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size must be less than 10MB');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Create preview objects
    const newAttachments = validFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      size: file.size
    }));

    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => {
      const updated = [...prev];
      // Clean up object URL
      if (updated[index].url.startsWith('blob:')) {
        URL.revokeObjectURL(updated[index].url);
      }
      updated.splice(index, 1);
      return updated;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const sendMessage = async () => {
    if (!newMessage.trim() && attachments.length === 0) {
      setError('Please enter a message or attach a file');
      return;
    }

    try {
      setSending(true);
      setError('');

      const messageData = {
        job_id: jobId,
        content: newMessage.trim(),
        message_type: 'text'
      };

      // Upload attachments first if any
      if (attachments.length > 0) {
        const uploadPromises = attachments.map(async (attachment) => {
          try {
            const uploadResult = await apiService.uploadMessageAttachment(attachment.file);
            return {
              url: uploadResult.url,
              filename: attachment.name,
              content_type: attachment.type,
              size: attachment.size
            };
          } catch (error) {
            console.error('Failed to upload attachment:', error);
            throw error;
          }
        });

        const uploadedAttachments = await Promise.all(uploadPromises);
        messageData.attachments = uploadedAttachments;
        messageData.message_type = 'file';
      }

      // Send the message
      await apiService.sendMessage(messageData);
      
      // Clear form
      setNewMessage('');
      setAttachments([]);
      
      // Reload messages
      await loadMessagingData();
      
      setSuccess(translations.messageSent || 'Message sent successfully!');
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (error) {
      setError(error.message || translations.sendMessageError || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      sendMessage();
    }
  };

  const formatMessageTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString(language === 'is' ? 'is-IS' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleDateString(language === 'is' ? 'is-IS' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const isImageFile = (contentType) => {
    return contentType && contentType.startsWith('image/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!jobRequest) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Request Not Found</h1>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => navigate(`/job/${jobId}`)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {translations.backToJob || 'Back to Job'}
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{jobRequest.title}</h1>
          <p className="text-gray-600">{translations.jobConversation || 'Job Conversation'}</p>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="border-green-200 bg-green-50 mb-6">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        {/* Messages List */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {translations.noMessagesYet || 'No messages yet. Start the conversation!'}
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender_id === user.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {/* Sender info for received messages */}
                  {message.sender_id !== user.id && (
                    <div className="flex items-center gap-2 mb-1 text-xs text-gray-600">
                      <User className="h-3 w-3" />
                      <span>{message.sender_name || 'Professional'}</span>
                    </div>
                  )}
                  
                  {/* Message content */}
                  {message.content && (
                    <div className="mb-2">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  )}
                  
                  {/* Attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="space-y-2">
                      {message.attachments.map((attachment, index) => (
                        <div key={index} className="border rounded p-2 bg-white/10">
                          {isImageFile(attachment.content_type) ? (
                            <img
                              src={attachment.url}
                              alt={attachment.filename}
                              className="max-w-xs rounded cursor-pointer"
                              onClick={() => window.open(attachment.url, '_blank')}
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <File className="h-4 w-4" />
                              <span className="text-sm">{attachment.filename}</span>
                              <span className="text-xs opacity-75">
                                ({formatFileSize(attachment.size)})
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => window.open(attachment.url, '_blank')}
                                className="p-1 h-auto"
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Timestamp */}
                  <div className={`text-xs mt-1 ${
                    message.sender_id === user.id ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    <Clock className="h-3 w-3 inline mr-1" />
                    {formatMessageTime(message.sent_at)}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Message Input */}
        <div className="border-t p-4">
          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium mb-2">{translations.attachments || 'Attachments'}:</h4>
              <div className="space-y-2">
                {attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                    {isImageFile(attachment.type) ? (
                      <div className="flex items-center gap-2">
                        <Image className="h-4 w-4 text-blue-600" />
                        <img 
                          src={attachment.url} 
                          alt={attachment.name}
                          className="h-8 w-8 object-cover rounded"
                        />
                      </div>
                    ) : (
                      <File className="h-4 w-4 text-gray-600" />
                    )}
                    <span className="text-sm flex-1">{attachment.name}</span>
                    <span className="text-xs text-gray-500">
                      ({formatFileSize(attachment.size)})
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeAttachment(index)}
                      className="p-1 h-auto text-red-600 hover:text-red-700"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={translations.typeMessage || 'Type your message... (Ctrl+Enter to send)'}
                rows={3}
                disabled={sending}
                className="resize-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileAttachment}
                multiple
                className="hidden"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={sending}
                title={translations.attachFile || 'Attach File'}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                onClick={sendMessage}
                disabled={sending || (!newMessage.trim() && attachments.length === 0)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {sending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            {translations.messageHint || 'Press Ctrl+Enter to send. Max file size: 10MB'}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default JobMessaging;