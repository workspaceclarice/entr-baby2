import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { HomeIcon } from '@heroicons/react/24/outline';

export interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex py-2.5" aria-label="Breadcrumb">
          <ol className="flex items-center flex-wrap gap-1">
            <li className="flex items-center">
              <Link 
                to="/" 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <HomeIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </li>
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <ChevronRightIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-300 mx-1 sm:mx-2 flex-shrink-0" />
                {item.href ? (
                  <Link 
                    to={item.href}
                    className="text-xs sm:text-sm text-gray-400 hover:text-gray-600 transition-colors font-light"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-xs sm:text-sm text-gray-600 font-light truncate">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;