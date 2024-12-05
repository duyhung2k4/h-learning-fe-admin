import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { Button, Group, Modal, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CreateChapterReq } from "@/dto/request/chapter";
import { EditCourseContext, TypeEditCourseContext } from "..";
import { useCreateChapterMutation } from "@/redux/api/chapter";
import { useNotification } from "@/hook/notification.hook";



export type ModalCreateChapterRefProps = {
    changeStatusModal: (s: boolean) => void
}

export type ModalCreateChapterProps = {}

const ModalCreateChapter = forwardRef<ModalCreateChapterRefProps, ModalCreateChapterProps>((_, ref) => {

    const { course, refetchChapters } = useContext<TypeEditCourseContext>(EditCourseContext);
    if(!course) return;

    const noti = useNotification();

    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<CreateChapterReq>({
        initialValues: {
            name: "",
            description: "",
            courseId: course.ID,
        },
        validate: {
            name: (value) => value.length === 0 ? "Chưa nhập tên khóa học" : null,
        }
    })

    const [post, { isLoading }] = useCreateChapterMutation();

    const handleCreateChapter = async (values: CreateChapterReq) => {
        if(values.courseId === 0) {
            noti.error("Lấy ID khóa học bị lỗi");
            return;
        }

        const result = await post(values);
        if("error" in result) {
            noti.error("Tạo khóa học thất bại");
            return;
        };

        setOpen(false);
        form.reset();
        noti.success("Tạo khóa học thành công");
        refetchChapters();
    }

    useImperativeHandle(ref, () => ({
        changeStatusModal: (s) => setOpen(s),
    }))

    return (
        <>
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                title="Thêm mới Chương"
            >
                <form id="create-chapter" onSubmit={form.onSubmit(handleCreateChapter)}>
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
                                onClick={() => setOpen(false)}
                            >Hủy</Button>
                            <Button
                                type="submit"
                                form="create-chapter"
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

export default ModalCreateChapter;