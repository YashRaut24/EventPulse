import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = () => {
  const location = useLocation();
  
  const pathMap = {
    '/event-dashboard': 'Dashboard',
    '/social-media-monitoring': 'Social Media Monitoring',
    '/analytics-reports': 'Analytics Reports',
    '/account-settings': 'Account Settings'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/event-dashboard' }];
    
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = pathMap?.[currentPath] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      
      if (currentPath !== '/event-dashboard') {
        breadcrumbs?.push({
          label,
          path: currentPath,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((crumb, index) => (
        <div key={crumb?.path} className="flex items-center space-x-2">
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {crumb?.isLast ? (
            <span className="text-foreground font-medium" aria-current="page">
              {crumb?.label}
            </span>
          ) : (
            <button
              onClick={() => handleNavigation(crumb?.path)}
              className="hover:text-foreground transition-standard"
            >
              {crumb?.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;