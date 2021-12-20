import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { writeUserData } from "../database";
import { toast } from "react-toastify";
import { auth } from "../firebse";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((UserCredential) => {
        const user = UserCredential.user;
        writeUserData(
          user.uid,
          user.displayName || user.email,
          user.email,
          user.photoURL,
          UserCredential.providerId || "createdUserWithEmailAndPassword"
        );
      })
      .catch((error) => {
        toast.error(error.message);
        logOut();
      });
  }
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    return signInWithPopup(auth, provider)
      .then((UserCredential) => {
        const user = UserCredential.user;
        writeUserData(
          user.uid,
          user.displayName || user.email,
          user.email,
          user.photoURL,
          UserCredential.providerId
        );
      })
      .catch((error) => {
        toast.error(error.message);
        logOut();
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <userAuthContext.Provider
      value={{ user, signUp, logIn, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
