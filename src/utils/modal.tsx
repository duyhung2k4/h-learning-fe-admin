import React from "react";

import FormCustom, { FormCustomField } from "@/components/form";
import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";



export type OpenModalActionProps = {
    title: React.ReactNode
    fields: FormCustomField[]
    idForm: string
    cb: (values: Record<string, any>) => void
}
export const OpenModalAction = (props: OpenModalActionProps) => modals.openConfirmModal({
    title: <Text>{props.title}</Text>,
    children: (
        <FormCustom
            id={props.idForm}
            fields={props.fields}
            cbSubmit={props.cb}
        />
    ),
    size: "lg",
    closeOnEscape: false,
    closeOnClickOutside: false,
    closeButtonProps: { display: "none" },
    cancelProps: {
        style: {
            padding: 0,
        }
    },
    labels: {
        confirm: <Button type="submit" form={props.idForm}>Xác nhận</Button>,
        cancel: <Button type="submit" color="red" form={`${props.idForm}-clear`}>Hủy</Button>,
    },
});



export type OpenModalConfirmProps = {
    title: React.ReactNode
    text: React.ReactNode
    idForm: string
    cb: () => void
}
export const OpenModalConfirm = (props: OpenModalConfirmProps) => modals.openConfirmModal({
    title: <Text>{props.title}</Text>,
    children: <form id={props.idForm} onSubmit={props.cb}>{props.text}</form>,
    size: "md",
    closeOnEscape: false,
    closeOnClickOutside: false,
    closeButtonProps: { display: "none" },
    cancelProps: {
        style: {
            padding: 0,
        }
    },
    labels: {
        confirm: <Button type="submit" form={props.idForm}>Xác nhận</Button>,
        cancel: <Button color="red">Hủy</Button>,
    },
});