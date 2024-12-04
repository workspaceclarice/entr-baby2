import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-purple-600 text-xl font-bold">
                Entr
              </Link>
            </div>
            {/* ... other header content ... */}
          </div>
        </div>
      </div>
    </header>
  );
} 