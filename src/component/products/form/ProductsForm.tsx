import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {IState} from "../../../index";
import {Field, Form, Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {Tooltip} from "@mui/material";
import {Product} from "../../../model/product/Product";
import {IProductsState} from "../../../redux/products/productsTypes";
import styles from "./productsForm.module.css";
import {fetchProductsAction, saveProductAction} from "../../../redux/products/productActions";
import {Builder} from "builder-pattern";

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

    const onSubmit = (values: Product, actions: FormikHelpers<Product>) => {

        const product: Product = Builder(Product)
            .id(values.id)
            .title(values.title)
            .image(null)
            .bulk(values.bulk)
            .price(values.price)
            .mass(values.mass)
            .volume(values.volume)
            .build();

        dispatch(saveProductAction(product))
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
            onSubmit={onSubmit}
        >
            {formik => (
                <Form>
                    <div className={styles.form_block}>
                        <div className={styles.header_text}>
                            <h2>{state.isCreating ? "CREATE PRODUCT" : "UPDATE PRODUCT"}</h2>
                        </div>
                        <div className={styles.input_block}>
                            <div>
                                <label className={styles.input_label}>Title:</label>
                            </div>
                            <div className={styles.input_block_spacer}/>
                            <div>
                                <Tooltip title={!!formik.errors.title ? formik.errors.title : ''}
                                         open={!!formik.errors.title && !!formik.touched.title}
                                         placement={"top"} arrow>
                                    <div>
                                        <Field className={styles.input}
                                               value={formik.values.title}
                                               name="title"
                                               type="text"
                                               placeholder={"title"}/>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>

                        <div className={styles.input_block}>
                            <div>
                                <label className={styles.input_label}>Bulk:</label>
                            </div>
                            <div className={styles.input_block_spacer}/>
                            <div>
                                <Tooltip title={!!formik.errors.bulk ? formik.errors.bulk : ''}
                                         open={!!formik.errors.bulk && !!formik.touched.bulk}
                                         placement={"top"} arrow>
                                    <div>
                                        <Field className={styles.input}
                                               value={formik.values.bulk}
                                               name="bulk"
                                               type="number"
                                               placeholder={"bulk"}/>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>

                        <div className={styles.input_block}>
                            <div>
                                <label className={styles.input_label}>Mass:</label>
                            </div>
                            <div className={styles.input_block_spacer}/>
                            <div>
                                <Tooltip title={!!formik.errors.mass ? formik.errors.mass : ''}
                                         open={!!formik.errors.mass && !!formik.touched.mass}
                                         placement={"top"} arrow>
                                    <div>
                                        <Field className={styles.input}
                                               value={formik.values.mass}
                                               name="mass"
                                               type="number"
                                               placeholder={"mass"}/>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>

                        <div className={styles.input_block}>
                            <div>
                                <label className={styles.input_label}>Price:</label>
                            </div>
                            <div className={styles.input_block_spacer}/>
                            <div>
                                <Tooltip title={!!formik.errors.price ? formik.errors.price : ''}
                                         open={!!formik.errors.price && !!formik.touched.price}
                                         placement={"top"} arrow>
                                    <div>
                                        <Field className={styles.input}
                                               value={formik.values.price}
                                               name="price"
                                               type="number"
                                               placeholder={"price"}/>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>

                        <div className={styles.input_block}>
                            <div>
                                <label className={styles.input_label}>Volume:</label>
                            </div>
                            <div className={styles.input_block_spacer}/>
                            <div>
                                <Tooltip title={!!formik.errors.volume ? formik.errors.volume : ''}
                                         open={!!formik.errors.volume && !!formik.touched.volume}
                                         placement={"top"} arrow>
                                    <div>
                                        <Field className={styles.input}
                                               value={formik.values.volume}
                                               name="volume"
                                               type="number"
                                               placeholder={"volume"}/>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={styles.input_block}>
                            <div>
                                <button className={styles.button} type="button" onClick={
                                    () => dispatch(fetchProductsAction(0, 10))
                                }>Back</button>
                            </div>
                            <div>
                                <button className={styles.button} type="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
            {state.isEditing
                ?
                <button className={styles.create_button} onClick={() => props.goToCreateProductAction()}>
                    Create NEW
                </button>
                : null
            }

        </Formik>


    );
}

export default ProductsForm;