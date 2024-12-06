import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { Button, Group, Modal, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { EditCourseContext, TypeEditCourseContext } from "..";
import { useNotification } from "@/hook/notification.hook";
import { CreateLessionReq } from "@/dto/request/lession";
import { LessionContext, TypeLessionContext } from ".";
import { useCreateLessionMutation } from "@/redux/api/lession";



export type ModalCreateLessionRefProps = {
    changeStatusModal: (s: boolean) => void
}

export type ModalCreateLessionProps = {}

const ModalCreateLession = forwardRef<ModalCreateLessionRefProps, ModalCreateLessionProps>((_, ref) => {

    const { course, refetchChapters } = useContext<TypeEditCourseContext>(EditCourseContext);
    const { curChapter, setCurChapter } = useContext<TypeLessionContext>(LessionContext);
    if (!course) return;

    const noti = useNotification();

    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<CreateLessionReq>({
        initialValues: {
            name: "",
            description: "",
            chapterId: 0,
            courseId: course.ID,
        },
        validate: {
            name: (value) => value.length === 0 ? "Chưa nhập tên bài học" : null,
        }
    })

    const [post, { isLoading }] = useCreateLessionMutation();

    const handleCreateChapter = async (values: CreateLessionReq) => {
        if (values.courseId === 0) {
            noti.error("Lấy ID khóa học bị lỗi");
            return;
        }
        if (!curChapter?.ID) {
            noti.error("Lấy ID Chương bị lỗi");
            return;
        }

        const payload: CreateLessionReq = {
            ...values,
            chapterId: curChapter.ID,
        }

        const result = await post(payload);
        if ("error" in result) {
            noti.error("Tạo bài học thất bại");
            return;
        };

        setOpen(false);
        form.reset();
        noti.success("Tạo bài học thành công");
        setCurChapter(null);
        refetchChapters();
    }

    const handleClose = () => {
        setOpen(false);
        setCurChapter(null);
    }

    useImperativeHandle(ref, () => ({
        changeStatusModal: (s) => setOpen(s),
    }))



    return (
        <>
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                title="Thêm mới Bài học"
            >
                <form id="create-lession" onSubmit={form.onSubmit(handleCreateChapter)}>
                    <Stack gap={4}>
                        <Textarea
                            autosize
                            label="Tên bài học"
                            placeholder="Ví dụ: Chương 1: Giới thiệu..."
                            {...form.getInputProps("name")}
                        />
                        <Textarea
                            autosize
                            label="Mô tả"
                            placeholder="Ví dụ: Bài này giới thiệu về..."
                            {...form.getInputProps("description")}
                        />

                        <Group justify="end" w={"100%"} mt={24}>
                            <Button
                                variant="outline"
                                onClick={handleClose}
                            >Hủy</Button>
                            <Button
                                type="submit"
                                form="create-lession"
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

export default ModalCreateLession;