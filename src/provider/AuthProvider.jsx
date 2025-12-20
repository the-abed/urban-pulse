import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import AuthContext from "../contexts/AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Sign out user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // update profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  }

  // Observe user state changes
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      // Get the actual JWT string from Firebase
      const token = await currentUser.getIdToken();
      
      // Attach the token string to the user object manually
      currentUser.accessToken = token; 
      
      setUser(currentUser);
    } else {
      setUser(null);
    }
    setLoading(false);
  });
  return () => unsubscribe();
}, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
