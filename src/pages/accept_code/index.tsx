import React, { useState } from "react";

import { Button, Text, TextInput } from "@mantine/core";
import { useAcceptCodeMutation } from "@/redux/api/auth";
import { useNotification } from "@/hook/notification.hook";
import { TOKEN_TYPE } from "@/model/variable";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";

import Cookies from "js-cookie";



const AcceptCode: React.FC = () => {

    const noti = useNotification();
    const navigation = useNavigate();

    const [code, setCode] = useState<string>("");
    const [accept, { isLoading }] = useAcceptCodeMutation();

    const handleAcceptCode = async () => {
        const result = await accept({ code });

        if("error" in result) {
            noti.error("Mã xác nhận không chính xác");
            return;
        }

        Cookies.remove(TOKEN_TYPE.CODE_TOKEN);
        navigation(ROUTER.LOGIN.href);
    }



    return (
        <>
            <Text size="36px" fw={600}>Nhập mã xác nhận</Text>
            <Text>Mã xác nhận được gửi tới email đăng kí</Text>
            
            <TextInput
                placeholder="Điền mã xác nhận vào đây"
                value={code}
                onChange={e => setCode(e.target.value)}
                styles={{
                    input: {
                        textAlign: "center"
                    }
                }}
            />

            <Button
                mt={24}
                onClick={handleAcceptCode}
                loading={isLoading}
                disabled={isLoading}
            >Xác nhận</Button>
        </>
    )
}

export default AcceptCode;