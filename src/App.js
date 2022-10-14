import React, { useEffect } from 'react';
import logo from './stackline_logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchData } from './stores/productSlice.js';
import Overview from './components/overview';
function App() {
  const dispatch = useDispatch();

  const productStatus = useSelector((state) => state.product.status);
  const product = useSelector((state) => state.product.posts);
  console.log(product);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchData());
    }
  }, [dispatch, productStatus]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Stackline" />
      </header>
      {productStatus === 'succeeded' && <div className="Main">
        <Overview />
        </div>}
    </div>
  );
}

export default App;
