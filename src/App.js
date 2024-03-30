import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import ProductCard from './components/ProductCard';

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
    <h1 class="mb-10 mt-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">Shop items</h1>
    <div className='inline-grid gap-6 ml-[4%] place-items-center grid-cols-4 w-[90%]'>
    {products.map((product, index) => {
          // Convert timestamp to localized date and time string
          //Add a component that would be cards for products
          return (
            <div key={index}>
              <div>
              <ProductCard product={product} />
              </div>
            </div>
          );
        })} 
    </div>
    </>
  );
}

export default App;
