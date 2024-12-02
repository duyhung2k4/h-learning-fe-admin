import Cookies from "js-cookie";
import React, { Suspense, useEffect } from "react";

import { ROUTER } from "@/constants/router";
import { TOKEN_TYPE } from "@/model/variable";
import { useNavigate, useOutlet } from "react-router";
import { LoadingOverlay } from "@mantine/core";



const ProtectedLayout: React.FC = () => {
    const outlet = useOutlet();
    const navigation = useNavigate();

    const accessToken = Cookies.get(TOKEN_TYPE.ACCESS_TOKEN);

    useEffect(() => {
        if(!accessToken) {
            // navigation(ROUTER.LOGIN.href);
        }
    }, [accessToken]);

    // if(!accessToken) {
    //     return <></>
    // }

    return (
        <Suspense fallback={<LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />}>
            {outlet}
        </Suspense>
    )
}

export default ProtectedLayout;