import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { User } from 'firebase/auth';

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  profileImage?: string;
  role: 'customer' | 'vendor';
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  userType: 'customer' | 'vendor' | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userType, setUserType] = useState<'customer' | 'vendor' | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const currentUserType = userType; // Store the type before logout
      await signOut(auth);
      // Route based on stored user type
      if (currentUserType === 'vendor') {
        navigate('/vendors/landing');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        // Mock user profile - replace with actual profile fetch
        const mockProfile: UserProfile = {
          id: user.uid,
          email: user.email || '',
          firstName: user.displayName?.split(' ')[0] || '',
          profileImage: user.photoURL || '',
          role: 'customer' // Default role, should be fetched from your backend
        };
        setUserProfile(mockProfile);
        // Here you would typically fetch the user type from your database
        // For now, we'll check if the user logged in through the vendor flow
        const isVendor = localStorage.getItem('userType') === 'vendor';
        setUserType(isVendor ? 'vendor' : 'customer');
      } else {
        setUserProfile(null);
        setUserType(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    userType,
    loading,
    login,
    loginWithGoogle,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 