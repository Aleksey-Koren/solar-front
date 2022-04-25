import React from "react";
import styles from "./Styles.module.css";
import {Product} from "../../model/product/Product";

export interface IColumnDescription {
    dataField: string,
    text: string
}

interface IProps<T> {
    headers: Array<IColumnDescription>;
    data: Array<T>;
}

export const CustomTable: React.FC<IProps<any>> = (props) => {

    return (<div>
        <table className={styles.table}>
            <thead>
            {props.headers.map(s => {
                return <th><span>{s.text}</span></th>
            })}
            </thead>
            <tbody>
            {props.data.map(row => {
                return <tr>{
                    props.headers.map(header => <td>{row[header.dataField]}</td>)
                }</tr>
            })}
            </tbody>
        </table>
    </div>)
}