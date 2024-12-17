import React, { useState } from "react";
import { ActionIcon, PasswordInput, PasswordInputProps } from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";


export type PasswordInputCustomProps = PasswordInputProps;

const PasswordInputCustom: React.FC<PasswordInputCustomProps> = (props) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <PasswordInput
            {...props}
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