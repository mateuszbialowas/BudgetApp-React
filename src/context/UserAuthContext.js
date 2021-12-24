import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { writeUserData, checkIfUserExists } from "../database";
import { toast } from "react-toastify";
import { auth, database } from "../firebse";
import { ref, child, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  function signUp(email, password) {
    const firebaseCreateUser = createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    toast.promise(firebaseCreateUser, {
      pending: "Signing up...",
      success: {
        render({ data }) {
          writeUserData(
            data.user.uid,
            data.user.displayName || data.user.email,
            data.user.email,
            data.user.photoURL,
            data.providerId || "created_by_email"
          );
          navigate("/dashboard");
          return "Signed up successfully!";
        },
      },
      error: {
        render({ data }) {
          return `Error: ${data.code}`;
        },
      },
    });
    return firebaseCreateUser;
  }

  function logIn(email, password) {
    const firebaseLogIn = signInWithEmailAndPassword(auth, email, password);
    toast.promise(firebaseLogIn, {
      pending: "Logging in...",
      success: {
        render({ data }) {
          navigate("/dashboard");
          return "Logged in successfully!";
        },
      },
      error: {
        render({ data }) {
          return `Error: ${data.code}`;
        },
      },
    });

    return firebaseLogIn;
  }

  function logOut() {
    return signOut(auth);
  }
  
  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    const firebaseGoogleSignIn = signInWithPopup(auth, provider);
    toast.promise(firebaseGoogleSignIn, {
      pending: "Logging in...",
      success: {
        render({ data }) {
          navigate("/dashboard");
          if (!checkIfUserExists(data.user.uid)) {
            writeUserData(
              data.user.uid,
              data.user.displayName || data.user.email,
              data.user.email,
              data.user.photoURL,
              data.providerId || "googleSignIn"
            );
          }
          return "Logged in successfully!";
        },
      },
      error: {
        render({ data }) {
          return `Error: ${data.code}`;
        },
      },
    });

    return firebaseGoogleSignIn;
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
