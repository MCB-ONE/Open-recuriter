import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import TableHeader from './TableHeader';
import TagsList from '../tags/TagsList';
import useSortableData from '../../hooks/useSortableData';
/** Styles import */
import './dataTable.scss';

const SortableDataTable = ({ data, columns }) => {
  // Use custom hook
  const { items, requestSort } = useSortableData(data);
  // Conditional styles for estado labels
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

  const renderRows = (column, item, row, isState, isTag, isDouble, isLink, isNum) => {
    if (isTag) {
      const elements = [];
      item[column.row].forEach((element) => {
        elements.push(element);
      });
      return (
        <td key={v4()} className="tags">
          <TagsList data={elements} />
        </td>
      );
    } if (isState) {
      return (
        <td className="estado" key={v4()}>
          <span className={renderSwitchClass(item[column.row])}>
            {item[column.row]}
          </span>
        </td>
      );
    }
    if (isLink) {
      return (
        <td key={v4()}>
          <Link to={`${item.id}`}>
            {item[column.row]}
          </Link>
        </td>
      );
    }
    if (isDouble) {
      const fields = [];
      const fieldsValues = [];
      column.row.forEach((element) => {
        // Extract fields to show
        fields.push(element);
      });
      fields.forEach((el) => {
        // Extract the values of each field
        fieldsValues.push(item[el]);
      });
      return <td key={v4()}>{`${fieldsValues[0]}, ${fieldsValues[1]}`}</td>;
    }
    if (isNum) {
      return <td key={v4()} className="num">{item[column.row]}</td>;
    }
    return <td key={v4()}>{item[column.row]}</td>;
  };

  return (
    <div className="cm-table">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => {
              const {
                label, row, sortable, isTag, isDouble,
              } = col;
              return (
                <TableHeader
                  key={row}
                  label={label}
                  sortable={sortable}
                  onClick={() => requestSort({ row, isTag, isDouble })}
                />
              );
            })}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => {
                const {
                  row, isState, isTag, isDouble, isLink, isNum,
                } = column;
                return renderRows(column, item, row, isState, isTag, isDouble, isLink, isNum);
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

SortableDataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default SortableDataTable;
