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
          const user = data.user;
          writeUserData(
            user.uid,
            user.displayName || user.email,
            user.email,
            user.photoURL,
            data.providerId || "createdUserWithEmailAndPassword"
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
    const signUpToast = toast.loading("Logging in...");
    return signInWithPopup(auth, provider)
      .then((UserCredential) => {
        const user = UserCredential.user;
        toast.update(signUpToast, {
          render: "Log in successful!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnFocusLoss: false,
        });
        navigate("/dashboard");
        const dbRef = ref(database);
        get(child(dbRef, "users/" + user.uid)).then((snapshot) => {
          if (!snapshot.exists()) {
            writeUserData(
              user.uid,
              user.displayName || user.email,
              user.email,
              user.photoURL,
              UserCredential.providerId || "googleSignIn"
            );
          }
        });
      })
      .catch((err) => {
        toast.update(signUpToast, {
          render: `${err.message}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnFocusLoss: false,
        });
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
