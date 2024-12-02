import React from 'react';

import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
} from 'mantine-react-table';
import { Stack } from '@mantine/core';

import classes from "./style.module.css";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';



export type TableCustomProps = {
    columns: MRT_ColumnDef<Record<string, any>>[]
    data: Record<string, any>[]
    loading?: boolean
    action?: React.ReactNode
    maxHeight?: number | string
    hide?: string[]
};

const TableCustom: React.FC<TableCustomProps> = (props) => {
    const table = useMantineReactTable({
        columns: props.columns,
        data: props.data,
        renderTopToolbarCustomActions: () => {
            return props.action ? <>{props.action}</> : <></>
        },
        state: {
            isLoading: props.loading
        },
        initialState: {
            columnVisibility:
                !props.hide ? {} :
                    props.hide.reduce((prev, cur) => { prev[cur] = false; return prev }, {} as Record<string, boolean>)
        },
        enableStickyHeader: true,
        enableStickyFooter: true,
        mantineTableContainerProps: {
            style: {
                height: props.maxHeight,
                maxHeight: props.maxHeight,
            }
        },
        mantinePaperProps: {
            style: {
                borderRadius: 16
            }
        }
    });

    return (
        <Stack className={classes.root}>
            <MantineReactTable table={table} />
        </Stack>
    );
};

export default TableCustom;