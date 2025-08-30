import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Loader2, AlertCircle } from 'lucide-react';
import { useIncidents } from '../context/IncidentContext';
import LoadingSpinner from '../components/LoadingSpinner';

const CreateIncident = () => {
  const navigate = useNavigate();
  const { createIncident, loading } = useIncidents();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    affected_service: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (!formData.affected_service.trim()) {
      newErrors.affected_service = 'Affected service is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newIncident = await createIncident(formData);
      navigate(`/incidents/${newIncident.id}`);
    } catch (error) {
      console.error('Error creating incident:', error);
      // Error is already handled by the context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={handleCancel}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Incident</h1>
          <p className="text-gray-600 mt-1">
            Submit a new incident for AI-powered analysis and triage
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Incident Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`input-field ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Brief description of the incident"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Detailed description of the incident, including any error messages, symptoms, and impact on users or services"
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.description.length}/1000 characters
            </p>
          </div>

          {/* Affected Service */}
          <div>
            <label htmlFor="affected_service" className="block text-sm font-medium text-gray-700 mb-2">
              Affected Service *
            </label>
            <input
              type="text"
              id="affected_service"
              name="affected_service"
              value={formData.affected_service}
              onChange={handleInputChange}
              className={`input-field ${errors.affected_service ? 'border-red-500' : ''}`}
              placeholder="e.g., User Authentication Service, Database, API Gateway"
              disabled={isSubmitting}
            />
            {errors.affected_service && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.affected_service}
              </p>
            )}
          </div>

          {/* AI Processing Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Loader2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-900">
                  AI-Powered Analysis
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  After submission, our AI will automatically analyze your incident and provide:
                </p>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• Severity classification (Low, Medium, High, Critical)</li>
                  <li>• Category identification (Network, Software, Hardware, etc.)</li>
                  <li>• Intelligent insights for faster resolution</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="btn-primary flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Create Incident</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIncident;
