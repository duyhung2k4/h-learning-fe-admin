import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { Grid, Group, Image, Stack, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconTrash } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileRejection, FileWithPath } from '@mantine/dropzone';

import classes from "./styles.module.css";


export type DropzoneCustomProps = {
    dropzoneProps: Partial<DropzoneProps>
    defaultFile?: File[]
    title?: React.ReactNode
    multiple?: boolean
    onDrop: (files: FileWithPath[]) => void
    onReject?: ((fileRejections: FileRejection[]) => void)
}

export type DropzoneCustomRef = {
    changeFiles: (files: File[]) => void;
};

const DropzoneCustom = forwardRef<DropzoneCustomRef, DropzoneCustomProps>((props, ref) => {
    const [files, setFiles] = useState<File[]>([]);

    const changeFiles = (files: File[]) => {
        setFiles(files);
    };

    useImperativeHandle(ref, () => ({
        changeFiles: changeFiles,
    }));

    useEffect(() => {
        if(props.defaultFile) {
            setFiles(props.defaultFile);
        }
    }, []);
    


    return (
        <Dropzone
            onDrop={(files) => {
                props.onDrop(files);
                setFiles(files);
            }}
            onReject={props.onReject}
            maxSize={5 * 1024 ** 2}
            multiple={props.multiple || false}
            accept={[
                'image/png',
                'image/jpeg',
                'image/svg+xml',
                'image/gif',
              ]}
            {...props.dropzoneProps}
            classNames={{
                inner: classes.inner
            }}
        >
            {files.length === 0 &&
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            {props.title || "Kéo hình ảnh vào đây"}
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            Thêm hình ảnh vào đây, kích thước ảnh không quá 5mb
                        </Text>
                    </div>
                </Group>
            }

            <Stack w={"100%"} justify="center" align="center" style={{ zIndex: 10 }}>

                {files.length > 1 &&
                    <Grid>
                        {
                            files.map((f, i) => {
                                const img = URL.createObjectURL(f);
                                return (
                                    <Grid.Col key={i} span={4}>
                                        <Group pos={"relative"}>
                                            <IconTrash size={24} style={{ position: "absolute", zIndex: 2 }} />
                                            <Image
                                                src={img}
                                                className={classes.thumnails}
                                            />
                                        </Group>
                                    </Grid.Col>
                                )
                            })
                        }
                    </Grid>
                }

                {files.length === 1 &&
                    <Image
                        src={URL.createObjectURL(files[0])}
                        className={classes.thumnail}
                    />
                }
            </Stack>
        </Dropzone>
    );
})

export default DropzoneCustom;