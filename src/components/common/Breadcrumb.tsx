import React from 'react';
import { Link as RouterLink, To } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

export interface BreadcrumbItem {
  label: string;
  href: To;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li className="flex items-center">
          <RouterLink
            to="/"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <HomeIcon className="h-4 w-4" />
          </RouterLink>
        </li>

        <ChevronRightIcon className="h-4 w-4 text-gray-300" />

        {items.map((item, index) => (
          <li key={typeof item.href === 'string' ? item.href : index} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="h-4 w-4 text-gray-300 mx-1" />
            )}
            <RouterLink
              to={item.href}
              className={`text-sm font-light ${
                index === items.length - 1
                  ? 'text-gray-600'
                  : 'text-gray-400 hover:text-gray-600 transition-colors'
              }`}
            >
              {item.label}
            </RouterLink>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;