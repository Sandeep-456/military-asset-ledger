
import React from 'react';

const MetricCard = ({ title, value, subtitle, icon: Icon, color = 'green', onClick }) => {
  const colorClasses = {
    green: 'bg-green-900 border-green-700 text-green-100',
    blue: 'bg-blue-900 border-blue-700 text-blue-100',
    yellow: 'bg-yellow-900 border-yellow-700 text-yellow-100',
    red: 'bg-red-900 border-red-700 text-red-100',
    purple: 'bg-purple-900 border-purple-700 text-purple-100'
  };

  const iconColorClasses = {
    green: 'text-green-400',
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
    red: 'text-red-400',
    purple: 'text-purple-400'
  };

  return (
    <div 
      className={`p-6 rounded-lg border-2 ${colorClasses[color]} ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && <p className="text-sm opacity-60 mt-1">{subtitle}</p>}
        </div>
        {Icon && <Icon className={`h-8 w-8 ${iconColorClasses[color]}`} />}
      </div>
    </div>
  );
};

export default MetricCard;
