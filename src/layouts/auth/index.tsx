import React from "react";

import { Grid, Group, Image, Stack } from "@mantine/core";
import { useOutlet } from "react-router";
import { useMediaQuery } from "@mantine/hooks";

import classes from "./style.module.css";
import bg from "@/assets/bg_auth.png";
import themeOverride from "@/themes/overrideTheme";



const AuthLayout: React.FC = () => {

    const outlet = useOutlet();
    const matches = useMediaQuery(`(max-width: ${themeOverride.breakpoints?.md}`);

    return (
        <Group className={classes.root} justify="center" align="center">
            <Group className={matches ? classes.content_mobile :classes.content}>
                <Grid
                    w={"100%"} h={"100%"}
                    styles={{
                        inner: {
                            height: "100%"
                        },
                    }}
                >
                    {!matches && <Grid.Col span={{ lg: 6, md: 5 }}>
                        <Stack h={"100%"} w={"100%"} justify="center" align="center">
                            <Image w={"80%"} src={bg} />
                        </Stack>
                    </Grid.Col>}
                    <Grid.Col span={matches ? 12 : { lg: 6, md: 7 }} h={"100%"} w={"100%"}>
                        <Stack h={"100%"} w={"100%"} justify="center" align="center">
                            <Stack w={matches ? "75%" : "60%"}>{outlet}</Stack>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Group>
        </Group>
    )
}

export default AuthLayout;