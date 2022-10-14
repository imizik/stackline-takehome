import { useSelector } from 'react-redux';
import { selectProduct } from '../stores/productSlice';
import './chart.css'
import { LineChart, Line, XAxis, ResponsiveContainer, YAxis } from 'recharts';
export default function Chart(props) {
    const product = useSelector(selectProduct);
    const months = {"01": 'JAN', "02": 'FEB', "03": 'MAR', "04": 'APR', "05": 'MAY', "06": 'JUN', "07": 'JUL', "08": 'AUG', "09": 'SEP', "10": 'OCT', "11": 'NOV', "12": 'DEC'}
    const monthConvert = (date) => {
        const month = date.slice(5,7)
        return months[month]
    }

    const productData = [...product.sales].sort((a,b) => {
        const aComps = a.weekEnding.split("-");
        const bComps = b.weekEnding.split("-");
        const aDate = new Date(aComps[0], aComps[1], aComps[2]);
        const bDate = new Date(bComps[0], bComps[1], bComps[2]);
        return  aDate.getTime() - bDate.getTime();
      })
    
    return (
      <div className="chart-container">
        <span className='chart-title'>Retail Sales</span>
        <ResponsiveContainer width="100%" height='90%'>
            <LineChart data={productData} margin={ { bottom: 20, right: 5} }>
                <XAxis 
                dataKey='weekEnding'
                tickFormatter={monthConvert}
                tickLine={false}
                minTickGap={100}
                className='xAxis'
                padding={{ left: 30, right: 40 }}
                tickMargin={15}
                axisLine={{ stroke: '#AFBED1' }}
                />
                <YAxis 
                hide
                domain={['dataMin - 1000000', 'dataMax + 1000000']}
                />
                <Line 
                    type="monotone" 
                    dataKey="retailSales" 
                    strokeWidth={3} dot={false} 
                    stroke="#42A6F6" 
                />
                <Line 
                    type="monotone" 
                    dataKey="wholesaleSales" 
                    strokeWidth={3} dot={false} 
                    stroke="#99A4BE" 
                />
            </LineChart>
        </ResponsiveContainer>
      </div>  
    )
  }