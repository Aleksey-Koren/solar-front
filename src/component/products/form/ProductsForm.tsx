import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {IState} from "../../../index";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Tooltip} from "@mui/material";
import {Product} from "../../../model/product/Product";
import {IProductsState} from "../../../redux/products/productsTypes";
import styles from "./productsForm.module.css";

function ProductsForm() {

    let state: IProductsState | null;
    useSelector((globalState: IState) => state = globalState.products);
    const dispatch = useDispatch();

    const retrieveInitialValues = (): Product => {
        if (state.isCreating) {
            return new Product();
        } else {
            return state.products.filter(product => product.id === state.productId)[0];
        }
    }

    return (

            <Formik
                initialValues={retrieveInitialValues()}
                validationSchema={
                    Yup.object({
                        title: Yup.string().required('Required'),
                        bulk: Yup.number().required('Required'),
                        mass: Yup.number().required('Required'),
                        price: Yup.number().required('Required'),
                        volume: Yup.number().required('Required')
                    })
                }
                onSubmit={() => {}}
            >
                {formik => (
                    <Form>
                        <div className={styles.form_block}>
                            <div className={styles.header_text}>
                                <h2>{state.isCreating ? "CREATE PRODUCT" : "UPDATE PRODUCT"}</h2>
                            </div>
                            <div className={styles.login_form__fields}>
                                <div className={styles.login_form__input}>
                                    <Tooltip title={!!formik.errors.title ? formik.errors.title : ''}
                                             open={!!formik.errors.title && !!formik.touched.title}
                                             placement={"top"} arrow>
                                        <div>
                                            <Field className={styles.input}
                                                   value={state.isEditing ? formik.initialValues.title : ''}
                                                   name="title"
                                                   type="text"
                                                   placeholder={"title"}/>
                                        </div>
                                    </Tooltip>

                                    <Tooltip title={!!formik.errors.bulk ? formik.errors.bulk : ''}
                                             open={!!formik.errors.bulk && !!formik.touched.bulk}
                                             placement={"top"} arrow>
                                        <div>
                                            <Field className={styles.input}
                                                   value={state.isEditing ? formik.initialValues.bulk : ''}
                                                   name="bulk"
                                                   type="number"
                                                   placeholder={"bulk"}/>
                                        </div>
                                    </Tooltip>

                                    <Tooltip title={!!formik.errors.mass ? formik.errors.mass : ''}
                                             open={!!formik.errors.mass && !!formik.touched.mass}
                                             placement={"top"} arrow>
                                        <div>
                                            <Field className={styles.input}
                                                   value={state.isEditing ? formik.initialValues.mass : ''}
                                                   name="mass"
                                                   type="number"
                                                   placeholder={"mass"}/>
                                        </div>
                                    </Tooltip>

                                    <Tooltip title={!!formik.errors.price ? formik.errors.price : ''}
                                             open={!!formik.errors.price && !!formik.touched.price}
                                             placement={"top"} arrow>
                                        <div>
                                            <Field className={styles.input}
                                                   value={state.isEditing ? formik.initialValues.price : ''}
                                                   name="price"
                                                   type="number"
                                                   placeholder={"price"}/>
                                        </div>
                                    </Tooltip>

                                    <Tooltip title={!!formik.errors.volume ? formik.errors.volume : ''}
                                             open={!!formik.errors.volume && !!formik.touched.volume}
                                             placement={"top"} arrow>
                                        <div>
                                            <Field className={styles.input}
                                                   value={state.isEditing ? formik.initialValues.volume : ''}
                                                   name="volume"
                                                   type="number"
                                                   placeholder={"volume"}/>
                                        </div>
                                    </Tooltip>

                                    <div className={styles.login_form__button}>
                                        <button className={styles.login_submit_button} type="submit">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
    );
}

export default ProductsForm;