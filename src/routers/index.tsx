import React from "react";
import AppshellLayout from "@/layouts/appShell";
import ProtectedLayout from "@/layouts/protected";
import AuthLayout from "@/layouts/auth";

import { Routes, Route } from "react-router-dom";
import { 
    PageDashboard, 
    PageHome, 
    PageLogin, 
    PageManagerCourse,
} from "./lazy";
import { ROUTER } from "@/constants/router";



const AppRouter: React.FC = () => {



    return (
        <Routes>
            <Route element={<ProtectedLayout />}>
                <Route element={<AuthLayout />}>
                    <Route path={ROUTER.LOGIN.href} element={<PageLogin />} />
                </Route>
                <Route element={<AppshellLayout />}>
                    <Route path={ROUTER.HOME.href} element={<PageHome />} />
                    <Route path={ROUTER.DASH_BOARD.href} element={<PageDashboard />} />
                    <Route path={ROUTER.MANAGER_COURSE.href} element={<PageManagerCourse />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRouter;