import React, { Suspense, useMemo } from "react";
import Cookies from "js-cookie";

import { useNavigate, useOutlet } from "react-router";
import { Avatar, Box, Button, Group, LoadingOverlay, Stack, Text } from '@mantine/core';
import { ObjectRouter, ROUTER } from "@/constants/router";
import { TOKEN_TYPE } from "@/model/variable";

import classes from "./styles.module.css";
import { IconLayoutDashboard } from "@tabler/icons-react";



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
            <Group h={"100vh"} w={"100%"} gap={0}>
                <Stack className={classes.nav} gap={0}>
                    <Group p={16} pb={36}>
                        <Text><span className={classes.title_app}>H</span>Learning</Text>
                    </Group>
                    <Stack className={classes.links}>

                        {
                            links.map((l, i) => {
                                const Icon = l.icon;
                                const active = l.href === pathname;

                                return (
                                    <Group 
                                        className={`${classes.link_root} ${active ? classes.active_link : null}`} 
                                        gap={0} w={"100%"}
                                        onClick={() => handleNavigation(l.href)}
                                    >
                                        <Box className={classes.line_link}></Box>
                                        <Group className={classes.link} gap={0}>
                                            <Group w={"90%"} gap={0} className={classes.group_text}>
                                                <Group justify="center" align="center" style={{ flex: 1 }} pt={8} pb={8} pl={16} pr={16}>
                                                    {Icon && <Icon/>}
                                                </Group>
                                                <Box className={classes.text_link}>
                                                    {l.name}
                                                </Box>
                                            </Group>
                                        </Group>
                                    </Group>
                                )
                            })
                        }


                    </Stack>
                    <Group p={16} justify="start" align="center">
                        <Avatar radius="xl" />
                        <Text>Admin</Text>
                    </Group>
                </Stack>
                <Group h={"100%"} justify="start" align="start">{outlet}</Group>
            </Group>
        </Suspense>
    )
}

export default AppshellLayout;