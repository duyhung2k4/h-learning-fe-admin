import { lazy } from "react";

// auth
export const PageLogin = lazy(() => import("@/pages/login"));

// student-pages
export const PageHome = lazy(() => import("@/pages/home"));
export const PageDashboard = lazy(() => import("@/pages/dashboard"));
export const PageManagerCourse = lazy(() => import("@/pages/manager_course"));