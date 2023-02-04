import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCandidatos, resetDetail } from '../../../../store/slices/candidatos';
import Spinner from '../../../spinner/Spinner';
// import Pagination from '../../../pagination/Pagination';
import SortableDataTable from '../../../sortableDataTable/SortableDataTable';
import TableNavbar from '../TableNavbar';

const CandidatosMain = () => {
  const dispatch = useDispatch();
  const candidatosList = useSelector((state) => state.candidatos.list);
  const tagFilterList = useSelector((state) => state.tecnologias.filters);
  const isLoading = useSelector((state) => state.candidatos.isLoading);
  const [candidatosData, setCandidatosData] = useState(candidatosList);
  // const pages = useSelector((state) => state.candidatos.pagination);
  const [query, setQuery] = useState('');
  // Setting a searchable column list
  const searchableColumns = ['nombre', 'estado', 'ciudad'];

  // Search method
  const search = (rows) => {
    if (tagFilterList.length > 0) {
      const filteredRows = rows.filter(
        (row) => row.tecnologias.some(
          (tech) => tagFilterList.includes(tech),
        ),
      );

      return filteredRows.filter((row) => searchableColumns.some(
        (column) => row[column]
          .toString()
          .toLowerCase()
          .indexOf(query.toLowerCase()) > -1,
      ));
    }

    return rows.filter((row) => searchableColumns.some(
      (column) => row[column]
        .toString()
        .toLowerCase()
        .indexOf(query.toLowerCase()) > -1,
    ));
  };

  // Pagination handler
  // const changePage = (page) => {
  //   const queryConfig = {
  //     page,
  //   };
  //   dispatch(getAllCandidatos(queryConfig));
  // };

  useEffect(() => {
    dispatch(getAllCandidatos());
    dispatch(resetDetail());
  }, []);

  useEffect(() => {
    setCandidatosData(candidatosList);
  }, [candidatosList, tagFilterList]);

  return (
    <div className="candidatos-main">
      {candidatosData && !isLoading
        ? (
          <>
            <TableNavbar
              title="Candidatos"
              searchPlaceholder="Buscar por Nombre, ciudad o estado..."
              query={query}
              setQuery={setQuery}
              buttonLabel="Añadir candidato"
            />
            <SortableDataTable
              data={search(candidatosData)}
              columns={[
                {
                  label: 'nombre', row: 'nombre', sortable: true, isLink: true, isNum: false, isState: false, isTag: false, isDouble: false,
                },
                {
                  label: 'ubicación', row: ['ciudad', 'pais'], sortable: true, isNum: false, isState: false, isTag: false, isDouble: true,
                },
                {
                  label: 'teléfono', row: 'telefono', sortable: false, isNum: true, isState: false, isTag: false, isDouble: false,
                },
                {
                  label: 'tecnologías', row: 'tecnologias', sortable: true, isState: false, isNum: false, isTag: true, isDouble: false,
                },
                {
                  label: 'estado', row: 'estado', sortable: true, isState: true, isNum: false, isTag: false, isDouble: false,
                },
              ]}
            />
            {/* <Pagination pages={pages} changePage={changePage} /> */}
          </>
        ) : (
          <Spinner />
        )}
    </div>
  );
};

export default CandidatosMain;
