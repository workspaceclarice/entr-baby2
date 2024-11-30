import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from 'firebase/auth';

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  role: string;
  name?: string;  // Optional for backward compatibility
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  userType: string | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<UserCredential>;  // Changed return type
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const signup = async (email: string, password: string) => {
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
    setUserType(null);
    navigate('/');
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        // Here you would typically fetch the user's profile from your database
        const nameParts = user.displayName?.split(' ') || ['', ''];
        setUserProfile({
          id: user.uid,
          email: user.email || '',
          firstName: nameParts[0],
          lastName: nameParts[1] || '',
          profileImage: user.photoURL || `https://ui-avatars.com/api/?name=${nameParts[0]}+${nameParts[1]}`,
          role: 'user', // You might want to fetch this from your database
          name: user.displayName || 'User'
        });
        setUserType('user'); // Or fetch from database
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
    signup,
    login,
    loginWithGoogle,
    logout,
    googleSignIn
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 