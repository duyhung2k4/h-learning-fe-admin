import React from "react";
import { MantineStyleProp, Stack } from "@mantine/core";


export type HeaderPageProps = {
    children: React.ReactNode
    style?: MantineStyleProp
}
const HeaderPage: React.FC<HeaderPageProps> = (props) => {
    return (
        <Stack 
            style={{
                width: "100%",
                padding: "16px",
                justifyContent: "center",
                alignItems: "center",
                ...props.style,
            }}
        >
            {props.children}
        </Stack>
    )
}

export default HeaderPage;