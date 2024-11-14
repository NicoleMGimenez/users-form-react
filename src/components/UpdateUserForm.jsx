import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Formik, Form, Field } from 'formik';
import { useState, useEffect, useRef } from "react";
import { updateUserThunk } from "../store/users/users.thunks";
import { useSelector, useDispatch } from 'react-redux';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';

export const UpdateUserForm = ({ user, close }) => {
    const dispatch = useDispatch();
    const toast = useRef(null);

    const validationSchema = Yup.object().shape({
        username: Yup.string().max(15, 'El usuario no debe tener más de 15 caracteres.').required('Debe ingresar un usuario.'),
        name: Yup.string().required('Debe ingresar su nombre.'),
        email: Yup.string().required('Debe ingresar su correo.').email('Debe ser un correo valido.'),
        city: Yup.string(),
        phone: Yup.string().required('Debe ingresar un número de contacto')
    });

    const initialValues = {
        username: user?.username,
        name: user?.name,
        email: user?.email,
        city: user?.address?.city,
        phone: user?.phone
    }

    const accept = (values) => {
        const updatedUser = {
            id: user.id,
            name: values.name,
            username: values.username,
            email: values.email,
            address: {
                city: values.city
            },
            phone: values.phone
        };

        dispatch(updateUserThunk(updatedUser));
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Usuario editado con éxito', life: 3000 });
        setTimeout(() => { close(false); }, 1000);
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Operación cancelada', life: 3000 });
    };

    const confirm = (values) => {
        confirmDialog({
            message: '¿Está seguro que desea editar este usuario?',
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
                {({ dirty, isValid, errors, touched, values, resetForm, setFieldValue }) => (
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
                                            label="Actualizar usuario"
                                            disabled={!dirty || !isValid}
                                            onClick={() => confirm(values)}
                                            style={{ backgroundColor: '#350182', borderColor: 'white' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik >
            <Toast ref={toast} />
            <ConfirmDialog />
        </>

    )
}