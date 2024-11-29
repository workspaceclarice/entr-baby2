import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import VendorHeader from '../../components/layout/VendorHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

type SignUpMethod = 'email' | 'phone';

const VendorSignUp: React.FC = () => {
  const [signUpMethod, setSignUpMethod] = useState<SignUpMethod>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!isVerifying) {
        // Send verification code
        setIsVerifying(true);
      } else {
        // Verify code and proceed to onboarding
        navigate('/vendors/onboarding');
      }
    } catch (error) {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'apple') => {
    setLoading(true);
    try {
      if (provider === 'google') {
        await loginWithGoogle();
      } else {
        await loginWithGoogle();
      }
      navigate('/vendors/onboarding');
    } catch (error) {
      setError(`Failed to sign up with ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <div className="max-w-md mx-auto px-4 pt-32 pb-16">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-light text-gray-900 mb-2">Create your account</h2>
          <p className="text-base text-gray-600 font-light mb-8">
            Get started with listing your business
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-light">
              {error}
            </div>
          )}

          {/* Sign Up Method Toggle */}
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              onClick={() => setSignUpMethod('email')}
              className={`flex-1 py-2 text-sm font-light rounded-lg transition-colors ${
                signUpMethod === 'email'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setSignUpMethod('phone')}
              className={`flex-1 py-2 text-sm font-light rounded-lg transition-colors ${
                signUpMethod === 'phone'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Phone
            </button>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isVerifying ? (
              signUpMethod === 'email' ? (
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
              )
            ) : (
              <div>
                <label htmlFor="code" className="block text-sm font-light text-gray-700 mb-2">
                  Verification code
                </label>
                <input
                  id="code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter verification code"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Code sent to {signUpMethod === 'email' ? email : phone}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white text-sm font-light rounded-lg hover:bg-blue-700 transition-colors"
            >
              {loading ? (
                <LoadingSpinner size="sm" color="white" />
              ) : isVerifying ? (
                'Verify Code'
              ) : (
                'Continue'
              )}
            </button>
          </form>

          {!isVerifying && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-light">or continue with</span>
                </div>
              </div>

              {/* Social Sign Up */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => handleSocialSignUp('google')}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-light text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-3" />
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialSignUp('apple')}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-light text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <img src="/apple-icon.svg" alt="Apple" className="h-5 w-5 mr-3" />
                  Continue with Apple
                </button>
              </div>
            </>
          )}

          <p className="mt-8 text-center text-sm font-light text-gray-600">
            Already have an account?{' '}
            <Link to="/vendors/signin" className="text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorSignUp; 