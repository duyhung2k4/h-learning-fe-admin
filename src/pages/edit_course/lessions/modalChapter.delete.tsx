import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { LessionContext, TypeLessionContext } from ".";
import { useDeleteChapterMutation } from "@/redux/api/chapter";
import { useNotification } from "@/hook/notification.hook";
import { EditCourseContext, TypeEditCourseContext } from "..";



export type ModalDeleteChapterRefProps = {
    changeStatusModal: (value: boolean) => void
}

export type TypeModalDeleteChapterProps = {}

const ModalDeleteChapter = forwardRef<ModalDeleteChapterRefProps, TypeModalDeleteChapterProps>((_, ref) => {

    const { refetchChapters } = useContext<TypeEditCourseContext>(EditCourseContext);
    const { curChapter, setCurChapter } = useContext<TypeLessionContext>(LessionContext);
    const [open, setOpen] = useState<boolean>(false);

    const [del, { isLoading }] = useDeleteChapterMutation();
    const noti = useNotification();

    const handleClose = () => {
        setOpen(false);
        setCurChapter(null);
    }

    const handleDeleteChapter = async () => {
        if (!curChapter?.ID) {
            noti.error("Lấy dữ liệu thất bại");
            return;
        }

        const result = await del({ id: curChapter.ID });
        if ("error" in result) {
            noti.error("Xóa chương học thất bại");
            return;
        }

        setCurChapter(null);
        setOpen(false);
        noti.success("Xóa chương học thành công");
        refetchChapters();
    }

    useImperativeHandle(ref, () => ({
        changeStatusModal: (s) => setOpen(s),
    }))



    return (
        <Modal
            opened={open}
            onClose={() => setOpen(false)}
            title="Xóa chương học"
        >
            <Stack w={"100%"}>
                <Text>Xác nhận xóa chương: {curChapter?.name}</Text>

                <Group justify="end" w={"100%"} mt={24}>
                    <Button
                        variant="outline"
                        onClick={handleClose}
                    >Hủy</Button>
                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={handleDeleteChapter}
                    >Xác nhận</Button>
                </Group>
            </Stack>
        </Modal>
    )
})

export default ModalDeleteChapter;