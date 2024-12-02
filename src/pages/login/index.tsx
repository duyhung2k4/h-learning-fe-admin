import React from "react";

import { Button, Stack, Text, TextInput } from "@mantine/core";
import { useLoginMutation } from "@/redux/api/auth";
import { useForm } from "@mantine/form";
import { LoginRequest } from "@/dto/request/auth";
import { useNotification } from "@/hook/notification.hook";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";

import PasswordInputCustom from "@/components/passwordInput";



const Login: React.FC = () => {
    const [login, { isLoading }] = useLoginMutation();
    const noti = useNotification();
    const navigation = useNavigate();

    const formLogin = useForm<LoginRequest>({
        initialValues: {
            username: "",
            password: "",
        },
        validate: {
            username: value => value.length === 0 ? "" : null,
            password: value => value.length === 0 ? "" : null,
        }
    })

    const handleLogin = async (values: LoginRequest) => {
        const result = await login(values);

        if("error" in result) {
            noti.error("Đăng nhập thất bại");
            return;
        }

        navigation(ROUTER.HOME.href);
    }




    return (
        <>
            <Text size="36px" fw={600}>Đăng nhập</Text>
            <Text>Trang quản lí khóa học của riêng bạn</Text>
            <form id="login" onSubmit={formLogin.onSubmit(handleLogin)}>
                <Stack gap={16} mt={24}>
                    <TextInput
                        placeholder="Email"
                        {...formLogin.getInputProps("username")}
                    />
                    <PasswordInputCustom
                        placeholder="Mật khẩu"
                        {...formLogin.getInputProps("password")}
                    />
                </Stack>
            </form>

            <Button
                mt={24}
                loading={isLoading}
                disabled={isLoading}
                type="submit"
                form="login"
            >Đăng nhập</Button>
        </>
    )
}

export default Login;