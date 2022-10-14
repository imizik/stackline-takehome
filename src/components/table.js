import { useSelector } from 'react-redux';
import { selectProduct } from '../stores/productSlice';
import './table.css'
export default function Table(props) {
    const product = useSelector(selectProduct);

    const dollarConvert = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const dateFormat = (date) => {
        return date.slice(5, 7) + '-' + date.slice(-2) + '-' + date.slice(0,4)
    }
  
    return (
      <div className="table-container">
        <table>
            <tr>
                <th>WEEK ENDING</th>
                <th>RETAIL SALES</th>
                <th>WHOLESALE SALES</th>
                <th>UNITS SOLD</th>
                <th>RETAILER MARGIN</th>
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