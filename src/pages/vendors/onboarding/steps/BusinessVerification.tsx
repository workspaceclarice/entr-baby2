import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';

interface VerificationFile {
  file: File;
  preview: string;
  status: 'pending' | 'verifying' | 'verified' | 'failed';
}

const BusinessVerification: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [idVerification, setIdVerification] = useState<VerificationFile | null>(null);
  const [businessDocuments, setBusinessDocuments] = useState<VerificationFile[]>([]);
  const [error, setError] = useState('');

  const handleIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdVerification({
          file,
          preview: reader.result as string,
          status: 'pending'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusinessDocuments(prev => [
          ...prev,
          {
            file,
            preview: reader.result as string,
            status: 'pending'
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const verifyDocuments = async () => {
    setLoading(true);
    try {
      // Here you would integrate with a verification service
      // For example: Stripe Identity, Jumio, or other KYC providers
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call
      navigate('/vendors/dashboard');
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-light text-gray-900 mb-2">Verify your identity & business</h1>
      <p className="text-base text-gray-600 font-light mb-8">
        We need to verify your identity and business documents to ensure platform safety
      </p>

      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl p-8 shadow-sm space-y-8">
        {/* ID Verification Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Identity Verification</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            {!idVerification ? (
              <div className="text-center">
                <input
                  type="file"
                  className="hidden"
                  id="id-upload"
                  accept="image/*,.pdf"
                  onChange={handleIdUpload}
                />
                <label
                  htmlFor="id-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-500"
                >
                  Upload ID Document
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Upload a government-issued ID (passport, driver's license, etc.)
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={idVerification.preview}
                    alt="ID Preview"
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {idVerification.file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(idVerification.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  Pending Verification
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Business Documents Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Business Documents</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="space-y-4">
              <input
                type="file"
                className="hidden"
                id="document-upload"
                accept=".pdf,.doc,.docx,image/*"
                multiple
                onChange={handleDocumentUpload}
              />
              <label
                htmlFor="document-upload"
                className="cursor-pointer text-blue-600 hover:text-blue-500 block text-center"
              >
                Upload Business Documents
              </label>
              <p className="text-sm text-gray-500 text-center">
                Upload business license, registration, or other relevant documents
              </p>
              
              {businessDocuments.length > 0 && (
                <div className="mt-4 space-y-3">
                  {businessDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded">
                          <DocumentIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {doc.file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(doc.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        Pending
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={() => navigate('/vendors/onboarding/location')}
            className="px-6 py-3 text-sm font-light text-gray-700 hover:text-gray-900"
          >
            Back
          </button>
          <button
            type="button"
            onClick={verifyDocuments}
            disabled={!idVerification || businessDocuments.length === 0 || loading}
            className="px-6 py-3 bg-blue-600 text-white text-sm font-light rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" color="white" />
                <span>Verifying...</span>
              </>
            ) : (
              'Complete Verification'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default BusinessVerification; 