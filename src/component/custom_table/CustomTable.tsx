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
                <tr>
                    {props.headers.map(s => <th key={s.text}><span>{processHeader(s)}</span></th>)}
                </tr>
            </thead>
            <tbody>
                {props.data.map(row =>
                    <tr key={row.id}>
                        {props.headers.map(header => <td key={header.text}>{processRowElement(header, row)}</td>)}
                    </tr>)}
            </tbody>
        </table>
        {/*<div className={styles.pagination_controller}>*/}
        {/*    <div className={styles.pagination_button}>{"<<"}</div>*/}
        {/*    <div className={styles.pagination_button}>1</div>*/}
        {/*    <div className={styles.pagination_button}>2</div>*/}
        {/*    <div className={styles.pagination_button}>3</div>*/}
        {/*    <div className={styles.pagination_button}>{">>"}</div>*/}
        {/*</div>*/}

    </div>)
}