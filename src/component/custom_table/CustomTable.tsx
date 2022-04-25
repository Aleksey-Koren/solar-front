import React from "react";
import styles from "./Styles.module.css";
import {Product} from "../../model/product/Product";
import {processHeader, processRowElement} from "./utils";

export interface IElementWithId {
    id: number
}

export interface IColumnDescription {
    dataField: string,
    text: string
    hidden?: boolean;
}

interface IProps<T> {
    headers: Array<IColumnDescription>;
    data: Array<T>;
}

export const CustomTable: React.FC<IProps<any>> = (props) => {

    return (<div>
        <table className={styles.table}>
            <thead>
                {props.headers.map(s => <th><span>{processHeader(s)}</span></th>)}
            </thead>
            <tbody>
                {props.data.map(row =>
                    <tr>
                        {props.headers.map(header => <td>{processRowElement(header, row)}</td>)}
                    </tr>)}
            </tbody>
        </table>
    </div>)
}