import { useSelector } from 'react-redux';
import { selectProduct } from '../stores/productSlice';
import './overview.css'
export default function Overview(props) {
    const product = useSelector(selectProduct);
  
    return (
      <div className="o-container">
        <div className="top-block">
          <img className="o-image" src={product.image} alt={product.title} />
          <span className="o-title">{product.title}</span>
          <span className="o-subtitle">{product.subtitle}</span>
        </div>
        <div className="o-tag-contain">
          {product.tags.map((tag, index) =>
            <div className="o-mapped" key={index}>{tag}</div>
          )}
        </div>  
      </div>  
    )
  }