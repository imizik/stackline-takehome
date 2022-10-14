import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, selectSorting, sort } from '../stores/productSlice';
import './table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

export default function Table(props) {
  const product = useSelector(selectProduct);
  const sorters = useSelector(selectSorting);
  const dispatch = useDispatch();

  const dollarConvert = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const dateFormat = (date) => {
    return date.slice(5, 7) + '-' + date.slice(-2) + '-' + date.slice(2, 4);
  };

  const caretDirection = (key) => {
    return sorters[key] === 'up' ? faCaretDown : faCaretUp;
  };

  return (
    <div className="table-container">
      <table>
        <tr>
          <th>
            WEEK ENDING{' '}
            <FontAwesomeIcon
              onClick={() => dispatch(sort('weekEnding'))}
              icon={caretDirection('weekEnding')}
            />
          </th>
          <th>
            RETAIL SALES{' '}
            <FontAwesomeIcon
              onClick={() => dispatch(sort('retailSales'))}
              icon={caretDirection('retailSales')}
            />
          </th>
          <th>
            WHOLESALE SALES{' '}
            <FontAwesomeIcon
              onClick={() => dispatch(sort('wholesaleSales'))}
              icon={caretDirection('wholesaleSales')}
            />
          </th>
          <th>
            UNITS SOLD{' '}
            <FontAwesomeIcon
              onClick={() => dispatch(sort('unitsSold'))}
              icon={caretDirection('unitsSold')}
            />
          </th>
          <th>
            RETAILER MARGIN{' '}
            <FontAwesomeIcon
              onClick={() => dispatch(sort('retailerMargin'))}
              icon={caretDirection('retailerMargin')}
            />
          </th>
        </tr>
        {product.sales.map((prod, key) => {
          return (
            <tr key={key}>
              <td>{dateFormat(prod.weekEnding)}</td>
              <td>{dollarConvert.format(prod.retailSales)}</td>
              <td>{dollarConvert.format(prod.wholesaleSales)}</td>
              <td>{prod.unitsSold}</td>
              <td>{dollarConvert.format(prod.retailerMargin)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
