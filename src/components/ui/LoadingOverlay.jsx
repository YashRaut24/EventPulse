import React from 'react';
import Icon from '../AppIcon';

const LoadingOverlay = ({ 
  isLoading = false, 
  message = 'Loading...', 
  type = 'spinner', // 'spinner' | 'skeleton' | 'pulse'
  className = '',
  children 
}) => {
  if (!isLoading && !children) {
    return null;
  }

  const SpinnerLoader = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin">
        <Icon name="Loader2" size={32} className="text-primary" />
      </div>
      <p className="text-sm text-muted-foreground font-medium">{message}</p>
    </div>
  );

  const SkeletonLoader = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(6)]?.map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-32 bg-muted rounded-lg animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PulseLoader = () => (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <span className="ml-3 text-sm text-muted-foreground font-medium">{message}</span>
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case 'skeleton':
        return <SkeletonLoader />;
      case 'pulse':
        return <PulseLoader />;
      default:
        return <SpinnerLoader />;
    }
  };

  if (children) {
    return (
      <div className={`relative ${className}`}>
        {children}
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
            <div className="bg-card p-6 rounded-lg shadow-modal border border-border">
              {renderLoader()}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      {renderLoader()}
    </div>
  );
};

export default LoadingOverlay;