import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidatoById } from '../../../../../store/slices/candidatos';
import Breadcrumbs from '../../../../breadcrumbs/Breadcrumbs';
/* Styles */
import './detalleCandidato.scss';
import DetalleCandidatoMain from './DetalleCandidatoMain';
import DetalleCandidatoSidebar from './DetalleCandidatoSidebar';
import Spinner from '../../../../spinner/Spinner';

const DetalleCandidatoLayout = () => {
  // Retrive candidato id from utl path
  const candidatoId = useParams().id;
  const candidatoDetail = useSelector((state) => state.candidatos);
  const dispatch = useDispatch();

  // Dispathc getCandidatoById
  useEffect(() => {
    dispatch(getCandidatoById(candidatoId));
  }, [dispatch, candidatoId]);

  return (
    <div className="detalle-candidato ">
      <Breadcrumbs />
      { candidatoDetail ? (
        <div className="layout">
          <DetalleCandidatoMain />
          <DetalleCandidatoSidebar />
        </div>
      )
        : (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) }
    </div>
  );
};

export default DetalleCandidatoLayout;
