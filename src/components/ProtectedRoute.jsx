import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserAuth } from "../context/UserAuthContext";

export default function ProtectedRoute({ children }) {
  let { user } = useUserAuth();
  if (!user) {
    console.log("not logged in");
    toast.error("You are not authorized to view this page");
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
