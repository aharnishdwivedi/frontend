import React from 'react';
import { AlertTriangle, AlertCircle, AlertOctagon, XCircle } from 'lucide-react';

const SeverityBadge = ({ severity, className = '' }) => {
  const getSeverityConfig = (severity) => {
    const configs = {
      low: {
        icon: AlertTriangle,
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-200',
        iconColor: 'text-green-600',
      },
      medium: {
        icon: AlertCircle,
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        borderColor: 'border-yellow-200',
        iconColor: 'text-yellow-600',
      },
      high: {
        icon: AlertOctagon,
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-200',
        iconColor: 'text-red-600',
      },
      critical: {
        icon: XCircle,
        bgColor: 'bg-red-900',
        textColor: 'text-white',
        borderColor: 'border-red-800',
        iconColor: 'text-red-200',
      },
    };

    return configs[severity.toLowerCase()] || configs.low;
  };

  const config = getSeverityConfig(severity);
  const IconComponent = config.icon;

  return (
    <span
      className={`
        inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium border
        ${config.bgColor} ${config.textColor} ${config.borderColor} ${config.iconColor}
        ${className}
      `}
    >
      <IconComponent className="w-3 h-3" />
      <span className="capitalize">{severity}</span>
    </span>
  );
};

export default SeverityBadge;
