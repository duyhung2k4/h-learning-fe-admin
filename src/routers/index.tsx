import React from "react";
import AppshellLayout from "@/layouts/appShell";
import ProtectedLayout from "@/layouts/protected";
import AuthLayout from "@/layouts/auth";

import { Routes, Route } from "react-router-dom";
import {
    PageCreateCourse,
    PageDashboard,
    PageEditCourse,
    PageEditLession,
    PageHome,
    PageLiveStream,
    PageLogin,
    PageManagerCourse,
    PageVideoStream,
} from "./lazy";
import { ROUTER } from "@/constants/router";



const AppRouter: React.FC = () => {



    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path={ROUTER.LOGIN.href} element={<PageLogin />} />
            </Route>
            <Route element={<ProtectedLayout />}>
                <Route element={<AppshellLayout />}>
                    <Route path={ROUTER.HOME.href} element={<PageHome />} />
                    <Route path={ROUTER.DASH_BOARD.href} element={<PageDashboard />} />
                    <Route path={ROUTER.MANAGER_COURSE.href} element={<PageManagerCourse />} />
                    <Route path={ROUTER.CREATE_COURSE.href} element={<PageCreateCourse />} />
                    <Route path={ROUTER.EDIT_COURSE.href} element={<PageEditCourse />} />
                    <Route path={ROUTER.EDIT_LESSION.href} element={<PageEditLession />} />
                    <Route path={ROUTER.LIVE_STREAM.href} element={<PageLiveStream />} />
                    <Route path={ROUTER.VIDEO_STREAM.href} element={<PageVideoStream />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRouter;