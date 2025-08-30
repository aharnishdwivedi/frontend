import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight } from 'lucide-react';
import SeverityBadge from './SeverityBadge';
import CategoryBadge from './CategoryBadge';

const IncidentCard = ({ incident }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {incident.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {truncateText(incident.description)}
          </p>
        </div>
        <Link
          to={`/incidents/${incident.id}`}
          className="ml-4 p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <SeverityBadge severity={incident.ai_severity} />
          <CategoryBadge category={incident.ai_category} />
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {formatDate(incident.created_at)}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <User className="w-4 h-4 mr-1" />
          <span>Service: {incident.affected_service}</span>
        </div>
        <Link
          to={`/incidents/${incident.id}`}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default IncidentCard;
