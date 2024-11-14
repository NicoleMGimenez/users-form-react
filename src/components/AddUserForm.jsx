import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createUserThunk } from '../store/users/users.thunks';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export const AddUserForm = ({close}) => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state?.users?.users);
    const toast = useRef(null);
    //const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object().shape({
        username: Yup.string().max(15, 'El usuario no debe tener más de 15 caracteres.').required('Debe ingresar un usuario.'),
        name: Yup.string().required('Debe ingresar su nombre.'),
        email: Yup.string().required('Debe ingresar su correo.').email('Debe ser un correo valido.'),
        city: Yup.string(),
        phone: Yup.string().required('Debe ingresar un número de contacto')
        //.matches(phoneRegExp, 'El número de contacto no es valido.')
    });

    const initialValues = {
        username: '',
        name: '',
        email: '',
        city: 'San Salvador de Jujuy',
        phone: ''
    };

    const accept = (values) => {
        const lastUserAPI = users[users.length - 1]?.id || 0;

        const newUser = {
            id: lastUserAPI + 1,
            name: values.name,
            username: values.username,
            email: values.email,
            address: {
                city: values.city
            },
            phone: values.phone
        };

        dispatch(createUserThunk(newUser));
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Usuario añadido con éxito', life: 3000 });
        setTimeout(() => { close(false); }, 1000);
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Operación cancelada', life: 3000 });
    };

    const confirm1 = (values) => {
        confirmDialog({
            message: '¿Está seguro de añadir este usuario?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept: () => accept(values),
            reject
        });
    };

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema}>
                {({ dirty, isValid, errors, touched, values }) => (
                    <Form>
                        <div className="grid">
                            <div className="col-12">
                                <label className="font-semibold">Nombre completo</label><br />
                                <div className="field">
                                    <Field
                                        id="name"
                                        name="name"
                                        as={InputText}
                                        className={`mt-2 w-full ${touched.name && errors.name ? 'p-invalid' : ''}`}
                                    />
                                    {touched.name && errors.name && <div className="p-error text-xs">{errors.name}</div>}
                                </div>

                                <div className="formgrid grid">
                                    <div className="field col">
                                        <label className="font-semibold">Nombre de usuario</label>
                                        <Field
                                            id="username"
                                            name="username"
                                            as={InputText}
                                            className={`mt-2 w-full ${touched.username && errors.username ? 'p-invalid' : ''}`}
                                        />
                                        {touched.username && errors.username && <div className="p-error text-xs">{errors.username}</div>}
                                    </div>
                                    <div className="field col">
                                        <label className="font-semibold">Correo electrónico</label><br />
                                        <Field
                                            id="email"
                                            name="email"
                                            as={InputText}
                                            className={`mt-2 w-full ${touched.email && errors.email ? 'p-invalid' : ''}`}
                                        />
                                        {touched.email && errors.email && <div className="p-error text-xs">{errors.email}</div>}
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="font-semibold">Ciudad de residencia</label><br />
                                    <Field
                                        id="city"
                                        name="city"
                                        as={InputText}
                                        className={`mt-2 w-full ${touched.city && errors.city ? 'p-invalid' : ''}`}
                                    />
                                    {touched.city && errors.city && <div className="p-error text-xs">{errors.city}</div>}
                                </div>

                                <div className="field">
                                    <label className="font-semibold">Telefono de contacto</label><br />
                                    <Field
                                        id="phone"
                                        name="phone"
                                        as={InputText}
                                        className={`mt-2 w-full ${touched.phone && errors.phone ? 'p-invalid' : ''}`}
                                        
                                    />
                                    {touched.phone && errors.phone && <div className="p-error text-xs">{errors.phone}</div>}
                                </div>

                                <div className="flex justify-content-end flex-wrap">
                                    <div className="flex align-items-center justify-content-center border-round">
                                        <Button
                                            rounded
                                            className='mb-3'
                                            type="button"
                                            label="Registrar nuevo usuario"
                                            onClick={() => confirm1(values)}
                                            disabled={!dirty || !isValid}
                                            style={{ backgroundColor: '#350182', borderColor: 'white' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <Toast ref={toast} />
            <ConfirmDialog />
        </>
    );
};
