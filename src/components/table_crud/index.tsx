import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import TableCustom from "@/components/table";
import dayjs from "dayjs";

import { IconPencilMinus, IconPlus, IconReload, IconTrash } from "@tabler/icons-react";
import { Button, Group, Stack, Tooltip } from "@mantine/core";
import { OpenModalAction, OpenModalConfirm } from "@/utils/modal";
import { DEFAULT_QUERY_DATA, useQueryMutation } from "@/redux/api/query";
import { FormCustomField } from "@/components/form";
import { MRT_ColumnDef } from "mantine-react-table";
import { SIZE } from "@/constants/size";



export type TableCRUDCellProps = Record<string, (item: Record<string, any>) => React.ReactNode>;

export type TableCRUDProps = {
    model: string
    fields: FormCustomField[]
    cells: TableCRUDCellProps
    isLoading?: boolean
    condition?: string
    args?: any[]
    hide?: string[]
    preload?: string[]
    omit?: Record<string, string[]>
    isOption?: boolean
    isAction?: boolean
    options?: ((values: Record<string, any>) => React.ReactNode)[]
    defaultAction?: boolean
}

const TableCRUD = forwardRef<any, TableCRUDProps>((props, ref) => {
    const [query, { isLoading }] = useQueryMutation();
    const [datas, setDatas] = useState<Record<string, any>[]>([]);



    // Field
    const { fields, columns } = useMemo(() => {
        const fields: FormCustomField[] = props.fields;

        const columns: MRT_ColumnDef<Record<string, any>>[] = [
            ...fields.filter(f => f.isCol !== false).map(f => {
                const c: MRT_ColumnDef<Record<string, any>> = {
                    accessorKey: f.name,
                    header: `${f.data.label}`,
                }

                if (props.cells?.[f.name]) {
                    c.Cell = p => {
                        const Item = props.cells?.[f.name];
                        if (!Item) return <></>;

                        const value = p.cell.row.original;
                        return <Item {...value} />
                    }
                }

                return c;
            }),
        ]

        if (props.isOption !== false) {
            columns.push(...[
                {
                    accessorKey: "action",
                    header: "Tác vụ",
                    Cell: (propsCell) => {
                        return (
                            <Group style={{ cursor: "pointer" }}>
                                {
                                    props.defaultAction === false ? <></> :
                                        <>
                                            <Tooltip label="Xóa">
                                                <IconTrash
                                                    color="red"
                                                    onClick={() => {
                                                        const item = propsCell.cell.row.original;
                                                        if (!item?.ID) return;

                                                        OpenModalConfirm({
                                                            title: "Xác nhận xóa",
                                                            text: <>Bạn thật sự muốn xóa dữ liệu</>,
                                                            idForm: "delete-department",
                                                            cb: () => handleDelete(item.ID as number)
                                                        });
                                                    }}
                                                />
                                            </Tooltip>
                                            <Tooltip label="Chỉnh sửa">
                                                <IconPencilMinus
                                                    color="blue"
                                                    onClick={() => {
                                                        const item = propsCell.cell.row.original;
                                                        if (!item?.ID) return;
                                                        fields.forEach((f) => {
                                                            switch (f.type) {
                                                                case "tag":
                                                                    f.data = {
                                                                        ...f.data,
                                                                        defaultValue: item[f.name] || []
                                                                    }
                                                                    break;
                                                                case "date":
                                                                    f.data = {
                                                                        ...f.data,
                                                                        defaultValue: item[f.name] ? dayjs(item[f.name]).toDate() : null
                                                                    }
                                                                    break;
                                                                default:
                                                                    f.data = {
                                                                        ...f.data,
                                                                        defaultValue: item[f.name],
                                                                    }
                                                                    break;
                                                            }
                                                        })

                                                        OpenModalAction({
                                                            title: "Chỉnh sửa",
                                                            fields: fields.filter(f => f.isField !== false),
                                                            idForm: "update-department",
                                                            cb: (values) => handleUpdate(item.ID as number, values)
                                                        });
                                                    }}
                                                />
                                            </Tooltip>
                                        </>
                                }
                                {
                                    props.options?.map((p, i) => (
                                        <React.Fragment key={i}>
                                            {p(propsCell.cell.row.original)}
                                        </React.Fragment>
                                    ))
                                }
                            </Group>
                        )
                    }
                }
            ] as MRT_ColumnDef<Record<string, any>>[])
        }

        return {
            fields: fields.filter(f => f.isField !== false),
            columns,
        };
    }, [datas, props.fields, props.cells]);



    // Handle
    const handleGet = async () => {
        const result = await query({
            model: props.model,
            data: {
                ...DEFAULT_QUERY_DATA,
                method: "get_all",
                condition: props.condition || "",
                args: props.args || [],
                preload: props.preload || [],
                omit: props.omit || {},
            }
        });

        if ("error" in result) return;
        const data = result.data.data as Record<string, any>[];
        setDatas(data || []);
    }

    const handleCreate = async (values: Record<string, any>) => {
        const result = await query({
            model: props.model,
            data: {
                ...DEFAULT_QUERY_DATA,
                method: "create",
                data: values,
            }
        });

        if ("error" in result) return;

        const data = result.data.data as Record<string, any>;
        setDatas([...datas, data]);
    }

    const handleUpdate = async (id: number, values: Record<string, any>) => {
        const result = await query({
            model: props.model,
            data: {
                ...DEFAULT_QUERY_DATA,
                method: "update",
                data: values,
                condition: "id = ?",
                args: [id],
                preload: props.preload || [],
                omit: props.omit || {},
            },
        });

        if ("error" in result) return;
        const data = result.data.data as Record<string, any>;
        setDatas(datas.map(d => d.ID === data.ID ? data : d));
    }

    const handleDelete = async (id: number) => {
        const result = await query({
            model: props.model,
            data: {
                ...DEFAULT_QUERY_DATA,
                method: "delete",
                data: {},
                condition: "id = ?",
                args: [id],
            },
        });

        if ("error" in result) return;
        setDatas(datas.filter(d => d.ID !== id));
    }



    // Init
    useEffect(() => {
        handleGet();
    }, []);

    useImperativeHandle(ref, () => ({
        changeData: (newData: Record<string, any>) => {
            setDatas(datas.map(d => d?.ID === newData?.ID ? newData : d));
        }
    }));



    return (
        <Stack w={"100%"}>
            <TableCustom
                columns={columns}
                data={datas}
                hide={props.hide}
                loading={isLoading || props.isLoading}
                maxHeight={`calc(100vh - ${SIZE.h_header} - ${SIZE.t_toolbar} - ${SIZE.t_header} - ${SIZE.t_footer})`}
                action={
                    props.isAction !== false ?
                        <Group>
                            <Button
                                onClick={() => OpenModalAction({
                                    title: "Thêm mới",
                                    fields,
                                    idForm: "create-department",
                                    cb: handleCreate,
                                })}
                                leftSection={<IconPlus />}
                                color="green"
                            >Thêm</Button>
                            <Button
                                onClick={handleGet}
                                leftSection={<IconReload />}
                            >Tải lại</Button>
                        </Group>
                        : <Group></Group>
                }
            />
        </Stack>
    )
})

export default TableCRUD;