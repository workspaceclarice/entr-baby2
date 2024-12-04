import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Company
            </h3>
            <div className="mt-4 space-y-4">
              <Link to="/about" className="text-base text-gray-500 hover:text-gray-900 block">
                About
              </Link>
              <Link to="/careers" className="text-base text-gray-500 hover:text-gray-900 block">
                Careers
              </Link>
              <Link to="/blog" className="text-base text-gray-500 hover:text-gray-900 block">
                Blog
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Support
            </h3>
            <div className="mt-4 space-y-4">
              <Link to="/help" className="text-base text-gray-500 hover:text-gray-900 block">
                Help Center
              </Link>
              <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900 block">
                Contact Us
              </Link>
              <Link to="/faq" className="text-base text-gray-500 hover:text-gray-900 block">
                FAQ
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Legal
            </h3>
            <div className="mt-4 space-y-4">
              <Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900 block">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900 block">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Social
            </h3>
            <div className="mt-4 space-y-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-base text-gray-500 hover:text-gray-900 block">
                Twitter
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-base text-gray-500 hover:text-gray-900 block">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-base text-gray-500 hover:text-gray-900 block">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} ENTR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 