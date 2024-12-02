import { FormCustomField } from "@/components/form";
import { FieldModel } from "@/model/field";

export class HandleField {
    static convertToFieldsForGET(fields: FieldModel[]): FormCustomField[] {
        let listField: FormCustomField[] = [];

        fields.forEach(f => {
            switch (f.type) {
                case "select":
                    const data = f.defaultValues.map(d => JSON.parse(d) as { label: string, value: string });
                    let fieldSelect: FormCustomField = {
                        type: f.type,
                        name: f.name,
                        size: f.size,
                        data: {
                            data: data.map(d => ({ label: d.label || "", value: d.value || "" })),
                            label: f.label,
                            placeholder: f.placeholder
                        }
                    }
                    listField.push(fieldSelect);
                    break
                case "area":
                    let fieldArea: FormCustomField = {
                        type: f.type,
                        name: f.name,
                        size: f.size,
                        data: {
                            label: f.label,
                            placeholder: f.placeholder,
                            rows: 5
                        }
                    }
                    listField.push(fieldArea);
                    break;
                default:
                    let fieldDefault: FormCustomField = {
                        type: f.type,
                        name: f.name,
                        size: f.size,
                        data: {
                            label: f.label,
                            placeholder: f.placeholder
                        }
                    }
                    listField.push(fieldDefault);
            }
        });

        for(let i = 0; i < listField.length; i++) {
            if(listField[i].name === "result") {
                let c = listField[i];
                listField[i] = listField[listField.length - 1];
                listField[listField.length - 1] = c;
                break;
            }
        }

        return listField
    }
}