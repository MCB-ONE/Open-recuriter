/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoLocationOutline } from 'react-icons/io5';
import { MdMyLocation } from 'react-icons/md';
import Spinner from '../../../../spinner/Spinner';
import CandidatoInfoForm from '../../../../forms/CandidatoInfoForm';
import { updateCandidato } from '../../../../../store/slices/candidatos';

const detalleCandidatoMain = () => {
  const dispatch = useDispatch();
  const candidatoDetail = useSelector((state) => state.candidatos.detail);
  const [formData, setFormData] = useState();
  const formSubmitHandling = (updatedFormData) => {
    setFormData(updatedFormData);
    const data = {
      id: candidatoDetail.id,
      updatedFormData,
    };
    dispatch(updateCandidato(data));
  };

  const renderSwitchClass = (value) => {
    switch (value) {
      case 'contratado':
        return 'success';
      case 'en_proceso':
        return 'pending';
      case 'libre':
        return 'free';
      case 'descartado':
        return 'error';
      default:
        return 'free';
    }
  };

  return (
    <div className="main col-8 pe-0">
      { candidatoDetail ? (
        <>
          <div className="info">
            {
              candidatoDetail.avatar ? <img src={candidatoDetail.avatar.url} alt="imagen de perfil" />
                : <img src="/images/candidate-default-img.jpeg" alt="imagen de perfil" />
            }
            <div className="profile row">
              <div className="profile-location col-auto">
                <h1>{candidatoDetail.nombre}</h1>
                <div>
                  <IoLocationOutline />
                  <p>
                    {candidatoDetail.ciudad}
                    ,
                    {' '}
                    {candidatoDetail.pais}
                  </p>
                </div>
                <div>
                  <MdMyLocation />
                  <p>
                    {candidatoDetail.presencialidad ? 'Presencial' : 'En remoto'}
                    ,
                    {' '}
                    {candidatoDetail.traslado
                      ? 'Traslado disponible' : 'Sin traslado'}
                  </p>
                </div>
              </div>
              <div className="profile-status col-auto estado">
                <p>Estado del candidato:</p>
                <span className={renderSwitchClass(candidatoDetail.estado)}>
                  {candidatoDetail.estado}
                </span>
              </div>
            </div>
          </div>
          <CandidatoInfoForm data={candidatoDetail} formSubmitHandling={formSubmitHandling} />
        </>
      )
        : (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) }
    </div>
  );
};

export default detalleCandidatoMain;
