import { 
    Icon,
    IconBrandDatabricks,
    IconCertificate,
    IconHome,
    IconProps,
} from "@tabler/icons-react"

export type ObjectRouter = {
    href: string
    name?: string
    type: "public" | "protected"
    icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
}

export type FieldRouter =
    | "LOGIN"
    | "REGISTER"
    | "ACCEPT_CODE"
    | "HOME"
    | "FIND_COURSE"
    | "MY_COURSE"
export const ROUTER: Record<FieldRouter, ObjectRouter> = {
    LOGIN: {
        href: "/login",
        type: "public",
        name: "Đăng nhập",
    },
    REGISTER: {
        href: "/register",
        type: "public",
        name: "Đăng kí",
    },
    ACCEPT_CODE: {
        href: "/accept-code",
        type: "public",
        name: "Xác nhận otp",
    },
    HOME: {
        href: "/",
        type: "public",
        name: "Trang chủ",
        icon: IconHome
    },
    FIND_COURSE: {
        href: "/find-course",
        type: "public",
        name: "Khóa học",
        icon: IconBrandDatabricks,
    },
    MY_COURSE: {
        href: "/my-course",
        type: "protected",
        name: "Khóa học của tôi",
        icon: IconCertificate,
    }
}