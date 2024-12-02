import React from "react";

import { Button, Checkbox, Grid, Stack, Text, TextInput } from "@mantine/core";
import { useRegisterMutation } from "@/redux/api/auth";
import { useForm } from "@mantine/form";
import { RegisterRequest } from "@/dto/request/auth";
import { useNotification } from "@/hook/notification.hook";
import { useNavigate } from "react-router";
import { ROUTER } from "@/constants/router";
import { useMediaQuery } from "@mantine/hooks";

import textClasses from "@/styles/text.module.css";
import PasswordInputCustom from "@/components/passwordInput";
import themeOverride from "@/themes/overrideTheme";



const Register: React.FC = () => {

    const [register, { isLoading }] = useRegisterMutation();
    const noti = useNotification();
    const navigation = useNavigate();
    const matches = useMediaQuery(`(max-width: ${themeOverride.breakpoints?.md}`);

    const formRegister = useForm<RegisterRequest & { repeatPassword: string }>({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            repeatPassword: "",
        },
        validate: {
            firstName: (value) => value.length === 0 ? "Chưa nhập họ, tên đệm" : null,
            lastName: (value) => value.length === 0 ? "Chưa nhập tên" : null,
            password: (value) => value.length < 8 ? "Mật khẩu phải dài hơn 8 kí tự" : null,
            repeatPassword: (value, values) => value != values.password ? "Mật khẩu không trùng khớp" : null,
            phone: (value) => {
                if (value.length === 0) return "Điền số điện thoại";
                const phoneRegex = /^(?:\+84|0)(?:\d{9}|\d{8})$/;
                return phoneRegex.test(value) ? null : "Số điện thoại không hợp lệ";
            },
            email: (value) => {
                if (value.length === 0) return "Điền email";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value) ? null : "Email không hợp lệ";
            },
        }
    })

    const handleRegister = async (values: RegisterRequest) => {
        const result = await register(values);

        if ("error" in result) {
            noti.error("Đăng kí thất bại!");
        }

        navigation(ROUTER.ACCEPT_CODE.href);
    }



    return (
        <>
            <Text size="36px" fw={600}>Tạo tài khoản</Text>
            <Text>
                Bạn đã chưa tài khoản?&nbsp;
                <span onClick={() => navigation(ROUTER.LOGIN.href)} className={textClasses.high_light}>Đăng nhập</span>
            </Text>

            <form id="register" onSubmit={formRegister.onSubmit(handleRegister)}>
                <Stack gap={16} mt={24}>
                    <Grid w={"100%"}>
                        <Grid.Col span={matches ? 12 : 6}>
                            <TextInput
                                placeholder="Họ, tên đệm"
                                {...formRegister.getInputProps("lastName")}
                            />
                        </Grid.Col>
                        <Grid.Col span={matches ? 12 : 6}>
                            <TextInput
                                placeholder="Tên"
                                {...formRegister.getInputProps("firstName")}
                            />
                        </Grid.Col>
                    </Grid>
                    <TextInput
                        placeholder="Số điện thoại"
                        {...formRegister.getInputProps("phone")}
                    />
                    <TextInput
                        placeholder="Email"
                        {...formRegister.getInputProps("email")}
                    />
                    <PasswordInputCustom
                        placeholder="Mật khẩu"
                        {...formRegister.getInputProps("password")}
                    />
                    <PasswordInputCustom
                        placeholder="Xác nhận mật khẩu"
                        {...formRegister.getInputProps("repeatPassword")}
                    />
                </Stack>
            </form>

            <Checkbox
                label="I agree to sell my privacy"
            />

            <Button
                mt={24}
                loading={isLoading}
                disabled={isLoading}
                type="submit"
                form="register"
            >Đăng kí</Button>
        </>
    )
}

export default Register;