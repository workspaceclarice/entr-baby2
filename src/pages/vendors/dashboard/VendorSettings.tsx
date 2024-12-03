import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { 
  BellIcon, 
  CreditCardIcon, 
  KeyIcon, 
  UserCircleIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  DocumentIcon
} from '@heroicons/react/24/outline';
import { useAuth, VendorProfile, CustomerProfile } from '../../../contexts/AuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import NotificationToast from '../../../components/common/NotificationToast';

interface SettingsSection {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

const isVendorProfile = (profile: VendorProfile | CustomerProfile | null): profile is VendorProfile => {
  return profile?.userType === 'vendor';
};

const mockDocuments = [
  {
    name: 'Business License.pdf',
    url: '#',
    type: 'license',
    uploadedAt: '2024-03-15'
  },
  {
    name: 'Insurance Certificate.pdf',
    url: '#',
    type: 'insurance',
    uploadedAt: '2024-03-15'
  },
  {
    name: 'Tax Registration.pdf',
    url: '#',
    type: 'tax',
    uploadedAt: '2024-03-15'
  }
];

const VendorSettings: React.FC = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: userProfile?.firstName || '',
    lastName: userProfile?.lastName || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || ''
  });
  const [businessForm, setBusinessForm] = useState({
    businessName: isVendorProfile(userProfile) ? userProfile.businessName || '' : '',
    businessType: isVendorProfile(userProfile) ? userProfile.serviceType || '' : '',
    businessAddress: isVendorProfile(userProfile) ? userProfile.businessAddress || '' : '',
    businessDescription: isVendorProfile(userProfile) ? userProfile.businessDescription || '' : '',
    taxId: isVendorProfile(userProfile) ? userProfile.taxId || '' : ''
  });
  const [isSavingBusiness, setIsSavingBusiness] = useState(false);
  const [showBusinessSaveSuccess, setShowBusinessSaveSuccess] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success'
  });

  const sections: SettingsSection[] = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'business', name: 'Business', icon: BuildingStorefrontIcon },
    { id: 'subscription', name: 'Subscription', icon: CurrencyDollarIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'payments', name: 'Payments', icon: CreditCardIcon },
  ];

  const currentPlan = {
    name: 'Professional',
    price: '$500/month',
    features: [
      'Lower 15% commission rate',
      'Unlimited bookings',
      'Priority Support',
      'Advanced Analytics',
      'Marketing Tools'
    ],
    billingCycle: 'monthly',
    nextBilling: '2024-04-15'
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userProfile) return;

    try {
      setUploading(true);
      const storage = getStorage();
      const storageRef = ref(storage, `vendor-photos/${userProfile.id}/${file.name}`);
      
      // Upload file
      await uploadBytes(storageRef, file);
      
      // Get download URL
      const photoURL = await getDownloadURL(storageRef);
      
      // Update Firestore
      const userRef = doc(db, 'users', userProfile.id);
      await updateDoc(userRef, {
        profileImage: photoURL
      });

      // Update context
      await updateUserProfile({
        ...userProfile,
        profileImage: photoURL
      });

    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (!userProfile) return;
    
    try {
      setIsSaving(true);
      const userRef = doc(db, 'users', userProfile.id);
      await updateDoc(userRef, {
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        email: profileForm.email,
        phone: profileForm.phone
      });

      await updateUserProfile({
        ...userProfile,
        ...profileForm
      });

      setNotification({
        show: true,
        message: 'Profile updated successfully',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        show: true,
        message: 'Failed to update profile',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleBusinessUpdate = async () => {
    if (!userProfile || !isVendorProfile(userProfile)) return;
    
    try {
      setIsSavingBusiness(true);
      const userRef = doc(db, 'users', userProfile.id);
      await updateDoc(userRef, {
        businessName: businessForm.businessName,
        serviceType: businessForm.businessType,
        businessAddress: businessForm.businessAddress,
        businessDescription: businessForm.businessDescription,
        taxId: businessForm.taxId
      });

      await updateUserProfile({
        ...userProfile,
        businessName: businessForm.businessName,
        serviceType: businessForm.businessType,
        businessAddress: businessForm.businessAddress,
        businessDescription: businessForm.businessDescription,
        taxId: businessForm.taxId
      } as VendorProfile);

      setNotification({
        show: true,
        message: 'Business information updated successfully',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        show: true,
        message: 'Failed to update business information',
        type: 'error'
      });
    } finally {
      setIsSavingBusiness(false);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      // Add your password update logic here
      setNotification({
        show: true,
        message: 'Password updated successfully',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        show: true,
        message: 'Failed to update password',
        type: 'error'
      });
    }
  };

  const handleEmailNotificationToggle = (enabled: boolean) => {
    setEmailNotifications(enabled);
    setNotification({
      show: true,
      message: `Email notifications ${enabled ? 'enabled' : 'disabled'}`,
      type: 'success'
    });
  };

  const handleSMSNotificationToggle = (enabled: boolean) => {
    setSmsNotifications(enabled);
    setNotification({
      show: true,
      message: `SMS notifications ${enabled ? 'enabled' : 'disabled'}`,
      type: 'success'
    });
  };

  const handleEnable2FA = () => {
    setNotification({
      show: true,
      message: 'Two-factor authentication enabled successfully',
      type: 'success'
    });
  };

  const handlePaymentMethodUpdate = () => {
    setNotification({
      show: true,
      message: 'Payment method updated successfully',
      type: 'success'
    });
  };

  const handlePayoutScheduleUpdate = () => {
    setNotification({
      show: true,
      message: 'Payout schedule updated successfully',
      type: 'success'
    });
  };

  const handleTaxDocumentUpload = () => {
    setNotification({
      show: true,
      message: 'Tax document uploaded successfully',
      type: 'success'
    });
  };

  const handlePlanUpgrade = () => {
    setNotification({
      show: true,
      message: 'Subscription plan upgraded successfully',
      type: 'success'
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'subscription':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-light text-gray-900 mb-4">Current Plan</h3>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-2xl font-light text-gray-900">{currentPlan.name}</p>
                  <p className="text-gray-500 font-light">{currentPlan.price}</p>
                </div>
                <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                  Active
                </span>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-2">Plan Features:</p>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-600">Billing Cycle</span>
                  <span className="text-gray-900 capitalize">{currentPlan.billingCycle}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Billing Date</span>
                  <span className="text-gray-900">{currentPlan.nextBilling}</span>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={handlePlanUpgrade}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upgrade Plan
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View All Plans
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Billing History</h3>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">Professional Plan</p>
                      <p className="text-sm text-gray-500">March 15, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">$500.00</p>
                      <button className="text-sm text-blue-600 hover:text-blue-700">
                        Download Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCardIcon className="h-8 w-8 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/24</p>
                  </div>
                </div>
                <button
                  onClick={handlePaymentMethodUpdate}
                  className="text-sm font-light text-blue-600 hover:text-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-light text-gray-900 mb-6">Notification Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-light text-gray-900">Email Notifications</p>
                  <p className="text-sm font-light text-gray-500">Receive booking updates via email</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onChange={handleEmailNotificationToggle}
                  className={`${
                    emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                >
                  <span className={`${
                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                </Switch>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-light text-gray-900">SMS Notifications</p>
                  <p className="text-sm font-light text-gray-500">Receive booking updates via SMS</p>
                </div>
                <Switch
                  checked={smsNotifications}
                  onChange={handleSMSNotificationToggle}
                  className={`${
                    smsNotifications ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                >
                  <span className={`${
                    smsNotifications ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                </Switch>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return renderProfileSection();

      case 'business':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-light text-gray-900">Business Information</h3>
                {showBusinessSaveSuccess && (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircleIcon className="h-5 w-5 mr-1" />
                    Changes saved successfully
                  </div>
                )}
              </div>

              <div className="mb-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-base font-light text-gray-900">Account Status</h4>
                    <p className="text-sm font-light text-gray-600 mt-1">
                      {isVendorProfile(userProfile) && userProfile.vendorStatus === 'active' ? 
                        'Your account is approved and active' : 
                        'Your account is pending approval'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-light ${
                    isVendorProfile(userProfile) && userProfile.vendorStatus === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {isVendorProfile(userProfile) && userProfile.vendorStatus === 'active' ? 'Active' : 'Pending'}
                  </span>
                </div>
                {isVendorProfile(userProfile) && userProfile.vendorStatus !== 'active' && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-light text-yellow-800">
                      We're reviewing your submitted documents. This usually takes 1-2 business days.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-light text-gray-700">Business Name</label>
                  <input
                    type="text"
                    value={businessForm.businessName}
                    onChange={(e) => setBusinessForm({ ...businessForm, businessName: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-light text-gray-700">Business Type</label>
                  <select
                    value={businessForm.businessType}
                    onChange={(e) => setBusinessForm({ ...businessForm, businessType: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
                  >
                    <option value="photography">Photography</option>
                    <option value="venue">Venue</option>
                    <option value="catering">Catering</option>
                    <option value="entertainment">Entertainment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-700">Business Address</label>
                  <input
                    type="text"
                    value={businessForm.businessAddress}
                    onChange={(e) => setBusinessForm({ ...businessForm, businessAddress: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-700">Business Description</label>
                  <textarea
                    rows={4}
                    value={businessForm.businessDescription}
                    onChange={(e) => setBusinessForm({ ...businessForm, businessDescription: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-700">Tax ID (EIN)</label>
                  <input
                    type="text"
                    value={businessForm.taxId}
                    onChange={(e) => setBusinessForm({ ...businessForm, taxId: e.target.value })}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
                  />
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-base font-light text-gray-900 mb-4">Business Documents</h4>
                  <div className="space-y-4">
                    {(isVendorProfile(userProfile) && userProfile.documents?.length ? 
                      userProfile.documents : 
                      mockDocuments
                    ).map((doc: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <DocumentIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm font-light text-gray-900">{doc.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-xs font-light text-gray-500">
                            Uploaded {doc.uploadedAt}
                          </span>
                          <button className="text-xs font-light text-blue-600 hover:text-blue-700">
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleBusinessUpdate}
                    disabled={isSavingBusiness}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-light disabled:bg-blue-400"
                  >
                    {isSavingBusiness ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-light text-gray-900 mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-light text-gray-900 mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-light text-gray-700">Current Password</label>
                      <input
                        type="password"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700">New Password</label>
                      <input
                        type="password"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700">Confirm New Password</label>
                      <input
                        type="password"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={handlePasswordUpdate}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-light"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="text-base font-light text-gray-900 mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-gray-600">Add an extra layer of security to your account</p>
                      <p className="text-sm font-light text-gray-500 mt-1">Currently disabled</p>
                    </div>
                    <button
                      onClick={handleEnable2FA}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-light"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="text-base font-light text-gray-900 mb-4">Login History</h4>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div>
                          <p className="text-gray-900">San Francisco, CA</p>
                          <p className="text-gray-500">Chrome on MacOS</p>
                        </div>
                        <p className="text-gray-500">2 hours ago</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-light text-gray-900 mb-6">Payment Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-light text-gray-900 mb-4">Payout Method</h4>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <CreditCardIcon className="h-8 w-8 text-gray-400 mr-3" />
                      <div>
                        <p className="font-light text-gray-900">Bank Account (ACH)</p>
                        <p className="text-sm font-light text-gray-500">Ending in •••• 4321</p>
                      </div>
                    </div>
                    <button
                      onClick={handlePaymentMethodUpdate}
                      className="text-sm font-light text-blue-600 hover:text-blue-700"
                    >
                      Update
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="text-base font-light text-gray-900 mb-4">Payout Schedule</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-light text-gray-900">Weekly Payouts</p>
                        <p className="text-sm font-light text-gray-500">Every Monday</p>
                      </div>
                      <button
                        onClick={handlePayoutScheduleUpdate}
                        className="text-sm font-light text-blue-600 hover:text-blue-700"
                      >
                        Change Schedule
                      </button>
                    </div>
                    <div className="text-sm font-light text-gray-500">
                      Next payout: $1,234.56 on March 25, 2024
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="text-base font-light text-gray-900 mb-4">Tax Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-light text-gray-700">Tax Form</label>
                      <select
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="w9"
                      >
                        <option value="w9">W-9 (US)</option>
                        <option value="w8ben">W-8BEN (Non-US)</option>
                      </select>
                    </div>
                    <button
                      onClick={handleTaxDocumentUpload}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-light"
                    >
                      Upload Tax Document
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // Add other sections as needed
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {sections.find(s => s.id === activeSection)?.name}
            </h3>
            <p className="text-gray-500">This section is under development.</p>
          </div>
        );
    }
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-light text-gray-900">Profile Information</h3>
          {showSaveSuccess && (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircleIcon className="h-5 w-5 mr-1" />
              Changes saved successfully
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 relative">
              <img
                src={userProfile?.profileImage || `https://ui-avatars.com/api/?name=${profileForm.firstName}+${profileForm.lastName}`}
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover"
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
                disabled={uploading}
              />
              <label
                htmlFor="photo-upload"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer inline-block font-light"
              >
                {uploading ? 'Uploading...' : 'Change Photo'}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-light text-gray-700">First Name</label>
              <input
                type="text"
                value={profileForm.firstName}
                onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-gray-700">Last Name</label>
              <input
                type="text"
                value={profileForm.lastName}
                onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
              />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-light text-gray-700">Email</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
              />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-light text-gray-700">Phone</label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 font-light"
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              onClick={handleProfileUpdate}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-light disabled:bg-blue-400"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Settings</h1>
          <p className="mt-1 text-sm font-light text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>
      </div>
      
      {/* Update the section buttons to use font-light */}
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0">
        <nav className="lg:w-64 flex-shrink-0">
          <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center px-4 py-2 text-sm font-light rounded-lg whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <section.icon className="h-5 w-5 mr-3" />
                {section.name}
              </button>
            ))}
          </div>
        </nav>
        
        {/* Main Content */}
        <div className="flex-1">
          {renderSection()}
        </div>
      </div>
      
      <NotificationToast
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default VendorSettings; 