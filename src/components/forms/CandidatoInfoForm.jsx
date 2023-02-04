/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
// import { BiCloudUpload } from 'react-icons/bi';
// import { IoTrashOutline } from 'react-icons/io5';
import Spinner from '../spinner/Spinner';
import countriesDataSet from '../../data/paises';
import statusDataSet from '../../data/estados';
import Button from '../button/Button';

const CandidatoInfoForm = ({ data, formSubmitHandling }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (formData) => {
    formSubmitHandling(formData);
  };
  const countries = countriesDataSet;
  const status = statusDataSet;
  const isLoading = useSelector((state) => state.candidatos.isLoading);

  useForm({
    defaultValues: {
      nombre: data.nombre,
      pais: data.pais,
      ciudad: data.ciudad,
      telefono: data.telefono,
      email: data.email,
      presencialidad: data.presencialidad,
      traslado: data.traslado,
      linkedin: data.linkedin,
    },
  });

  const errorMessages = {
    required: '*Campo obligatorio',
  };

  // TODO: FINISH VALIDATIONS
  return (
    <div className="candidato-form">
      {
        data && !isLoading ? (
          <form onSubmit={handleSubmit(onSubmit)} className="row">
            <div className="col-12">
              <label htmlFor="nombre" className="form-label">Nombre y Apellidos</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                {...register('nombre', { required: true })}
                placeholder="Nombre alumno"
                defaultValue={data.nombre}

              />
              {errors.nombre && errors.nombre.type === 'required' && <p className="error">{errorMessages.required}</p>}
            </div>
            <div className="col-6">
              <label htmlFor="telefono" className="form-label ">Nº Teléfono</label>
              <input
                type="tel"
                className="form-control num"
                id="telefono"
                placeholder="+34 654 85 52 48"
                {...register('telefono', { required: true })}
                defaultValue={data.telefono}
              />
              {errors.telefono && errors.nombre.type === 'required' && <p className="error">{errorMessages.required}</p>}
            </div>
            <div className="col-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="ejemplo@gmail.com"
                {...register('email', { required: true })}
                defaultValue={data.email}
              />
              {errors.email && errors.nombre.type === 'required' && <p className="error">{errorMessages.required}</p>}
            </div>
            <div className="col-6">
              <label htmlFor="pais" className="form-label">País</label>
              <select
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg pais"
                {...register('pais', { required: true })}
                defaultValue={data.pais}
              >
                {countries.map((count) => {
                  return <option key={count} value={count}>{count}</option>;
                })}
              </select>
              {errors.pais && errors.nombre.type === 'required' && <p className="error">{errorMessages.required}</p>}
            </div>
            <div className="col-6">
              <label htmlFor="ciudad" className="form-label">Ciudad</label>
              <input
                type="text"
                className="form-control"
                id="ciudad"
                placeholder="Ciudad"
                {...register('ciudad', { required: true })}
                defaultValue={data.ciudad}
              />
              {errors.ciudad && errors.nombre.type === 'required' && <p className="error">{errorMessages.required}</p>}
            </div>
            <div className="col-6 mb-2 form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                {...register('presencialidad')}
                defaultChecked={data.presencialidad}
              />
              <label className="form-check-label" htmlFor="presencialidad">Presencialidad</label>
            </div>
            <div className="col-12  mb-3 form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                {...register('traslado')}
                defaultChecked={data.traslado}
              />
              <label className="form-check-label" htmlFor="traslado">Traslado</label>
            </div>
            <div className="col-12">
              <label htmlFor="linkedin" className="form-label">Enlace Linkedin</label>
              <input
                type="text"
                className="form-control"
                id="linkedin"
                placeholder="Enlace a LinkedIn"
                {...register('linkedin')}
                defaultValue={data.linkedin}
              />
            </div>
            <div className="col-6">
              <label htmlFor="estado-laboral" className="form-label">Estado laboral</label>
              <select
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg traslado"
                {...register('estado')}
                defaultValue={data.estado}

              >
                {status.map((item) => {
                  return <option key={item} value={item}>{item.toUpperCase()}</option>;
                })}
              </select>
            </div>
            {/* <div className=" col-12 mb-4 file-input">
              <label htmlFor="cv" className="form-label">Documento CV</label>
              <div className="row">
                <div className="col-auto pe-0 file-btn">
                  <input
                    type="file"
                    ref={inputCvRef}
                    name="cv"
                    id="cv"
                    onChange={handlerFileChange}
                  />
                  <Button
                    label="Subir de nuevo"
                    color="secondary"
                  >
                    <BiCloudUpload />
                  </Button>
                </div>
                <div className="col-auto p-0">
                  <Button
                    label="Borrar"
                    variant="outline"
                    color="light"
                  >
                    <IoTrashOutline />
                  </Button>
                </div>
              </div>
            </div> */}
            <div className="d-flex justify-content-end">
              <Button
                label="Actualizar"
                color="primary"
                type="submit"
              />
            </div>
          </form>
        ) : (
          <div className="spinner-container">
            <Spinner />
          </div>
        )
      }
    </div>
  );
};

export default CandidatoInfoForm;
