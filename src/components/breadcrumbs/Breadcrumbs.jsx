import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const candidatoState = useSelector((state) => state.candidatos);
  let candidatoDetail = false;
  if (candidatoState.detail) {
    // eslint-disable-next-line prefer-destructuring
    candidatoDetail = candidatoState.detail;
  }

  if (!candidatoDetail) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="breadcrums">
      <span>
        <Link to="/admin/candidatos">
          Candidatos
        </Link>
        <IoIosArrowBack />
      </span>
      <span>{candidatoDetail.nombre}</span>
    </div>
  );
};

export default Breadcrumbs;
