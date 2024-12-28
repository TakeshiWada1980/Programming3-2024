// src/app/admin/layout.tsx
"use client";

import React from "react";
import { useRouteGuard } from "@/app/_hooks/useRouteGuard";

interface Props {
  children: React.ReactNode;
}
const AdminLayout = ({ children }: Props) => {
  const { isAuthenticated } = useRouteGuard();
  if (!isAuthenticated) {
    return null;
  }
  return <>{children}</>;
};

export default AdminLayout;
