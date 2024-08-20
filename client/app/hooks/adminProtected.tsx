"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

const AdminProtected: React.FC<ProtectedProps> = ({ children }) => {
  const { user } = useSelector((state: any) => state.auth);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!user) {
      // User is not logged in
      setIsRedirecting(true);
      window.location.href = "/";
    } else if (user.role !== "admin") {
      // User is logged in but not an admin
      setIsRedirecting(true);
      window.location.href = "/";
    } else {
      // User is an admin
      setIsRedirecting(false);
    }
  }, [user]);

  if (isRedirecting) {
    // Show a loading spinner or message while redirecting
    return <div>Loading...</div>;
  }

  return <>{children}</>; // Render children if user is an admin
};

export default AdminProtected;
