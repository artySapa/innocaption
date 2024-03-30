import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

function App() {
  const [res, setRes] = useState({});
  const [products, setProducts] = useState([]);
  const [test, setTest] = useState(0);
  const [cartID, setCartID] = useState(null);

  const [cartContents, setCartContents] = useState([]); // because the API is not really updating the server

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

  const createCart = async (ID) => {
    try {
      const response = await axios.post('https://dummyjson.com/carts/add', {
        userId: 1,
        products: [
          {
            id: ID,
            quantity: 1,
          }
        ]
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {console.log(response.data); setCartID(response.data.id);})
      .catch(error => console.error('Error:', error));
    } catch (error) {
      console.error(error);
    }
    
  };
  const updateCart = async (ID) => {
    try {
        const response = await fetch(`https://dummyjson.com/carts/${cartID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              merge: true, 
              products: [
                {
                  id: ID,
                  quantity: 1,
                },
              ]
            })
          })
          .then(res => res.json())
          .then(console.log);
    } catch(error) {
        console.error(error);
    }   
  }
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  }

  useEffect(() => {
    getAllProducts();
  }, [cartContents]);
  /* got the list of all the products */
  return (
    <>
      <div className='w-full bg-primary'> 
    <button onClick={handleClick} className='mr-8 float-right px-5 py-2 bg-red-500 text-white text-lg font-bold tracking-wide rounded-full focus:outline-none'>View Cart</button>
    </div>
      <h1 className="mb-10 mt-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
        Shop items
      </h1>
      <div className="inline-grid gap-6 ml-[4%] place-items-center grid-cols-4 w-[90%]">
        {products.map((product, index) => {
          // Convert timestamp to localized date and time string
          //Add a component that would be cards for products
          return (
            <div key={index}>
              <div>
                <ProductCard product={product} cartID={cartID} createCart={createCart} updateCart={updateCart} setCartContents={setCartContents} />
              </div>
            </div>
          );
        })}
        <div className='fixed bottom-0 w-full'>
          <button className='bottom-0 my-8 float-right px-5 py-2 bg-red-500 text-white text-lg font-bold tracking-wide rounded-full focus:outline-none'><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="file: h-10 w-10"
            onClick={handleClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg></button>
        </div>
        {expanded && 
          <Cart contents={cartContents} setExpanded={setExpanded} setCartContents={setCartContents} products={products}/>}
      </div>
    </>
  );
}

export default App;
