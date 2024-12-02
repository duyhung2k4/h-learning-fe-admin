import { lazy } from "react";

// auth
export const PageLogin = lazy(() => import("@/pages/login"));
export const PageAcceptCode = lazy(() => import("@/pages/accept_code"));

// student-pages
export const PageHome = lazy(() => import("@/pages/home"));
export const PageFindCourse = lazy(() => import("@/pages/find_course"));
export const PageMyCourse = lazy(() => import("@/pages/my_course"));