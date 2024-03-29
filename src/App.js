import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";

function App() {
  const [res, setRes] = useState({});
  const [products, setProducts] = useState([]);
  const [test,setTest] = useState(0);

  /* get a list of all products using axios */
  const getAllProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setRes(response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  /* got the list of all the products */
  return (
    <>
    <div>
      <button onClick={() => {getAllProducts(); console.log(products)}}>{test}</button>
    </div>
    <div className='w-[130%]'>
    {products.map((product, index) => {
          // Convert timestamp to localized date and time string
          //Add a component that would be cards for products
          return (
            <div> 
              {product.title}
            </div>
          );
        })} 
    </div>
    </>
  );
}

export default App;
