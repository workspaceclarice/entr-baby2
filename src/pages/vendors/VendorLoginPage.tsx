import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import VendorHeader from '../../components/vendors/common/VendorHeader';

const VendorLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/vendor/dashboard');
    } catch (err) {
      setError('Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <VendorHeader />
      
      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 pt-32">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-light text-gray-900 mb-2">Sign in</h2>
            <p className="text-base text-gray-600 font-light mb-8">
              Welcome back! Please enter your details.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm font-light">
                {error}
              </div>
            )}

            {/* Social Sign In */}
            <div className="space-y-3 mb-8">
              <button
                onClick={() => loginWithGoogle()}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-light text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-3" />
                Continue with Google
              </button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-light">or</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-light text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/vendor/forgot-password"
                  className="text-sm font-light text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 text-white text-sm font-light rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign in
              </button>
            </form>

            <p className="mt-8 text-center text-sm font-light text-gray-600">
              Don't have an account?{' '}
              <Link to="/vendor/signup" className="text-blue-600 hover:text-blue-500">
                List your business
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block w-1/2 relative">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
            alt="Business owner using laptop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-16 left-16 right-16 text-white">
            <h3 className="text-3xl font-light mb-4">Grow your business with entr</h3>
            <p className="text-lg font-light text-gray-200">
              Join thousands of vendors who trust entr to manage their bookings and grow their business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLoginPage; 