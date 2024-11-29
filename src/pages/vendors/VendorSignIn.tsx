import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import VendorHeader from '../../components/layout/VendorHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

type SignInMethod = 'email' | 'phone';

const VendorSignIn: React.FC = () => {
  const [signInMethod, setSignInMethod] = useState<SignInMethod>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Handle email/phone sign in
      navigate('/vendors/onboarding');
    } catch (error) {
      setError('Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'apple') => {
    setLoading(true);
    try {
      if (provider === 'google') {
        await loginWithGoogle();
      }
      navigate('/vendors/onboarding');
    } catch (error) {
      setError(`Failed to sign in with ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <div className="max-w-md mx-auto px-4 pt-32 pb-16">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-light text-gray-900 mb-2">Sign in</h2>
          <p className="text-base text-gray-600 font-light mb-8">
            Welcome back! Please enter your details
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-light">
              {error}
            </div>
          )}

          {/* Sign In Method Toggle */}
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              onClick={() => setSignInMethod('email')}
              className={`flex-1 py-2 text-sm font-light rounded-lg transition-colors ${
                signInMethod === 'email'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setSignInMethod('phone')}
              className={`flex-1 py-2 text-sm font-light rounded-lg transition-colors ${
                signInMethod === 'phone'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Phone
            </button>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {signInMethod === 'email' ? (
              <div>
                <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="phone" className="block text-sm font-light text-gray-700 mb-2">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white text-sm font-light rounded-lg hover:bg-blue-700 transition-colors"
            >
              {loading ? <LoadingSpinner size="sm" color="white" /> : 'Continue'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-light">or continue with</span>
            </div>
          </div>

          {/* Social Sign In */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => handleSocialSignIn('google')}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-light text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-3" />
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialSignIn('apple')}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-light text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <img src="/apple-icon.svg" alt="Apple" className="h-5 w-5 mr-3" />
              Continue with Apple
            </button>
          </div>

          <p className="mt-8 text-center text-sm font-light text-gray-600">
            Don't have an account?{' '}
            <Link to="/vendors/signup" className="text-blue-600 hover:text-blue-500">
              List your business
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorSignIn; 