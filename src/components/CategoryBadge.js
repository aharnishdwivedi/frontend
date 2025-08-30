import React from 'react';
import { 
  Wifi, 
  Monitor, 
  HardDrive, 
  Shield, 
  Database, 
  Code, 
  Server 
} from 'lucide-react';

const CategoryBadge = ({ category, className = '' }) => {
  const getCategoryConfig = (category) => {
    const configs = {
      network: {
        icon: Wifi,
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        borderColor: 'border-blue-200',
        iconColor: 'text-blue-600',
      },
      software: {
        icon: Code,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800',
        borderColor: 'border-purple-200',
        iconColor: 'text-purple-600',
      },
      hardware: {
        icon: HardDrive,
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-200',
        iconColor: 'text-gray-600',
      },
      security: {
        icon: Shield,
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-200',
        iconColor: 'text-red-600',
      },
      database: {
        icon: Database,
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-200',
        iconColor: 'text-green-600',
      },
      application: {
        icon: Monitor,
        bgColor: 'bg-indigo-100',
        textColor: 'text-indigo-800',
        borderColor: 'border-indigo-200',
        iconColor: 'text-indigo-600',
      },
      infrastructure: {
        icon: Server,
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-800',
        borderColor: 'border-orange-200',
        iconColor: 'text-orange-600',
      },
    };

    return configs[category.toLowerCase()] || configs.application;
  };

  const config = getCategoryConfig(category);
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
      <span className="capitalize">{category}</span>
    </span>
  );
};

export default CategoryBadge;
