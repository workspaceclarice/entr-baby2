import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface BaseProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImage?: string;
  displayName?: string;
}

export interface CustomerProfile extends BaseProfile {
  type: 'customer';
}

export interface VendorProfile extends BaseProfile {
  type: 'vendor';
  businessName?: string;
  serviceType?: string;
  businessAddress?: string;
  businessDescription?: string;
  taxId?: string;
  vendorStatus?: 'pending' | 'active' | 'suspended';
  documents?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

export type UserProfile = CustomerProfile | VendorProfile;

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, profileData: Partial<UserProfile>) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  updateUserProfile: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (user: User) => {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      setUserProfile({ id: user.uid, ...userDoc.data() } as UserProfile);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await fetchUserProfile(result.user);
  };

  const signup = async (email: string, password: string, profileData: Partial<UserProfile>) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const userDocRef = doc(db, 'users', result.user.uid);
    await setDoc(userDocRef, {
      ...profileData,
      email,
      id: result.user.uid,
    });
    await fetchUserProfile(result.user);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const userDocRef = doc(db, 'users', result.user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        email: result.user.email,
        firstName: result.user.displayName?.split(' ')[0],
        lastName: result.user.displayName?.split(' ')[1],
        profileImage: result.user.photoURL,
        id: result.user.uid,
        type: 'customer',
      });
    }
    
    await fetchUserProfile(result.user);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('No user logged in');
    const userDocRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userDocRef, data);
    await fetchUserProfile(currentUser);
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout: () => auth.signOut(),
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 