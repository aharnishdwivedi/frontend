import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, RefreshCw, AlertTriangle } from 'lucide-react';
import { useIncidents } from '../context/IncidentContext';
import IncidentCard from '../components/IncidentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SeverityBadge from '../components/SeverityBadge';
import CategoryBadge from '../components/CategoryBadge';

const Dashboard = () => {
  const { incidents, loading, error, fetchIncidents } = useIncidents();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Filter incidents based on search and filters
  const filteredIncidents = useMemo(() => {
    return incidents.filter(incident => {
      const matchesSearch = 
        incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.affected_service.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeverity = !severityFilter || 
        incident.ai_severity.toLowerCase() === severityFilter.toLowerCase();
      
      const matchesCategory = !categoryFilter || 
        incident.ai_category.toLowerCase() === categoryFilter.toLowerCase();
      
      return matchesSearch && matchesSeverity && matchesCategory;
    });
  }, [incidents, searchTerm, severityFilter, categoryFilter]);

  // Get unique values for filters
  const severities = [...new Set(incidents.map(i => i.ai_severity))];
  const categories = [...new Set(incidents.map(i => i.ai_category))];

  // Statistics
  const stats = useMemo(() => {
    const total = incidents.length;
    const critical = incidents.filter(i => i.ai_severity === 'Critical').length;
    const high = incidents.filter(i => i.ai_severity === 'High').length;
    const medium = incidents.filter(i => i.ai_severity === 'Medium').length;
    const low = incidents.filter(i => i.ai_severity === 'Low').length;

    return { total, critical, high, medium, low };
  }, [incidents]);

  const handleRefresh = () => {
    fetchIncidents();
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Incidents</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Incident Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all incidents with AI-powered insights
          </p>
        </div>
        <Link
          to="/incidents/new"
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Incident</span>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Incidents</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
          <div className="text-sm text-gray-600">Critical</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.high}</div>
          <div className="text-sm text-gray-600">High</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.medium}</div>
          <div className="text-sm text-gray-600">Medium</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{stats.low}</div>
          <div className="text-sm text-gray-600">Low</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Severity Filter */}
          <div className="lg:w-48">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Severities</option>
              {severities.map(severity => (
                <option key={severity} value={severity}>
                  {severity}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="lg:w-48">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="btn-secondary flex items-center justify-center space-x-2 lg:w-auto"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredIncidents.length} of {incidents.length} incidents
        </p>
        {(searchTerm || severityFilter || categoryFilter) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSeverityFilter('');
              setCategoryFilter('');
            }}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Incidents List */}
      {loading ? (
        <div className="flex items-center justify-center min-h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredIncidents.length === 0 ? (
        <div className="card text-center py-12">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {incidents.length === 0 ? 'No incidents yet' : 'No incidents match your filters'}
          </h3>
          <p className="text-gray-600 mb-4">
            {incidents.length === 0 
              ? 'Create your first incident to get started'
              : 'Try adjusting your search or filters'
            }
          </p>
          {incidents.length === 0 && (
            <Link to="/incidents/new" className="btn-primary">
              Create First Incident
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredIncidents.map(incident => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
