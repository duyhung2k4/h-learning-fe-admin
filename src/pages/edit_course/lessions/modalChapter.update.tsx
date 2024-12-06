import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import { Button, Group, Modal, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UpdateChapterReq } from "@/dto/request/chapter";
import { EditCourseContext, TypeEditCourseContext } from "..";
import { useUpdateChapterMutation } from "@/redux/api/chapter";
import { useNotification } from "@/hook/notification.hook";
import { LessionContext, TypeLessionContext } from ".";



export type ModalUpdateChapterRefProps = {
    changeStatusModal: (s: boolean) => void
}

export type ModalUpdateChapterProps = {}

const ModalUpdateChapter = forwardRef<ModalUpdateChapterRefProps, ModalUpdateChapterProps>((_, ref) => {
    const { refetchChapters } = useContext<TypeEditCourseContext>(EditCourseContext);
    const { curChapter } = useContext<TypeLessionContext>(LessionContext);

    const noti = useNotification();

    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<UpdateChapterReq>({
        initialValues: {
            id: curChapter?.ID || 0,
            name: curChapter?.name || "",
            description: curChapter?.description || "",
            order: curChapter?.order || 0,
        },
        validate: {
            name: (value) => value.length === 0 ? "Chưa nhập tên chương" : null,
        }
    })

    const [post, { isLoading }] = useUpdateChapterMutation();

    const handleUpdateChapter = async (values: UpdateChapterReq) => {
        if (values.id === 0) {
            noti.error("Lỗi khi lấy dữ liệu");
            return;
        }

        const result = await post(values);
        if ("error" in result) {
            noti.error("Chỉnh sửa chương thất bại");
            return;
        };

        setOpen(false);
        form.reset();
        noti.success("Chỉnh sửa chương thành công");
        refetchChapters();
    }

    const handleClose = () => {
        setOpen(false);
        form.reset();
    }

    useImperativeHandle(ref, () => ({
        changeStatusModal: (s) => setOpen(s),
    }))

    useEffect(() => {
        if (curChapter) {
            form.setValues({
                id: curChapter.ID,
                name: curChapter.name,
                description: curChapter.description,
                order: curChapter.order,
            })
        }
    }, [curChapter]);



    return (
        <>
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                title="Chỉnh sửa Chương"
            >
                <form id="update-chapter" onSubmit={form.onSubmit(handleUpdateChapter)}>
                    <Stack gap={4}>
                        <Textarea
                            autosize
                            label="Tên chương"
                            placeholder="Ví dụ: Chương 1: Giới thiệu..."
                            {...form.getInputProps("name")}
                        />
                        <Textarea
                            autosize
                            label="Mô tả"
                            placeholder="Ví dụ: Chương này giới thiệu về..."
                            {...form.getInputProps("description")}
                        />

                        <Group justify="end" w={"100%"} mt={24}>
                            <Button
                                variant="outline"
                                onClick={handleClose}
                            >Hủy</Button>
                            <Button
                                type="submit"
                                form="update-chapter"
                                loading={isLoading}
                                disabled={isLoading}
                            >Xác nhận</Button>
                        </Group>
                    </Stack>
                </form>
            </Modal>

        </>
    )
})

export default ModalUpdateChapter;