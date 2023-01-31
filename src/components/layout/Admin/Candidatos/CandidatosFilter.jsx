import React, { useEffect, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import estados from '../../../../data/estados';
import countriesDataSet from '../../../../data/paises';
import Spinner from '../../../spinner/Spinner';
import { getAllCandidatos } from '../../../../store/slices/candidatos';
import TagSelector from '../../../tags/TagSelector';
import { getAllTecnologias, resetFilters } from '../../../../store/slices/tecnologias';

const CandidatosFilter = () => {
  const tecnologiasState = useSelector((state) => state.tecnologias);
  let techOptions = false;
  if (tecnologiasState.list) {
    techOptions = tecnologiasState.list;
  }
  // const [selectedTecnologias, setSelectedTecnologias] = useState(false);
  const [queryFilters, setQueryFilters] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTecnologias());
  }, [dispatch]);

  const filterHandler = (e) => {
    if (e.target.name && e.target.value !== 'Seleccione un país' && e.target.value !== '') {
      const { name, value } = e.target;
      setQueryFilters({
        ...queryFilters,
        [name]: value,
      });
    } else if (e.target.name && e.target.value === 'Seleccione un país') {
      console.log(queryFilters);
      const newQueryList = delete queryFilters.pais;
      console.log(queryFilters);
      setQueryFilters({
        newQueryList,
      });
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(queryFilters).toString();
    const queryConfig = {
      query,
    };
    dispatch(getAllCandidatos(queryConfig));
  }, [queryFilters]);

  const clearFilters = () => {
    setQueryFilters({});
    dispatch(resetFilters);
    dispatch(getAllCandidatos());
  };

  return (
    <div className="candidatos-filters">
      <div className="filters-form">
        {
          techOptions ? (
            <>
              <div className="row justify-content-between">
                <h5 className="col-auto section-title">Filtros de búsqueda</h5>
                <IoTrashOutline className="col-auto cm-text--green pointer" onClick={clearFilters} />
              </div>
              <form>
                <div className="col-12 mb-3 tag-selector">
                  <TagSelector
                    options={techOptions}
                    field="Etiquetas"
                    filterHandler={filterHandler}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pais" className="form-label">País</label>
                  <select
                    required
                    name="pais"
                    as="select"
                    className="form-select form-select-lg mb-3"
                    onChange={filterHandler}
                  >
                    {countriesDataSet.map((count) => {
                      return <option key={count} value={count}>{count}</option>;
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="ciudad" className="form-label">Ciudad</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="ciudad"
                    placeholder="Ciudad"
                    name="ciudad"
                    onChange={filterHandler}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="estado">Estado</label>
                  {estados.map((es) => {
                    return (
                      <div className="form-check capitalize" key={es}>
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={queryFilters.estado === es}
                          value={es}
                          name="estado"
                          onChange={filterHandler}
                        />
                        <label className="form-check-label " htmlFor="traslado">
                          {es}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </form>
            </>
          ) : (
            <div className="spinner-container">
              <Spinner />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default CandidatosFilter;
