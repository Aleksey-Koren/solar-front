import {IColumnDescription} from "./CustomTable";

export function processHeader(header: IColumnDescription) {
    return !header.hidden ? header.text : null;
}
export function processRowElement(header: IColumnDescription, row:any) {
    return !header.hidden ? row[header.dataField] : null;
}