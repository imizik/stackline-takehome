import { useSelector } from 'react-redux';
import { selectProduct } from '../stores/productSlice';

export default function Overview(props) {
    const product = useSelector(selectProduct);
  
    return (
      <div className={props.className + " product-overview-container"}>
        <div className="product-identification">
          <img className="product-image" src={product.image} alt={product.title} />
          <p className="product-title">{product.title}</p>
          <p className="product-subtitle">{product.subtitle}</p>
        </div>
        <div className="product-tags">
          {product.tags && product.tags.map((item, index)=>
            <span className="product-tag" key={index}>{item}</span>
          )}
        </div>  
        <div className="product-navigation"> 
          <div className="product-navigation-tab">
            <img src="/home.png" alt="Overview Icon" />
            <p>OVERVIEW</p>
          </div>
          <div className="product-navigation-tab">
            <img src="/sales.png" alt="Sales Icon" />
            <p>SALES</p>
          </div>
        </div>
      </div>  
    )
  }