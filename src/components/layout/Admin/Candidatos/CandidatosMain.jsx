import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SortableDataTable from '../../../sortableDataTable/SortableDataTable';
import TableNavbar from '../TableNavbar';

const CandidatosMain = () => {
  const alumnosList = useSelector((state) => state.alumnos.list);
  const [state, setState] = useState(alumnosList);
  const [query, setQuery] = useState('');
  const searchableColumns = ['nombre', 'ubicación', 'estado'];

  // const dispatch = useDispatch();
  // const candidatosList = useSelector((state) => state.candidatos);
  // const [candidatosData, setCandidatosData] = useState(candidatosList);
  // const pages = useSelector((state) => state.candidatos.pagination);
  // const [query, setQuery] = useState('');
  // // Setting a searchable column list
  // const searchableColumns = ['nombreCompleto', 'estado', 'ciudad'];

  // Search method
  const search = (data) => {
    return data.filter((row) => searchableColumns.some(
      (column) => row[column]
        .toString()
        .toLowerCase()
        .indexOf(query.toLowerCase()) > -1,
    ));
  };

  // UseEffect to dispatch search filter
  useEffect(() => {
    setTimeout(setState(search(alumnosList)));
  }, [query]);

  return (
    <div className="candidatos-main">
      <TableNavbar
        title="Candidatos"
        searchPlaceholder="Buscar por Nombre, Ubicación o estado."
        query={query}
        setQuery={setQuery}
        buttonLabel="Añadir candidato"
      />
      <SortableDataTable
        data={state}
        columns={[
          { label: 'nombre', sortable: true, link: { to: 'id' } },
          { label: 'ubicación', sortable: true },
          { label: 'teléfono', sortable: false, isNum: true },
          { label: 'tecnologías', sortable: true, isTag: true },
          { label: 'estado', sortable: true, isState: true },
        ]}
      />
    </div>
  );
};

export default CandidatosMain;
