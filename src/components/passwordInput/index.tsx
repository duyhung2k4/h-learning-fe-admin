import React, { useState } from "react";
import { ActionIcon, TextInput, TextInputProps } from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";


export type PasswordInputCustomProps = TextInputProps;

const PasswordInputCustom: React.FC<PasswordInputCustomProps> = (props) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <TextInput
            {...props}
            type={show ? "text" : "password"}
            rightSection={
                <ActionIcon 
                    onClick={() => setShow(!show)}
                    style={{
                        backgroundColor: "unset"
                    }}
                >
                    {show ?
                        <IconEye/>
                        :
                        <IconEyeOff/>}
                </ActionIcon>
            }
        />
    )
}

export default PasswordInputCustom;