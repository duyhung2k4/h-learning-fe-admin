import React, { useEffect } from "react";
import dayjs from 'dayjs';

import {
    TextInput, TextInputProps,
    Textarea, TextareaProps,
    NumberInput, NumberInputProps,
    Select, SelectProps,
    MultiSelect, MultiSelectProps,
    TagsInput, TagsInputProps,
    Grid,
} from "@mantine/core";
import { DatePickerInput, DatePickerInputProps } from '@mantine/dates';
import { useForm } from "@mantine/form";

import 'dayjs/locale/vi';

dayjs.locale('vi');



const FormCustom: React.FC<FormCustomProps> = (props) => {

    const form = useForm();

    useEffect(() => {
        let initalValue: Record<string, any> = {};

        props.fields.forEach(f => {
            switch (f.type) {
                case "select":
                    initalValue[f.name] = `${f.data.defaultValue}`;
                    break;
                case "multi_select":
                    initalValue[f.name] = f.data.defaultSearchValue || []
                    break;
                case "date":
                    initalValue[f.name] = f.data.defaultValue ? dayjs(f.data.defaultValue) : null
                    break;
                default:
                    initalValue[f.name] = f.data.defaultValue;
                    break;
            }
        })

        form.setValues(initalValue);
    }, [props.fields]);


    const InputComponent = (payload: FormCustomField) => {
        switch (payload.type) {
            case "text":
                return <TextInput {...payload.data} {...form.getInputProps(payload.name)} />;
            case "area":
                return <Textarea {...payload.data} {...form.getInputProps(payload.name)} />;
            case "number":
                return <NumberInput {...payload.data} {...form.getInputProps(payload.name)} />;
            case "date":
                return (
                    <DatePickerInput
                        {...payload.data}
                        {...form.getInputProps(payload.name)}
                        locale="vi"
                        valueFormat="DD/MM/YYYY"
                    />
                );
            case "tag":
                return <TagsInput {...payload.data} {...form.getInputProps(payload.name)} />;
            case "multi_select":
                return (
                    <MultiSelect
                        {...payload.data}
                        {...form.getInputProps(payload.name)}
                    />
                )
            case "select":
                return (
                    <Select
                        {...payload.data}
                        {...form.getInputProps(payload.name)}
                    />
                );
            default:
                return <></>;
        }
    };

    const handleSubmit = (values: Record<string, any>) => {
        props.fields.map(f => {
            if (f.valueType === "number") {
                values[f.name] = Number(values[f.name] || 0);
            }
        })

        props.cbSubmit(values);
        handleClear();
    }

    const handleClear = () => {
        if(props.clear === undefined || props.clear === true) form.reset();
        props.fields.forEach(f => {
            if(!f.noClear) f.data.defaultValue = undefined;
        });
    }



    return (
        <>
            <form id={props.id} onSubmit={form.onSubmit(handleSubmit)}>
                <Grid>
                    {
                        props.fields.map(p =>
                            <Grid.Col key={p.name} span={p.size ? p.size : 6}>
                                {InputComponent(p)}
                            </Grid.Col>
                        )
                    }
                </Grid>
            </form>
            <form id={`${props.id}-clear`} onSubmit={form.onSubmit(handleClear)}></form>
        </>
    )
}

export default FormCustom;

export type FormCustomField =
    | {
        type: "text"
        valueType?: "string" | "number"
        name: string
        isCol?: boolean
        size: number
        isField?: boolean
        noClear?: boolean
        data: TextInputProps
    }
    | {
        type: "area"
        valueType?: "string" | "number"
        name: string
        isCol?: boolean
        size: number
        isField?: boolean
        noClear?: boolean
        data: TextareaProps
    }
    | {
        type: "number"
        valueType?: "string" | "number"
        name: string
        isCol?: boolean
        size: number
        isField?: boolean
        noClear?: boolean
        data: NumberInputProps
    }
    | {
        type: "select"
        valueType?: "string" | "number"
        name: string
        isCol?: boolean
        size: number
        isField?: boolean
        noClear?: boolean
        data: SelectProps
    }
    | {
        type: "multi_select"
        valueType?: "string" | "number"
        name: string
        isCol?: boolean
        size: number
        isField?: boolean
        noClear?: boolean
        data: MultiSelectProps
    }
    | {
        type: "tag"
        valueType?: "string" | "number"
        name: string
        isCol?: boolean
        size: number
        isField?: boolean
        noClear?: boolean
        data: TagsInputProps
    }
    | {
        type: "date"
        valueType?: "string" | "number"
        name: string
        isCol?: boolean
        size: number
        isField?: boolean
        noClear?: boolean
        data: DatePickerInputProps
    }

export type FormCustomProps = {
    id: string
    fields: FormCustomField[]
    cbSubmit: (values: Record<string, any>) => void
    clear?: boolean
}