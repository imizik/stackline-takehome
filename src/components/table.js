import { useSelector } from 'react-redux';
import { selectProduct, selectSorting} from '../stores/productSlice';
import './table.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'


export default function Table(props) {
    const product = useSelector(selectProduct);
    const sorters = useSelector(selectSorting);

    const dollarConvert = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });

    const dateFormat = (date) => {
        return date.slice(5, 7) + '-' + date.slice(-2) + '-' + date.slice(2,4)
    }

    const caretDirection = (key) => {
        return sorters[key] === 'up' ? faCaretDown : faCaretUp
    }
  
    return (
      <div className="table-container">
        <table>
            <tr>
                <th>WEEK ENDING <FontAwesomeIcon icon={caretDirection('weekEnding')} /></th>
                <th>RETAIL SALES <FontAwesomeIcon icon={caretDirection('retailSales')} /></th>
                <th>WHOLESALE SALES <FontAwesomeIcon icon={caretDirection('wholesaleSales')} /></th>
                <th>UNITS SOLD <FontAwesomeIcon icon={caretDirection('unitsSold')} /></th>
                <th>RETAILER MARGIN <FontAwesomeIcon icon={caretDirection('retailerMargin')} /></th>
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
            )
            })}
        </table>
      </div>  
    )
  }