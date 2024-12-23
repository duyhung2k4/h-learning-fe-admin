import {
    Icon,
    IconAlignBoxLeftBottom,
    IconHome,
    IconLayoutDashboard,
    IconProps,
} from "@tabler/icons-react"

export type ObjectRouter = {
    href: string
    name?: string
    type: "public" | "protected"
    icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
    hash?: Record<string, string>
}

export type FieldRouter =
    | "LOGIN"
    | "HOME"
    | "DASH_BOARD"
    | "MANAGER_COURSE"
    | "CREATE_COURSE"
    | "EDIT_COURSE"
    | "EDIT_LESSION"
export const ROUTER: Record<FieldRouter, ObjectRouter> = {
    LOGIN: {
        href: "/login",
        type: "public",
        name: "Đăng nhập",
    },
    HOME: {
        href: "/",
        type: "protected",
        name: "Trang chủ",
        icon: IconHome
    },
    DASH_BOARD: {
        href: "/dashboard",
        type: "protected",
        name: "Thống kê",
        icon: IconLayoutDashboard
    },
    MANAGER_COURSE: {
        href: "/manage-course",
        type: "protected",
        name: "Quản lí khóa học",
        icon: IconAlignBoxLeftBottom
    },
    CREATE_COURSE: {
        href: "/create-course",
        type: "protected",
        name: "Thêm mới khóa học",
    },
    EDIT_COURSE: {
        href: "/edit-course/:id",
        type: "protected",
        name: "Chỉnh sửa khóa học",
        hash: {
            baseInfo: "#base-info",
            lessions: "#lessions",
            vouchers: "#vouchers"
        }
    },
    EDIT_LESSION: {
        href: "/edit-lession/:id",
        type: "protected",
        name: "Chỉnh sửa bài học",
        hash: {
            baseInfo: "#base-info",
            document: "#document",
            video: "#video",
            quizz: "#quizz",
        }
    }
}