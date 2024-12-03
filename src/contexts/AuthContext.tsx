import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from 'firebase/auth';

export interface BaseProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  displayName?: string;
  userType: 'user' | 'vendor';
  phone?: string;
}

export interface VendorProfile extends BaseProfile {
  userType: 'vendor';
  businessName?: string;
  serviceType?: string;
  vendorStatus?: 'active' | 'pending' | 'inactive';
  businessAddress?: string;
  businessDescription?: string;
  taxId?: string;
  documents?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  phone: string;
}

export interface CustomerProfile extends BaseProfile {
  userType: 'user';
  preferences?: string[];
  phone?: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: VendorProfile | CustomerProfile | null;
  loading: boolean;
  isVendor: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userType: 'user' | 'vendor') => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<UserCredential>;
  googleSignIn: () => Promise<void>;
  updateUserProfile: (profile: VendorProfile | CustomerProfile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<VendorProfile | CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isVendor = useMemo(() => userProfile?.userType === 'vendor', [userProfile]);

  const signup = async (email: string, password: string, userType: 'user' | 'vendor') => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    // Here you might want to create/update user profile in your database
    navigate('/dashboard');
    return result;
  };

  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/vendor/dashboard');
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
    navigate('/');
  };

  const updateUserProfile = async (profile: VendorProfile | CustomerProfile) => {
    setUserProfile(profile);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        const nameParts = user.displayName?.split(' ') || ['', ''];
        setUserProfile({
          id: user.uid,
          email: user.email || '',
          firstName: nameParts[0],
          lastName: nameParts[1] || '',
          profileImage: user.photoURL || `https://ui-avatars.com/api/?name=${nameParts[0]}+${nameParts[1]}`,
          userType: 'user',
          displayName: user.displayName || undefined,
          phone: user.phoneNumber || ''
        } as CustomerProfile);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    isVendor,
    login,
    signup,
    logout,
    loginWithGoogle,
    googleSignIn,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 