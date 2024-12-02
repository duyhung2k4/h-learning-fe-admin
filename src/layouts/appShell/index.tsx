import React, { Suspense, useMemo } from "react";
import Cookies from "js-cookie";

import { useNavigate, useOutlet } from "react-router";
import { Box, Button, Group, LoadingOverlay, Text } from '@mantine/core';
import { ObjectRouter, ROUTER } from "@/constants/router";
import { TOKEN_TYPE } from "@/model/variable";

import classes from "./styles.module.css";



const AppshellLayout: React.FC = () => {
    const links: ObjectRouter[] = useMemo(() => {
        let list: ObjectRouter[] = [
            ROUTER.HOME,
            ROUTER.FIND_COURSE,
            ROUTER.MY_COURSE,
        ];

        return list;
    }, []);

    const outlet = useOutlet();
    const navigation = useNavigate();

    const pathname = window.location.pathname;

    const handleNavigation = (href: string) => {
        navigation(href);
    }

    const handleLogout = () => {
        Cookies.remove(TOKEN_TYPE.ACCESS_TOKEN);
        Cookies.remove(TOKEN_TYPE.REFRESH_TOKEN);

        navigation(ROUTER.HOME.href);
    }



    return (
        <Suspense fallback={<LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />}>
            <Group
                w={"100%"}
                justify="space-between"
                align="center"
                className={classes.header}
                pl={16}
                pr={16}
            >
                <Group>
                    <Text><span>H</span>Learning</Text>
                </Group>

                <Group gap={24}>
                    {
                        links.map((l, i) => {
                            const Icon = l.icon;
                            return (
                                <Group
                                    key={i}
                                    className={`${classes.link_root} ${pathname === l.href ? classes.active_link : null}`}
                                    onClick={() => handleNavigation(l.href)}
                                    gap={0}
                                >
                                    <Group gap={8} className={classes.link} align="center">
                                        {Icon && <Icon className={classes.icon} />}
                                        <Text>{l.name}</Text>
                                    </Group>
                                    <Box className={classes.line_link}></Box>
                                </Group>
                            )
                        })
                    }
                </Group>

                <Group>
                    <Button>Đăng nhập</Button>
                </Group>
            </Group>
            {outlet}
        </Suspense>
    )
}

export default AppshellLayout;